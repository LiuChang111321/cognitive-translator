"use client";

import { useCallback, useState } from "react";
import { Hero } from "@/components/hero";
import { Description } from "@/components/description";
import { TranslateForm } from "@/components/translate-form";
import { TranslationResult } from "@/components/translation-result";
import { ExamplePresets } from "@/components/example-presets";
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
    <main className="flex-1 flex flex-col items-center px-4 sm:px-6 max-w-2xl mx-auto w-full">
      <Hero />
      <Description />
      <div className="w-full space-y-6 mt-6">
        <ExamplePresets onSelect={handleExampleSelect} />
        <TranslateForm
          onSubmit={handleSubmit}
          initialValues={formValues}
          onValuesChange={setFormValues}
          loading={loading}
        />
        <TranslationResult result={result} loading={loading} error={error} />
      </div>
      <Disclaimer />
    </main>
  );
}
