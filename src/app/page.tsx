"use client";

import { useCallback, useState } from "react";
import { CognitiveHero } from "@/components/cognitive-hero";
import { CognitiveExamples } from "@/components/cognitive-examples";
import { CognitiveTranslator } from "@/components/cognitive-translator";
import { CognitiveAbout } from "@/components/cognitive-about";
import { Disclaimer } from "@/components/disclaimer";
import { useTranslate } from "@/hooks/use-translate";
import type { TranslateInput } from "@/lib/types";

const DEFAULT_INPUT: TranslateInput = {
  senderType: "INTJ",
  receiverType: "ENFP",
  scenario: "恋爱关系",
  customScenario: "",
  originalText: "",
};

export default function Home() {
  const { status, result, error, translate } = useTranslate();
  const [formValues, setFormValues] = useState<TranslateInput>(DEFAULT_INPUT);

  const handleSubmit = useCallback(
    (input: TranslateInput) => {
      translate(input);
    },
    [translate]
  );

  const handleExampleSelect = useCallback((preset: TranslateInput) => {
    setFormValues(preset);
  }, []);

  const loading = status === "loading";

  return (
    <main className="flex-1 flex flex-col items-center px-4 sm:px-6 max-w-xl mx-auto w-full">
      <CognitiveHero />

      <div className="w-full space-y-12 mt-2 mb-16">
        <CognitiveTranslator
          onSubmit={handleSubmit}
          values={formValues}
          onValuesChange={setFormValues}
          loading={loading}
          result={result}
          error={error}
          status={status}
        />

        <CognitiveExamples onSelect={handleExampleSelect} />
        <CognitiveAbout />
        <Disclaimer />
      </div>
    </main>
  );
}
