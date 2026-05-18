"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Check, Copy } from "lucide-react";
import type { MbtiCode } from "@/lib/mbti/types";
import type { TranslateResult } from "@/lib/types";
import { MBTI_EMOJI } from "@/lib/constants";

// =============================================
// Copy button
// =============================================

function CopyBtn({
  text,
  label = "复制",
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  const handle = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  }, [text]);
  return (
    <button
      type="button"
      onClick={handle}
      className="text-[10px] text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors"
    >
      {copied ? (
        <span className="flex items-center gap-1">
          <Check className="h-3 w-3" /> 已复制
        </span>
      ) : (
        <span className="flex items-center gap-1">
          <Copy className="h-3 w-3" /> {label}
        </span>
      )}
    </button>
  );
}

// =============================================
// Section configuration
// =============================================

interface OutputSection {
  id: string;
  label: string;
  key: keyof TranslateResult;
  delay: number;
  bgClass: string;
  labelClass: string;
}

function buildSections(
  senderType: MbtiCode,
  receiverType: MbtiCode
): OutputSection[] {
  return [
    {
      id: "surface",
      label: "💬 你说的是",
      key: "surfaceMeaning",
      delay: 200,
      bgClass: "bg-gray-50 border-gray-200",
      labelClass: "text-gray-500",
    },
    {
      id: "misread",
      label: `👂 ${MBTI_EMOJI[receiverType]} ${receiverType} 耳朵里听到的是`,
      key: "receiverPossibleMisread",
      delay: 400,
      bgClass: "bg-rose-50 border-rose-200",
      labelClass: "text-rose-500",
    },
    {
      id: "intent",
      label: `💛 ${MBTI_EMOJI[senderType]} ${senderType} 真正想表达的是`,
      key: "senderDeepIntent",
      delay: 600,
      bgClass: "bg-amber-50 border-amber-200",
      labelClass: "text-amber-600",
    },
    {
      id: "translation",
      label: "✨ 可以试试这样说",
      key: "translatedExpression",
      delay: 900,
      bgClass: "bg-primary/[0.07] border-primary/25",
      labelClass: "text-primary",
    },
    {
      id: "semantics",
      label: "🤝 你们其实都想说",
      key: "minimalSharedSemantics",
      delay: 1100,
      bgClass: "bg-blue-50 border-blue-200",
      labelClass: "text-blue-600",
    },
    {
      id: "advice",
      label: "💡 一点小建议",
      key: "practicalNextStep",
      delay: 1300,
      bgClass: "bg-purple-50 border-purple-200",
      labelClass: "text-purple-600",
    },
    {
      id: "reply",
      label: "💬 你可以这样回",
      key: "suggestedReply",
      delay: 1500,
      bgClass: "bg-emerald-50 border-emerald-200",
      labelClass: "text-emerald-600",
    },
  ];
}

// =============================================
// Main output component
// =============================================

interface CognitiveOutputProps {
  result: TranslateResult;
  senderType: MbtiCode;
  receiverType: MbtiCode;
}

export function CognitiveOutput({
  result,
  senderType,
  receiverType,
}: CognitiveOutputProps) {
  const [revealed, setRevealed] = useState<string[]>([]);

  const sections = useMemo(
    () => buildSections(senderType, receiverType),
    [senderType, receiverType]
  );

  const fullText = useMemo(() => {
    return sections
      .map((s) => `${s.label}\n${result[s.key] ?? ""}`)
      .join("\n\n");
  }, [sections, result]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    sections.forEach((s) => {
      timers.push(
        setTimeout(() => {
          setRevealed((prev) => [...prev, s.id]);
        }, s.delay)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [result, sections]);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center space-y-1.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm">
          <span className="text-[10px] text-muted-foreground/50 tracking-wider">
            🔮 翻译报告
          </span>
        </div>
        <p className="text-[10px] text-muted-foreground/40 max-w-xs mx-auto">
          仅供娱乐参考，真实的人比四个字母复杂得多
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-0">
        {sections.map((s, idx) => {
          const visible = revealed.includes(s.id);
          return (
            <div key={s.id}>
              <div
                className={`rounded-xl border ${s.bgClass} p-4 shadow-sm transition-all duration-500 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-medium ${s.labelClass}`}>
                    {s.label}
                  </span>
                  <CopyBtn text={result[s.key] ?? ""} />
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                  {result[s.key]}
                </p>
              </div>
              {/* Arrow connector */}
              {idx < sections.length - 1 && (
                <div
                  className={`flex justify-center py-1 transition-opacity duration-300 ${
                    visible ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="text-muted-foreground/15 text-sm">↓</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Copy all */}
      <div className="flex justify-center pt-1">
        <CopyBtn text={fullText} label="复制全部" />
      </div>

      {/* Communication risk */}
      {result.communicationRisk && (
        <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50">
          <p className="text-[10px] text-amber-600/60 font-medium mb-1">
            ⚠️ 沟通风险提示
          </p>
          <p className="text-xs text-amber-700/50 leading-relaxed">
            {result.communicationRisk}
          </p>
        </div>
      )}
    </div>
  );
}
