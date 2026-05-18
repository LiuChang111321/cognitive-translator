"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
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
  className,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
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

  return (
    <div ref={ref} className={`relative ${className || ""}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] transition-colors text-left min-w-[120px]"
      >
        <span className="text-sm font-semibold text-white/90">
          {options.find((o) => o.value === value)?.value}
        </span>
        <ChevronDown className="h-3 w-3 text-white/30 ml-auto" />
      </button>
      {open && (
        <div className="absolute z-50 top-full mt-1 left-0 w-64 max-h-64 overflow-y-auto rounded-lg border border-white/[0.08] bg-[#0d0d0f] backdrop-blur-xl shadow-2xl shadow-black/40">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs hover:bg-white/[0.06] transition-colors ${
                opt.value === value ? "bg-white/[0.04] text-white" : "text-white/60"
              }`}
            >
              <span className="font-medium">{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// =============================================
// Scenario labels
// =============================================

const SCENARIO_OPTIONS = [
  { value: "恋爱关系", english: "Romantic" },
  { value: "朋友沟通", english: "Friendship" },
  { value: "团队协作", english: "Teamwork" },
  { value: "工作反馈", english: "Work feedback" },
  { value: "自定义", english: "Custom" },
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
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Direction — mind panels */}
        <div className="flex items-stretch gap-3 sm:gap-5">
          {/* Sender panel */}
          <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 transition-colors hover:bg-white/[0.04]">
            <div className="flex items-center gap-3 mb-3">
              <PillSelect
                options={MBTI_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
                value={values.senderType}
                onChange={(v) =>
                  onValuesChange({ ...values, senderType: v as MbtiCode })
                }
              />
            </div>
            <p className="text-[11px] text-white/30 leading-relaxed tracking-wide">
              {senderInfo.shortLabel.split(" / ")[1] || senderInfo.shortLabel}
              <span className="block text-white/20 mt-0.5">
                {senderInfo.traits}
              </span>
            </p>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center shrink-0">
            <div className="w-8 h-8 rounded-full border border-white/[0.06] bg-white/[0.02] flex items-center justify-center">
              <ArrowRight className="h-3.5 w-3.5 text-white/30" />
            </div>
          </div>

          {/* Receiver panel */}
          <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 transition-colors hover:bg-white/[0.04]">
            <div className="flex items-center gap-3 mb-3">
              <PillSelect
                options={MBTI_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
                value={values.receiverType}
                onChange={(v) =>
                  onValuesChange({ ...values, receiverType: v as MbtiCode })
                }
              />
            </div>
            <p className="text-[11px] text-white/30 leading-relaxed tracking-wide">
              {receiverInfo.shortLabel.split(" / ")[1] || receiverInfo.shortLabel}
              <span className="block text-white/20 mt-0.5">
                {receiverInfo.traits}
              </span>
            </p>
          </div>
        </div>

        {/* Scenario + custom */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={values.scenario}
            onChange={(e) => handleScenarioChange(e.target.value)}
            className="bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-white/70 appearance-none cursor-pointer hover:bg-white/[0.06] transition-colors focus:outline-none focus:ring-1 focus:ring-primary/30"
          >
            {SCENARIO_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#0d0d0f]">
                {opt.value}
              </option>
            ))}
          </select>
          {values.scenario === "自定义" && (
            <input
              type="text"
              placeholder="Describe the scenario..."
              value={values.customScenario}
              onChange={(e) =>
                onValuesChange({ ...values, customScenario: e.target.value })
              }
              className="flex-1 min-w-[160px] bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-white/70 placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
          )}
          <span className="text-[10px] text-white/15 ml-auto">
            {values.originalText.length}/2000
          </span>
        </div>

        {/* Text input */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={values.originalText}
            onChange={(e) =>
              onValuesChange({ ...values, originalText: e.target.value })
            }
            placeholder="Type what someone said..."
            rows={4}
            maxLength={2000}
            className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-5 py-4 text-sm text-white/80 placeholder:text-white/15 resize-none focus:outline-none focus:border-white/[0.12] transition-colors leading-relaxed"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading || !values.originalText.trim()}
            className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.1] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="flex gap-1">
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-white/60 inline-block" />
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-white/60 inline-block" />
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-white/60 inline-block" />
                </span>
                <span className="text-white/40">Translating</span>
              </span>
            ) : (
              <>
                <span>Translate intent</span>
                <ArrowRight className="h-3.5 w-3.5 text-white/40 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Error */}
      {error && status === "error" && (
        <div className="mt-8 p-4 rounded-xl border border-red-500/20 bg-red-500/5">
          <p className="text-xs text-red-400/80">{error}</p>
        </div>
      )}

      {/* Output */}
      {result && status === "success" && (
        <div
          ref={outputRef}
          className="mt-12"
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
