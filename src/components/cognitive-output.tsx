"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Check, Copy } from "lucide-react";
import { TYPE_DIMENSIONS, DIMENSION_CONFIGS, ALL_DIMENSIONS } from "@/lib/mbti/dimensions";
import type { MbtiCode } from "@/lib/mbti/types";
import type { TranslateResult } from "@/lib/types";

// =============================================
// Cognitive Gap Visualization
// =============================================

function GapVis({
  senderType,
  receiverType,
}: {
  senderType: MbtiCode;
  receiverType: MbtiCode;
}) {
  const gaps = useMemo(() => {
    const s = TYPE_DIMENSIONS[senderType];
    const r = TYPE_DIMENSIONS[receiverType];
    return ALL_DIMENSIONS.map((dim) => ({
      dim,
      config: DIMENSION_CONFIGS[dim],
      sScore: s[dim],
      rScore: r[dim],
      diff: Math.abs(s[dim] - r[dim]),
    }))
      .filter((g) => g.diff >= 0.5)
      .sort((a, b) => b.diff - a.diff)
      .slice(0, 5);
  }, [senderType, receiverType]);

  if (gaps.length === 0) return null;

  const toPct = (score: number) => ((score + 2) / 4) * 100;

  return (
    <div className="space-y-4">
      <div className="text-[10px] text-white/20 uppercase tracking-[0.15em] font-medium">
        Cognitive dimension gap
      </div>
      <div className="space-y-3">
        {gaps.map((g) => (
          <div key={g.dim}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] text-white/50 font-medium">{g.config.name}</span>
              <span className="text-[9px] text-white/15">{g.diff >= 2 ? "Significant gap" : "Moderate gap"}</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-white/25 w-8 shrink-0 text-right font-mono">
                  {senderType}
                </span>
                <div className="flex-1 h-2 rounded-full bg-white/[0.04] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${toPct(g.sScore)}%`,
                      background:
                        "linear-gradient(90deg, hsl(252 65% 55% / 0.6), hsl(252 65% 55%))",
                    }}
                  />
                </div>
                <span className="text-[9px] text-white/20 w-6 font-mono">
                  {g.sScore > 0 ? `+${g.sScore}` : g.sScore}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-white/25 w-8 shrink-0 text-right font-mono">
                  {receiverType}
                </span>
                <div className="flex-1 h-2 rounded-full bg-white/[0.04] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${toPct(g.rScore)}%`,
                      background:
                        "linear-gradient(90deg, hsl(190 80% 50% / 0.6), hsl(190 80% 50%))",
                    }}
                  />
                </div>
                <span className="text-[9px] text-white/20 w-6 font-mono">
                  {g.rScore > 0 ? `+${g.rScore}` : g.rScore}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================
// Copy button
// =============================================

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handle = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* noop */ }
  }, [text]);
  return (
    <button
      type="button"
      onClick={handle}
      className="text-[10px] text-white/15 hover:text-white/40 transition-colors"
    >
      {copied ? (
        <span className="flex items-center gap-1"><Check className="h-3 w-3" /> Copied</span>
      ) : (
        <span className="flex items-center gap-1"><Copy className="h-3 w-3" /> Copy</span>
      )}
    </button>
  );
}

// =============================================
// Progressive reveal output section
// =============================================

const TEXT_SECTIONS: {
  id: string;
  label: string;
  key: keyof TranslateResult;
  delay: number;
}[] = [
  {
    id: "intent",
    label: "What they probably meant",
    key: "senderDeepIntent",
    delay: 300,
  },
  {
    id: "misread",
    label: "How it may be interpreted",
    key: "receiverPossibleMisread",
    delay: 600,
  },
  {
    id: "translation",
    label: "Lower-friction translation",
    key: "translatedExpression",
    delay: 1200,
  },
  {
    id: "semantics",
    label: "What you both actually share",
    key: "minimalSharedSemantics",
    delay: 1500,
  },
  {
    id: "advice",
    label: "Practical next step",
    key: "practicalNextStep",
    delay: 1800,
  },
  {
    id: "reply",
    label: "Suggested reply",
    key: "suggestedReply",
    delay: 2100,
  },
];

// The gap visualization appears after "misread" section
const GAP_INDEX = 2; // after first 2 text sections

// =============================================
// Main output component
// =============================================

interface CognitiveOutputProps {
  result: TranslateResult;
  senderType: MbtiCode;
  receiverType: MbtiCode;
}

export function CognitiveOutput({ result, senderType, receiverType }: CognitiveOutputProps) {
  const [revealed, setRevealed] = useState<string[]>([]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Text sections
    TEXT_SECTIONS.forEach((s) => {
      timers.push(
        setTimeout(() => {
          setRevealed((prev) => [...prev, s.id]);
        }, s.delay)
      );
    });

    // Gap section (after misread)
    const misreadSection = TEXT_SECTIONS[1];
    const gapDelay = (misreadSection?.delay ?? 600) + 300;
    timers.push(
      setTimeout(() => {
        setRevealed((prev) => [...prev, "gap"]);
      }, gapDelay)
    );

    return () => timers.forEach(clearTimeout);
  }, [result]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
          <span className="text-[10px] text-white/30 tracking-wider uppercase">
            Translation Analysis
          </span>
        </div>
        <p className="text-xs text-white/20 max-w-md mx-auto leading-relaxed">
          These are educated guesses based on cognitive style models.
          Real people are more complex than any type.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {(() => {
          const items: React.ReactNode[] = [];

          const gapVisible = revealed.includes("gap");

          // Render text sections + gap
          TEXT_SECTIONS.forEach((section, idx) => {
            const visible = revealed.includes(section.id);

            // Text section
            items.push(
              <div
                key={section.id}
                className={`transition-all duration-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                <div className="pl-4 border-l border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-white/15 font-mono">{String(idx + 1).padStart(2, "0")}</span>
                      <span className="text-[11px] text-white/40 uppercase tracking-[0.12em] font-medium">
                        {section.label}
                      </span>
                    </div>
                    <CopyBtn text={result[section.key]} />
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {result[section.key]}
                  </p>
                </div>
              </div>
            );

            // Insert gap after GAP_INDEX
            if (idx === GAP_INDEX - 1) {
              items.push(
                <div
                  key="gap"
                  className={`transition-all duration-700 ${
                    gapVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                  }`}
                >
                  <div className="pl-4 border-l border-white/[0.06] space-y-4">
                    <GapVis senderType={senderType} receiverType={receiverType} />
                  </div>
                </div>
              );
            }
          });

          return items;
        })()}
      </div>

      {/* Confidence note */}
      {result.confidenceNote && (
        <div className="pt-4 border-t border-white/[0.04]">
          <p className="text-[11px] text-white/15 italic leading-relaxed text-center">
            {result.confidenceNote}
          </p>
        </div>
      )}

      {/* Communication risk */}
      {result.communicationRisk && (
        <div className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.01]">
          <p className="text-[11px] text-white/20 font-medium mb-1">Communication risk</p>
          <p className="text-xs text-white/40 leading-relaxed">{result.communicationRisk}</p>
        </div>
      )}
    </div>
  );
}
