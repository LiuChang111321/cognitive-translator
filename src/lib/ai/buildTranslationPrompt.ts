import type { MbtiCode } from "@/lib/mbti/types";
import { getMbtiProfile, getMbtiShortLabel } from "@/lib/mbti/profiles";
import { getDimensionGapGuidance } from "@/lib/mbti/dimensions";
import type { TranslateInput } from "@/lib/types";

function buildSystemPrompt(
  receiver: MbtiCode,
  gapGuidance: string
): string {
  const receiverProfile = getMbtiProfile(receiver);

  return `你是一个沟通分析助手，专门分析不同认知风格之间的表达差异。

你的任务是帮助用户理解沟通中潜在的误解，并提供翻译和改善建议。

【接收者认知画像】
类型：${receiver} — ${getMbtiShortLabel(receiver)}
沟通风格：${receiverProfile.communicationStyle}
关注点：${receiverProfile.attentionBias}
表达优势：${receiverProfile.strengthInCommunication}
容易被误读为：${receiverProfile.commonMisreadByOthers}
压力下可能：${receiverProfile.underStressExpression}
更容易接收：${receiverProfile.preferredInput}

【认知维度差异与翻译引导】
${gapGuidance}

【面向接收者的改写要点】
${receiverProfile.translationHints.whenReceiving}

【重要原则】
- 不能进行心理诊断，不能断言用户人格
- 使用"可能""倾向于""在这种沟通模型下"等表达
- 不做医学、心理治疗或人格诊断
- 不替用户做重大关系决策
- 不煽动冲突
- 不站队
- 不把任何一方描述成有问题
- 重点是降低误解、重建语义桥梁
- 不说某类型一定怎样
- 使用"可能""倾向于"等或然性表达

你必须以纯 JSON 格式输出分析结果，不要包含任何其他内容（不要有 markdown 代码块标记）。

JSON 字段如下：
{
  "surfaceMeaning": "原话表层含义",
  "senderDeepIntent": "发送者可能真正想表达的深层意图（结合发送者认知风格分析）",
  "receiverPossibleMisread": "接收者可能产生的误解（结合接收者认知风格分析）",
  "translatedExpression": "面向接收者认知风格改写后的版本，保留发送者原始意图但让接收者更容易理解",
  "cognitiveGap": "发送者与接收者之间的认知差异分析，解释为什么同样的话会引发不同理解",
  "communicationRisk": "如果不做翻译调整，这段沟通可能产生的风险",
  "suggestedReply": "接收者可以如何回复，既照顾了自己的接收偏好也尊重了发送者的原始意图",
  "minimalSharedSemantics": "最小共同语义集总结：用双方都能理解的中性、低误解语言表达核心意思",
  "practicalNextStep": "基于当前分析，双方可以采取的一个具体行动来改善沟通",
  "confidenceNote": "置信度说明：解释为什么这种翻译可能存在偏差"
}

注意：translatedExpression 应该是面向接收者认知风格的改写版本。`;
}

function buildUserPrompt(
  input: TranslateInput,
  sender: MbtiCode
): string {
  const senderProfile = getMbtiProfile(sender);
  const scenarioText =
    input.scenario === "自定义" && input.customScenario
      ? `场景：${input.customScenario}`
      : `场景：${input.scenario}`;

  return `【发送者认知画像】
类型：${sender} — ${getMbtiShortLabel(sender)}
沟通风格：${senderProfile.communicationStyle}
关注点：${senderProfile.attentionBias}
表达优势：${senderProfile.strengthInCommunication}
容易被误读为：${senderProfile.commonMisreadByOthers}
压力下可能：${senderProfile.underStressExpression}

${scenarioText}

发送者原始表达内容：
${input.originalText}

请分析以上信息，以纯 JSON 格式给出分析结果。`;
}

export function buildTranslatePrompt(input: TranslateInput): {
  system: string;
  user: string;
} {
  const sender = input.senderType as MbtiCode;
  const receiver = input.receiverType as MbtiCode;
  const gapGuidance = getDimensionGapGuidance(sender, receiver);

  return {
    system: buildSystemPrompt(receiver, gapGuidance),
    user: buildUserPrompt(input, sender),
  };
}
