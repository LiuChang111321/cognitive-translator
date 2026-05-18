"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { MBTI_DISPLAY, MBTI_OPTIONS } from "@/lib/constants";
import type { MbtiCode } from "@/lib/mbti/types";
import type { Scenario, TranslateInput, TranslateResult } from "@/lib/types";
import { CognitiveOutput } from "./cognitive-output";

// =============================================
// Mini select component for type
// =============================================

function PillSelect({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-colors text-left shadow-sm w-full"
      >
        <span className="text-sm font-semibold text-foreground truncate">
          {selected?.label ?? value}
        </span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/40 ml-auto shrink-0" />
      </button>
      {open && (
        <div className="absolute z-50 top-full mt-1.5 left-0 w-56 max-h-64 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg shadow-black/5">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 text-xs transition-colors ${
                opt.value === value
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-gray-50"
              }`}
            >
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// =============================================
// Scenario options
// =============================================

const SCENARIO_OPTIONS = [
  { value: "恋爱关系", label: "💕 恋爱关系" },
  { value: "朋友沟通", label: "🍻 朋友沟通" },
  { value: "团队协作", label: "🤝 团队协作" },
  { value: "工作反馈", label: "💼 工作反馈" },
  { value: "自定义", label: "✏️ 自定义" },
];

// =============================================
// Main translator component
// =============================================

interface CognitiveTranslatorProps {
  onSubmit: (input: TranslateInput) => void;
  values: TranslateInput;
  onValuesChange: (values: TranslateInput) => void;
  loading: boolean;
  result: TranslateResult | null;
  error: string | null;
  status: string;
}

export function CognitiveTranslator({
  onSubmit,
  values,
  onValuesChange,
  loading,
  result,
  error,
  status,
}: CognitiveTranslatorProps) {
  const outputRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleScenarioChange = useCallback(
    (v: string) => {
      onValuesChange({
        ...values,
        scenario: v as Scenario,
        customScenario: v !== "自定义" ? "" : values.customScenario,
      });
    },
    [values, onValuesChange]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!values.originalText.trim()) return;
      onSubmit(values);
    },
    [values, onSubmit]
  );

  // Scroll to output when results arrive
  useEffect(() => {
    if ((status === "success" || status === "error") && outputRef.current) {
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  }, [status]);

  const senderInfo = MBTI_DISPLAY[values.senderType];
  const receiverInfo = MBTI_DISPLAY[values.receiverType];

  return (
    <section className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Direction — sender & receiver */}
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          {/* Sender panel */}
          <div className="flex-1">
            <label className="block text-[11px] text-muted-foreground/60 mb-1.5 font-medium tracking-wide">
              说这句话的人
            </label>
            <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
              <PillSelect
                options={MBTI_OPTIONS.map((o) => ({
                  value: o.value,
                  label: o.label,
                }))}
                value={values.senderType}
                onChange={(v) =>
                  onValuesChange({ ...values, senderType: v as MbtiCode })
                }
              />
              <p className="text-[11px] text-muted-foreground/40 mt-2 leading-relaxed">
                {senderInfo.traits}
              </p>
            </div>
          </div>

          {/* Arrow connector */}
          <div className="flex items-center justify-center sm:pt-8 shrink-0">
            <div className="w-7 h-7 rounded-full bg-primary/8 border border-primary/15 flex items-center justify-center">
              <span className="text-sm text-primary/50 sm:block hidden">→</span>
              <span className="text-sm text-primary/50 sm:hidden block">↓</span>
            </div>
          </div>

          {/* Receiver panel */}
          <div className="flex-1">
            <label className="block text-[11px] text-muted-foreground/60 mb-1.5 font-medium tracking-wide">
              听这句话的人
            </label>
            <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
              <PillSelect
                options={MBTI_OPTIONS.map((o) => ({
                  value: o.value,
                  label: o.label,
                }))}
                value={values.receiverType}
                onChange={(v) =>
                  onValuesChange({ ...values, receiverType: v as MbtiCode })
                }
              />
              <p className="text-[11px] text-muted-foreground/40 mt-2 leading-relaxed">
                {receiverInfo.traits}
              </p>
            </div>
          </div>
        </div>

        {/* Scenario + custom */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={values.scenario}
            onChange={(e) => handleScenarioChange(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-foreground/70 appearance-none cursor-pointer hover:border-gray-300 transition-colors focus:outline-none focus:ring-1 focus:ring-primary/30 shadow-sm"
          >
            {SCENARIO_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {values.scenario === "自定义" && (
            <input
              type="text"
              placeholder="描述一下场景..."
              value={values.customScenario}
              onChange={(e) =>
                onValuesChange({ ...values, customScenario: e.target.value })
              }
              className="flex-1 min-w-[160px] bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-foreground/70 placeholder:text-muted-foreground/30 focus:outline-none focus:ring-1 focus:ring-primary/30 shadow-sm"
            />
          )}
          {values.scenario !== "自定义" && (
            <span className="text-[10px] text-muted-foreground/25 ml-auto">
              {values.originalText.length}/2000
            </span>
          )}
        </div>

        {/* Text input */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={values.originalText}
            onChange={(e) =>
              onValuesChange({ ...values, originalText: e.target.value })
            }
            placeholder="把ta说过的话粘贴到这里..."
            rows={3}
            maxLength={2000}
            className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 text-sm text-foreground/80 placeholder:text-muted-foreground/30 resize-none focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-colors leading-relaxed shadow-sm"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading || !values.originalText.trim()}
            className="group relative inline-flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-medium text-white bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-sm shadow-primary/20 active:scale-[0.98]"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="flex gap-1">
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-white/80 inline-block" />
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-white/80 inline-block" />
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-white/80 inline-block" />
                </span>
                <span className="text-white/70">翻译中</span>
              </span>
            ) : (
              <span>🪄 翻译一下</span>
            )}
          </button>
        </div>
      </form>

      {/* Error */}
      {error && status === "error" && (
        <div className="mt-6 p-4 rounded-xl border border-destructive/30 bg-destructive/5">
          <p className="text-xs text-destructive/80">{error}</p>
        </div>
      )}

      {/* Output */}
      {result && status === "success" && (
        <div
          ref={outputRef}
          className="mt-10"
          key={result.senderDeepIntent.slice(0, 60)}
        >
          <CognitiveOutput
            result={result}
            senderType={values.senderType}
            receiverType={values.receiverType}
          />
        </div>
      )}
    </section>
  );
}
