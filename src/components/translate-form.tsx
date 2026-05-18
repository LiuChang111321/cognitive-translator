"use client";

import { useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MBTI_OPTIONS, MBTI_DISPLAY } from "@/lib/constants";
import type { Scenario, TranslateInput } from "@/lib/types";
import type { CognitiveStyle } from "@/lib/types";

const SCENARIO_OPTIONS: { value: Scenario; label: string }[] = [
  { value: "恋爱关系", label: "恋爱关系" },
  { value: "朋友沟通", label: "朋友沟通" },
  { value: "团队协作", label: "团队协作" },
  { value: "工作反馈", label: "工作反馈" },
  { value: "自定义", label: "自定义" },
];

const MAX_LENGTH = 2000;

interface TranslateFormProps {
  onSubmit: (input: TranslateInput) => void;
  initialValues: TranslateInput;
  onValuesChange: (values: TranslateInput) => void;
  loading: boolean;
}

export function TranslateForm({
  onSubmit,
  initialValues,
  onValuesChange,
  loading,
}: TranslateFormProps) {
  const updateField = useCallback(
    <K extends keyof TranslateInput>(field: K, value: TranslateInput[K]) => {
      onValuesChange({ ...initialValues, [field]: value });
    },
    [initialValues, onValuesChange]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!initialValues.originalText.trim()) return;
    onSubmit(initialValues);
  };

  const senderInfo = MBTI_DISPLAY[initialValues.senderType];
  const receiverInfo = MBTI_DISPLAY[initialValues.receiverType];

  return (
    <Card className="w-full border shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          开始翻译
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Direction selector */}
          <div className="space-y-3">
            <Label className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
              翻译方向
            </Label>
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <Select
                  value={initialValues.senderType}
                  onValueChange={(v) =>
                    updateField("senderType", v as CognitiveStyle)
                  }
                >
                  <SelectTrigger id="senderType" className="font-medium">
                    <SelectValue placeholder="发送者" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {MBTI_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        <span className="text-xs font-medium">{opt.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-[10px] text-muted-foreground mt-1 leading-tight">
                  倾向：{senderInfo.traits}
                </p>
              </div>

              <div className="shrink-0 text-muted-foreground mt-6">
                <ArrowRight className="h-5 w-5" />
              </div>

              <div className="flex-1 min-w-0">
                <Select
                  value={initialValues.receiverType}
                  onValueChange={(v) =>
                    updateField("receiverType", v as CognitiveStyle)
                  }
                >
                  <SelectTrigger id="receiverType" className="font-medium">
                    <SelectValue placeholder="接收者" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {MBTI_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        <span className="text-xs font-medium">{opt.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-[10px] text-muted-foreground mt-1 leading-tight">
                  倾向：{receiverInfo.traits}
                </p>
              </div>
            </div>
          </div>

          {/* Scenario */}
          <div className="space-y-2">
            <Label
              htmlFor="scenario"
              className="text-xs text-muted-foreground uppercase tracking-wider font-medium"
            >
              场景
            </Label>
            <Select
              value={initialValues.scenario}
              onValueChange={(v) => updateField("scenario", v as Scenario)}
            >
              <SelectTrigger id="scenario">
                <SelectValue placeholder="选择场景" />
              </SelectTrigger>
              <SelectContent>
                {SCENARIO_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {initialValues.scenario === "自定义" && (
            <div className="space-y-2">
              <Label htmlFor="customScenario">自定义场景描述</Label>
              <Input
                id="customScenario"
                placeholder="请描述具体场景..."
                value={initialValues.customScenario}
                onChange={(e) =>
                  updateField("customScenario", e.target.value)
                }
              />
            </div>
          )}

          {/* Text input */}
          <div className="space-y-2">
            <Label
              htmlFor="originalText"
              className="text-xs text-muted-foreground uppercase tracking-wider font-medium"
            >
              原始表达内容
            </Label>
            <Textarea
              id="originalText"
              placeholder="输入对方说的话..."
              value={initialValues.originalText}
              onChange={(e) => updateField("originalText", e.target.value)}
              rows={5}
              maxLength={MAX_LENGTH}
              className="resize-none"
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">
                {initialValues.originalText.length === 0
                  ? "输入需要翻译的表达"
                  : `${initialValues.originalText.length} / ${MAX_LENGTH}`}
              </p>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading || !initialValues.originalText.trim()}
            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-sm transition-all duration-200"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                翻译中...
              </span>
            ) : (
              "翻译"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
