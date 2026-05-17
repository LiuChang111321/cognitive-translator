import { NextRequest, NextResponse } from "next/server";
import { buildTranslatePrompt } from "@/lib/prompt";
import type { TranslateInput, TranslateResult } from "@/lib/types";
import https from "https";

function httpsPost(
  url: string,
  headers: Record<string, string>,
  body: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const options: https.RequestOptions = {
      hostname: u.hostname,
      port: u.port || 443,
      path: u.pathname + u.search,
      method: "POST",
      headers,
      timeout: 30000,
    };

    const req = https.request(options, (res) => {
      const chunks: Buffer[] = [];
      res.on("data", (chunk: Buffer) => chunks.push(chunk));
      res.on("end", () => {
        const data = Buffer.concat(chunks).toString("utf8");
        if (!res.statusCode || res.statusCode >= 400) {
          reject(
            new Error(
              `OpenAI API error: ${res.statusCode} ${data.slice(0, 200)}`
            )
          );
        } else {
          resolve(data);
        }
      });
    });

    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Request timeout"));
    });

    req.write(body);
    req.end();
  });
}

function getFallbackResult(input: TranslateInput): TranslateResult {
  return {
    surfaceMeaning: `发送者表达了一段关于"${input.originalText.slice(0, 30)}..."的内容。`,
    senderDeepIntent:
      "由于 AI 服务暂时不可用，无法分析深层意图。请稍后重试。",
    receiverPossibleMisread:
      "无法分析可能的误解。请稍后重试。",
    translatedExpression: input.originalText,
    communicationRisk:
      "AI 服务暂时不可用，无法提供风险分析。",
    suggestedReply: "请稍后重试以获得回复建议。",
    minimalSharedSemantics: `双方表达的核心内容为："${input.originalText.slice(0, 60)}..."`,
    confidenceNote:
      "此为 AI 服务不可用时的备用回复。开启有效的 AI_API_KEY 后可获得完整分析。",
  };
}

async function callAnthropic(
  system: string,
  user: string
): Promise<string> {
  const { Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic({
    apiKey: (process.env.ANTHROPIC_API_KEY || "").trim(),
  });

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    system: system,
    messages: [{ role: "user", content: user }],
  });

  const content = response.content
    .filter((block) => block.type === "text")
    .map((block) => (block as { text: string }).text)
    .join("");

  return content;
}

async function callOpenAI(system: string, user: string): Promise<string> {
  // 兼容多种常见环境变量名：DEEPSEEK_API_KEY > OPENAI_API_KEY
  const apiKey = (process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY || "").trim();

  // 兼容多种常见 base URL 变量名：AI_BASE_URL > OPENAI_BASE_URL > OPENAI_API_BASE
  const baseUrl =
    process.env.AI_BASE_URL ||
    process.env.OPENAI_BASE_URL ||
    process.env.OPENAI_API_BASE ||
    "https://api.openai.com/v1";

  // 兼容多种常见 model 变量名：AI_MODEL > OPENAI_MODEL
  const model =
    process.env.AI_MODEL || process.env.OPENAI_MODEL || "gpt-4o";

  // deepseek-reasoner 不支持 system 角色，需要合并到 user 消息中
  const isReasoner = model.includes("reasoner");
  const messages = isReasoner
    ? [{ role: "user", content: `${system}\n\n${user}` }]
    : [
        { role: "system", content: system },
        { role: "user", content: user },
      ];

  const body = JSON.stringify({ model, max_tokens: 4096, messages });
  const raw = await httpsPost(
    `${baseUrl}/chat/completions`,
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body
  );

  const data = JSON.parse(raw);
  return data.choices?.[0]?.message?.content || "";
}

function parseJSONResponse(
  text: string,
  input: TranslateInput
): TranslateResult {
  let cleaned = text.trim();

  // Try to extract JSON from markdown code blocks
  const jsonMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    cleaned = jsonMatch[1].trim();
  }

  // Try to find a JSON object in the response
  const objectMatch = cleaned.match(/\{[\s\S]*"minimalSharedSemantics"[\s\S]*\}/);
  if (objectMatch) {
    cleaned = objectMatch[0];
  }

  let parsed: Partial<TranslateResult>;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    // Try more aggressively
    const lastResort = cleaned.indexOf("{");
    if (lastResort !== -1) {
      try {
        parsed = JSON.parse(cleaned.slice(lastResort));
      } catch {
        throw new Error("AI 返回的格式无法解析，请重试。");
      }
    } else {
      throw new Error("AI 返回的格式无法解析，请重试。");
    }
  }

  // Validate required fields
  const requiredFields: (keyof TranslateResult)[] = [
    "surfaceMeaning",
    "senderDeepIntent",
    "receiverPossibleMisread",
    "translatedExpression",
    "communicationRisk",
    "suggestedReply",
    "minimalSharedSemantics",
  ];

  for (const field of requiredFields) {
    if (!parsed[field]) {
      parsed[field] = "（分析未生成）";
    }
  }

  return {
    surfaceMeaning: parsed.surfaceMeaning || "（分析未生成）",
    senderDeepIntent: parsed.senderDeepIntent || "（分析未生成）",
    receiverPossibleMisread: parsed.receiverPossibleMisread || "（分析未生成）",
    translatedExpression: parsed.translatedExpression || input.originalText,
    communicationRisk: parsed.communicationRisk || "（分析未生成）",
    suggestedReply: parsed.suggestedReply || "（分析未生成）",
    minimalSharedSemantics:
      parsed.minimalSharedSemantics || "（分析未生成）",
    confidenceNote:
      parsed.confidenceNote || "AI 分析仅供参考，实际沟通应结合具体情境。",
  };
}

export async function POST(request: NextRequest) {
  try {
    const input: TranslateInput = await request.json();

    // Validation
    if (!input.originalText?.trim()) {
      return NextResponse.json(
        { error: "请输入需要翻译的表达内容。" },
        { status: 400 }
      );
    }

    if (input.originalText.length > 2000) {
      return NextResponse.json(
        { error: "输入内容过长，请限制在 2000 字符以内。" },
        { status: 400 }
      );
    }

    if (!["INTJ", "ENFP"].includes(input.senderType)) {
      return NextResponse.json(
        { error: "发送者认知风格无效。" },
        { status: 400 }
      );
    }

    if (!["INTJ", "ENFP"].includes(input.receiverType)) {
      return NextResponse.json(
        { error: "接收者认知风格无效。" },
        { status: 400 }
      );
    }

    const { system, user } = buildTranslatePrompt(input);
    const provider = process.env.AI_PROVIDER || "anthropic";

    let rawText: string;
    try {
      if (provider === "openai") {
        if (!process.env.DEEPSEEK_API_KEY && !process.env.OPENAI_API_KEY) {
          return NextResponse.json(
            { error: "未配置 API Key（DEEPSEEK_API_KEY / OPENAI_API_KEY），请检查环境变量。" },
            { status: 500 }
          );
        }
        rawText = await callOpenAI(system, user);
      } else {
        if (!process.env.ANTHROPIC_API_KEY) {
          return NextResponse.json(
            { error: "未配置 Anthropic API Key，请检查环境变量。" },
            { status: 500 }
          );
        }
        rawText = await callAnthropic(system, user);
      }
    } catch (err) {
      console.error("AI API call failed:", err);
      // Return fallback instead of crashing
      const fallback = getFallbackResult(input);
      return NextResponse.json(fallback);
    }

    const result = parseJSONResponse(rawText, input);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Translation error:", err);
    const msg =
      err instanceof Error ? err.message : "服务器内部错误，请稍后重试。";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
