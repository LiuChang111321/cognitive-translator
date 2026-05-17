"use client";

import { Button } from "@/components/ui/button";
import { examplePresets } from "@/lib/examples";
import type { TranslateInput } from "@/lib/types";

const styleColors: Record<string, string> = {
  INTJ: "border-l-violet-500",
  ENFP: "border-l-sky-500",
};

interface ExamplePresetsProps {
  onSelect: (preset: TranslateInput) => void;
}

export function ExamplePresets({ onSelect }: ExamplePresetsProps) {
  return (
    <section className="w-full space-y-4">
      <p className="text-xs text-muted-foreground text-center tracking-wider uppercase">
        快速体验
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {examplePresets.map((preset) => (
          <Button
            key={preset.id}
            variant="outline"
            size="sm"
            onClick={() =>
              onSelect({
                senderType: preset.senderType,
                receiverType: preset.receiverType,
                scenario: preset.scenario,
                customScenario: preset.customScenario,
                originalText: preset.originalText,
              })
            }
            className={`h-auto py-2.5 px-3 text-xs justify-start border-l-2 ${styleColors[preset.senderType]} ${styleColors[preset.receiverType] === styleColors[preset.senderType] ? "" : styleColors[preset.receiverType].replace("border-l-", "border-r-")} flex-col items-start gap-0.5 leading-tight`}
          >
            <span className="font-medium text-foreground">
              {preset.senderType} → {preset.receiverType}
            </span>
            <span className="text-muted-foreground font-normal">
              {preset.scenario}
            </span>
          </Button>
        ))}
      </div>
    </section>
  );
}
