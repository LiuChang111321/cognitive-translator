"use client";

import { useState } from "react";
import type { TranslateInput, TranslateResult, TranslateStatus } from "@/lib/types";

interface UseTranslateReturn {
  status: TranslateStatus;
  result: TranslateResult | null;
  error: string | null;
  translate: (input: TranslateInput) => Promise<void>;
  reset: () => void;
}

export function useTranslate(): UseTranslateReturn {
  const [status, setStatus] = useState<TranslateStatus>("idle");
  const [result, setResult] = useState<TranslateResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const translate = async (input: TranslateInput) => {
    setStatus("loading");
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          body.error || `请求失败 (${res.status})`
        );
      }

      const data: TranslateResult = await res.json();
      setResult(data);
      setStatus("success");
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "未知错误，请稍后重试";
      setError(msg);
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setResult(null);
    setError(null);
  };

  return { status, result, error, translate, reset };
}
