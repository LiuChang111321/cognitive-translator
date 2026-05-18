"use client";

import { useState } from "react";
import {
  Check,
  Copy,
  MessageSquare,
  Brain,
  AlertTriangle,
  RefreshCw,
  Reply,
  Heart,
  Zap,
  Compass,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { TranslateResult } from "@/lib/types";

interface TranslationResultProps {
  result: TranslateResult | null;
  loading: boolean;
  error: string | null;
}

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 text-[11px] text-muted-foreground/60 hover:text-muted-foreground transition-colors"
      title="复制"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3" />
          {label ? "已复制" : ""}
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" />
          {label ? "复制" : ""}
        </>
      )}
    </button>
  );
}

const SECTION_CONFIG = [
  {
    key: "surfaceMeaning" as const,
    label: "表层含义",
    icon: MessageSquare,
    accent: "border-l-blue-400",
  },
  {
    key: "senderDeepIntent" as const,
    label: "深层意图",
    icon: Brain,
    accent: "border-l-violet-400",
  },
  {
    key: "receiverPossibleMisread" as const,
    label: "可能的误解",
    icon: AlertTriangle,
    accent: "border-l-amber-400",
  },
  {
    key: "translatedExpression" as const,
    label: "改写版本",
    icon: RefreshCw,
    accent: "border-l-emerald-400",
  },
  {
    key: "cognitiveGap" as const,
    label: "认知差异分析",
    icon: Zap,
    accent: "border-l-orange-400",
  },
  {
    key: "communicationRisk" as const,
    label: "沟通风险",
    icon: AlertTriangle,
    accent: "border-l-red-400",
  },
  {
    key: "suggestedReply" as const,
    label: "回复建议",
    icon: Reply,
    accent: "border-l-sky-400",
  },
  {
    key: "minimalSharedSemantics" as const,
    label: "最小共同语义集",
    icon: Heart,
    accent: "border-l-rose-400",
  },
  {
    key: "practicalNextStep" as const,
    label: "实际行动建议",
    icon: Compass,
    accent: "border-l-teal-400",
  },
];

function ResultItem({
  label,
  value,
  accent,
  icon: Icon,
}: {
  label: string;
  value: string;
  accent: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div
      className={`pl-4 border-l-2 ${accent} space-y-2 animate-fade-in-up`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center">
            <Icon className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
            {label}
          </span>
        </div>
        <CopyButton text={value} label="复制" />
      </div>
      <p className="text-sm leading-relaxed text-foreground/90">{value}</p>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <Card className="w-full border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">分析结果</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="pl-4 border-l-2 border-muted space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-7 w-7 rounded-md" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ErrorCard({ error }: { error: string }) {
  return (
    <Card className="w-full border-red-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </div>
          <div>
            <CardTitle className="text-sm text-red-600">翻译失败</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-red-600/80">{error}</p>
      </CardContent>
    </Card>
  );
}

export function TranslationResult({
  result,
  loading,
  error,
}: TranslationResultProps) {
  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorCard error={error} />;
  if (!result) return null;

  return (
    <Card className="w-full border shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          分析结果
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {SECTION_CONFIG.map((section) => (
          <ResultItem
            key={section.key}
            label={section.label}
            value={result[section.key]}
            accent={section.accent}
            icon={section.icon}
          />
        ))}

        {result.confidenceNote && (
          <div className="mt-6 pt-4 border-t text-center">
            <p className="text-xs text-muted-foreground/60 italic leading-relaxed max-w-md mx-auto">
              {result.confidenceNote}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
