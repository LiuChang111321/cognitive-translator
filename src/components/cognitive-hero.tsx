"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const INTJ_TEXT = "This plan has too many risks.";
const ENFP_TEXT = "I want to help make your idea stronger.";

type FlowStage =
  | "idle"
  | "intj-label"
  | "intj-typing"
  | "intj-done"
  | "layer"
  | "enfp-label"
  | "enfp-typing"
  | "enfp-done"
  | "pause";

function TypingText({
  text,
  active,
  onComplete,
}: {
  text: string;
  active: boolean;
  onComplete: () => void;
}) {
  const [displayed, setDisplayed] = useState("");
  const onCompleteRef = useRef(onComplete);

  // Keep ref current without triggering during render
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    if (!active) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(timer);
        onCompleteRef.current();
      }
    }, 28);
    return () => clearInterval(timer);
  }, [active, text]);

  return (
    <span className="relative">
      {displayed}
      {active && displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-primary/70 ml-[1px] -mb-[1px] animate-pulse" />
      )}
    </span>
  );
}

export function CognitiveHero() {
  const [stage, setStage] = useState<FlowStage>("idle");
  const [loopKey, setLoopKey] = useState(0);
  const advance = useCallback((next: FlowStage) => {
    setStage(next);
  }, []);

  const onIntjTyped = useCallback(() => advance("intj-done"), [advance]);
  const onEnfpTyped = useCallback(() => advance("enfp-done"), [advance]);

  useEffect(() => {
    const t1 = setTimeout(() => setStage("intj-label"), 600);
    return () => clearTimeout(t1);
  }, [loopKey]);

  useEffect(() => {
    if (stage === "intj-done") {
      const t = setTimeout(() => setStage("layer"), 600);
      return () => clearTimeout(t);
    }
    if (stage === "layer") {
      const t = setTimeout(() => setStage("enfp-label"), 900);
      return () => clearTimeout(t);
    }
    if (stage === "enfp-label") {
      const t = setTimeout(() => setStage("enfp-typing"), 400);
      return () => clearTimeout(t);
    }
    if (stage === "enfp-done") {
      const t = setTimeout(() => setStage("pause"), 2500);
      return () => clearTimeout(t);
    }
    if (stage === "pause") {
      const t = setTimeout(() => {
        setStage("idle");
        setLoopKey((k) => k + 1);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [stage]);

  return (
    <section className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/8 blur-[120px]" />
      </div>

      <div className="relative space-y-8">
        {/* Headline */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15]">
            <span className="text-foreground">Most conflicts are</span>{" "}
            <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
              failed translations.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground/70 max-w-xl mx-auto leading-relaxed">
            AI-powered cognitive translation between{" "}
            <span className="text-foreground/90">16 communication styles</span>.
            <br className="hidden sm:block" />
            Not judgment. Not diagnosis. Just understanding.
          </p>
        </div>

        {/* Translation Flow Visualization */}
        <div
          className="relative mx-auto max-w-lg rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-5 sm:p-6"
          key={loopKey}
        >
          {/* Sender */}
          <div
            className={`transition-all duration-700 ${stage === "idle" ? "opacity-0" : "opacity-100"}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-white/90 tracking-widest uppercase">
                INTJ
              </span>
              <span className="text-[10px] text-white/30 tracking-wide">
                Strategic cognition
              </span>
            </div>
            <div className="text-sm text-white/70 pl-0.5 min-h-[1.5em] font-light tracking-wide">
              <TypingText
                text={INTJ_TEXT}
                active={stage === "intj-typing"}
                onComplete={onIntjTyped}
              />
            </div>
          </div>

          {/* Translation Layer */}
          <div
            className={`my-4 sm:my-5 flex items-center gap-3 transition-all duration-700 ${
              stage === "idle" ||
              stage === "intj-label" ||
              stage === "intj-typing"
                ? "opacity-0 translate-y-2"
                : "opacity-100 translate-y-0"
            }`}
          >
            <div className="flex-1 h-px bg-gradient-to-r from-primary/40 via-primary/60 to-transparent" />
            <span className="text-[10px] text-primary/50 tracking-[0.2em] uppercase font-medium whitespace-nowrap">
              AI Translation Layer
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-primary/40 via-primary/60 to-transparent" />
          </div>

          {/* Receiver */}
          <div
            className={`transition-all duration-700 ${
              stage === "idle" ||
              stage === "intj-label" ||
              stage === "intj-typing" ||
              stage === "intj-done" ||
              stage === "layer"
                ? "opacity-0 translate-y-3"
                : "opacity-100 translate-y-0"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-white/90 tracking-widest uppercase">
                ENFP
              </span>
              <span className="text-[10px] text-white/30 tracking-wide">
                Possibility cognition
              </span>
            </div>
            <div className="text-sm text-white/70 pl-0.5 min-h-[1.5em] font-light tracking-wide">
              <TypingText
                text={ENFP_TEXT}
                active={stage === "enfp-typing"}
                onComplete={onEnfpTyped}
              />
            </div>
          </div>

          {/* Bottom glow line */}
          <div
            className={`absolute -bottom-px left-8 right-8 h-px transition-opacity duration-1000 ${
              stage === "idle" ? "opacity-0" : "opacity-100"
            }`}
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(252 65% 55% / 0.3), hsl(190 80% 50% / 0.3), transparent)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
