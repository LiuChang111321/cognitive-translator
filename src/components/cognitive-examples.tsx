"use client";

import { examplePresets } from "@/lib/examples";
import type { TranslateInput } from "@/lib/types";

const EXAMPLES = [
  {
    id: "example-1",
    sender: "INTJ",
    receiver: "ENFP",
    scenario: "Romantic",
    original: "\"This plan is logically incomplete. Too risky.\"",
    meaning: "\"I care about your idea and want to protect it.\"",
  },
  {
    id: "example-2",
    sender: "ENFP",
    receiver: "INTJ",
    scenario: "Romantic",
    original: "\"I just feel like something's off between us lately.\"",
    meaning: "\"I miss the emotional connection we had.\"",
  },
  {
    id: "example-3",
    sender: "INFP",
    receiver: "ESTJ",
    scenario: "Work feedback",
    original: "\"This arrangement doesn't feel right, but I can't explain why.\"",
    meaning: "\"My values aren't aligned with this approach.\"",
  },
  {
    id: "example-4",
    sender: "ENTJ",
    receiver: "ISFP",
    scenario: "Teamwork",
    original: "\"This needs to move forward this week. Give me clear results.\"",
    meaning: "\"I trust your ability to deliver on this.\"",
  },
  {
    id: "example-5",
    sender: "ENTP",
    receiver: "ISTJ",
    scenario: "Project",
    original: "\"Let's scrap the plan. I just had a much better idea.\"",
    meaning: "\"I'm excited about a new possibility I want to explore.\"",
  },
  {
    id: "example-6",
    sender: "ISFJ",
    receiver: "ESTP",
    scenario: "Friendship",
    original: "\"I want to come, but I'd feel better if plans were more settled.\"",
    meaning: "\"I value our time together and want it to go well.\"",
  },
];

interface CognitiveExamplesProps {
  onSelect: (preset: TranslateInput) => void;
}

export function CognitiveExamples({ onSelect }: CognitiveExamplesProps) {
  const presetMap = new Map(examplePresets.map((p) => [p.id, p]));

  return (
    <section className="w-full space-y-5">
      <div className="text-center space-y-2">
        <h2 className="text-sm font-medium text-white/60 tracking-wide">
          Real misunderstanding scenarios
        </h2>
        <p className="text-xs text-white/20 max-w-md mx-auto">
          Each example shows a real statement and what it probably means.
          Click to try it.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {EXAMPLES.map((ex) => {
          const preset = presetMap.get(ex.id);
          return (
            <button
              key={ex.id}
              type="button"
              onClick={() => preset && onSelect(preset)}
              className="group text-left rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-white/70">{ex.sender}</span>
                <span className="text-[10px] text-white/20">→</span>
                <span className="text-xs font-semibold text-white/70">{ex.receiver}</span>
                <span className="text-[9px] text-white/20 ml-auto">{ex.scenario}</span>
              </div>

              {/* Original */}
              <p className="text-xs text-white/40 leading-relaxed mb-1.5 font-light">
                {ex.original}
              </p>

              {/* Arrow + meaning */}
              <div className="flex items-start gap-2 text-xs text-white/30">
                <span className="text-white/15 mt-0.5">→</span>
                <span className="text-primary/60 font-medium">{ex.meaning}</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
