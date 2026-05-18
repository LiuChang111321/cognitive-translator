"use client";

import { examplePresets } from "@/lib/examples";
import type { TranslateInput } from "@/lib/types";
import { MBTI_EMOJI } from "@/lib/constants";

interface ExampleItem {
  id: string;
  mood: string;
  sender: string;
  receiver: string;
  scenario: string;
  senderQuote: string;
  receiverHears: string;
  actuallyMeans: string;
}

const EXAMPLES: ExampleItem[] = [
  {
    id: "example-1",
    mood: "💔",
    sender: "INTJ",
    receiver: "ENFP",
    scenario: "恋爱关系",
    senderQuote: "这个计划逻辑上不完整，风险太高。",
    receiverHears: '"你在否定我的创意，你根本不相信我"',
    actuallyMeans: '"我在乎你，所以我在认真帮你想风险"',
  },
  {
    id: "example-2",
    mood: "😢",
    sender: "ENFP",
    receiver: "INTJ",
    scenario: "恋爱关系",
    senderQuote: "我只是觉得最近我们之间没有以前那种感觉了。",
    receiverHears: '"她在莫名其妙地抱怨，但我不知道哪里做错了"',
    actuallyMeans: '"我想跟你更亲密，我想念我们之间的深度连接"',
  },
  {
    id: "example-3",
    mood: "😰",
    sender: "INFP",
    receiver: "ESTJ",
    scenario: "工作反馈",
    senderQuote: "我觉得这个安排让我有点不舒服，但我也说不清楚哪里不对。",
    receiverHears: '"她有问题但不直接说，影响工作效率"',
    actuallyMeans: '"我的价值观和这个安排有冲突，我需要找到平衡"',
  },
  {
    id: "example-4",
    mood: "😤",
    sender: "ENTJ",
    receiver: "ISFP",
    scenario: "团队协作",
    senderQuote: "这个任务本周必须推进，你需要尽快给我一个明确结果。",
    receiverHears: '"他在施压，根本不关心我的困难和感受"',
    actuallyMeans: '"我信任你的能力，我相信你能交付好的结果"',
  },
  {
    id: "example-5",
    mood: "🤯",
    sender: "ENTP",
    receiver: "ISTJ",
    scenario: "团队协作",
    senderQuote: "要不我们先别按原计划走，我突然想到一个更有意思的方向。",
    receiverHears: '"他又在乱改方案，完全不尊重已经做好的工作"',
    actuallyMeans: '"我太兴奋了，这个新想法真的值得我们一起看看"',
  },
  {
    id: "example-6",
    mood: "😟",
    sender: "ISFJ",
    receiver: "ESTP",
    scenario: "朋友沟通",
    senderQuote: "我不是不想去，只是觉得如果安排能再稳定一点我会更安心。",
    receiverHears: '"她又在犹豫不决，太扫兴了"',
    actuallyMeans: '"我真的很想见你们，只是提前知道计划会让我更放松"',
  },
];

interface CognitiveExamplesProps {
  onSelect: (preset: TranslateInput) => void;
}

export function CognitiveExamples({ onSelect }: CognitiveExamplesProps) {
  const presetMap = new Map(examplePresets.map((p) => [p.id, p]));

  return (
    <section className="w-full space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-[11px] font-medium text-muted-foreground/60 tracking-wide">
          真实沟通名场面
        </h2>
        <p className="text-[10px] text-muted-foreground/40">
          点击任意场景，立刻开始翻译
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {EXAMPLES.map((ex) => {
          const preset = presetMap.get(ex.id);
          return (
            <button
              key={ex.id}
              type="button"
              onClick={() => preset && onSelect(preset)}
              className="group text-left rounded-xl border border-gray-200 bg-white p-4 hover:border-gray-300 hover:shadow-sm transition-all duration-300 active:scale-[0.99]"
            >
              {/* Header */}
              <div className="flex items-center gap-1.5 mb-2.5">
                <span className="text-xs">{ex.mood}</span>
                <span className="text-xs font-semibold text-foreground/70">
                  {MBTI_EMOJI[ex.sender as keyof typeof MBTI_EMOJI]} {ex.sender}
                </span>
                <span className="text-xs text-muted-foreground/30">→</span>
                <span className="text-xs font-semibold text-foreground/70">
                  {MBTI_EMOJI[ex.receiver as keyof typeof MBTI_EMOJI]}{" "}
                  {ex.receiver}
                </span>
                <span className="text-[10px] text-muted-foreground/30 ml-auto">
                  {ex.scenario}
                </span>
              </div>

              {/* Original quote */}
              <div className="pl-3 border-l-2 border-gray-200 mb-2.5">
                <p className="text-xs text-muted-foreground/60 leading-relaxed italic">
                  &ldquo;{ex.senderQuote}&rdquo;
                </p>
              </div>

              {/* Translation preview */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-start gap-2">
                  <span className="text-muted-foreground/30 shrink-0 mt-0.5">
                    👂
                  </span>
                  <span className="text-rose-500/70 leading-relaxed">
                    对方听到的是 {ex.receiverHears}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-muted-foreground/30 shrink-0 mt-0.5">
                    💛
                  </span>
                  <span className="text-amber-600/70 leading-relaxed">
                    其实想表达 {ex.actuallyMeans}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
