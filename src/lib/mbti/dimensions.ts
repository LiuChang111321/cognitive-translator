import type { MbtiCode } from "./types";

// ============================================================
// 8 cognitive dimensions for gap analysis
// ============================================================

export type DimensionId =
  | "abstract_vs_concrete"
  | "long_term_vs_immediate"
  | "logic_vs_emotion"
  | "structure_vs_exploration"
  | "direct_vs_high_context"
  | "task_vs_relationship"
  | "risk_vs_opportunity"
  | "autonomy_vs_coordination";

export const ALL_DIMENSIONS: DimensionId[] = [
  "abstract_vs_concrete",
  "long_term_vs_immediate",
  "logic_vs_emotion",
  "structure_vs_exploration",
  "direct_vs_high_context",
  "task_vs_relationship",
  "risk_vs_opportunity",
  "autonomy_vs_coordination",
];

export interface DimensionConfig {
  name: string;
  highLabel: string; // +2 pole
  lowLabel: string; // -2 pole
  guidanceHighToLow: string; // sender higher (more X), receiver lower (less X)
  guidanceLowToHigh: string; // sender lower, receiver higher
}

export const DIMENSION_CONFIGS: Record<DimensionId, DimensionConfig> = {
  abstract_vs_concrete: {
    name: "抽象 vs 具体",
    highLabel: "抽象概念导向",
    lowLabel: "具体事实导向",
    guidanceHighToLow:
      "发送者倾向抽象概念，接收者倾向具体事实。建议补充具体事例和可操作步骤，帮助接收者建立具象认知。",
    guidanceLowToHigh:
      "发送者倾向具体信息，接收者倾向抽象概念。建议将具体信息提升到模式、原则或概念层面，帮助接收者看到更大图景。",
  },
  long_term_vs_immediate: {
    name: "长期战略 vs 当下体验",
    highLabel: "长期战略导向",
    lowLabel: "当下体验导向",
    guidanceHighToLow:
      "发送者倾向长期战略，接收者关注当下体验。建议补充短期可执行步骤和即时价值，帮助接收者建立参与感。",
    guidanceLowToHigh:
      "发送者倾向当下体验，接收者关注长期战略。建议补充长期影响和战略意义，帮助接收者看到长远价值。",
  },
  logic_vs_emotion: {
    name: "逻辑校验 vs 情绪确认",
    highLabel: "逻辑校验优先",
    lowLabel: "情绪确认优先",
    guidanceHighToLow:
      "发送者倾向逻辑校验，接收者倾向情绪确认。建议保留逻辑核心，但先做情绪承接和情感确认，避免直接以否定或批评开头。",
    guidanceLowToHigh:
      "发送者倾向情绪表达，接收者倾向逻辑分析。建议将情感诉求转化为清晰的事实陈述和合理请求，减少情绪化表达。",
  },
  structure_vs_exploration: {
    name: "结构秩序 vs 开放探索",
    highLabel: "结构秩序优先",
    lowLabel: "开放探索优先",
    guidanceHighToLow:
      "发送者倾向结构秩序，接收者倾向开放探索。建议在保持框架的同时给发散想法留出空间，避免过早封闭可能性。",
    guidanceLowToHigh:
      "发送者倾向开放探索，接收者倾向结构秩序。建议将发散想法整理成目标、假设、下一步和边界，让对方有框架可循。",
  },
  direct_vs_high_context: {
    name: "直接表达 vs 高语境表达",
    highLabel: "直接表达",
    lowLabel: "高语境/含蓄表达",
    guidanceHighToLow:
      "发送者倾向直接表达，接收者倾向含蓄表达。建议降低压迫感，补充关系意图和语气缓冲，避免显得过于生硬。",
    guidanceLowToHigh:
      "发送者倾向含蓄表达，接收者倾向直接表达。建议更明确直接地表述核心诉求，减少对方的猜测负担。",
  },
  task_vs_relationship: {
    name: "任务结果 vs 关系氛围",
    highLabel: "任务结果优先",
    lowLabel: "关系氛围优先",
    guidanceHighToLow:
      "发送者倾向任务结果，接收者倾向关系氛围。建议补充对人际关系的关注，说明任务对人或团队的意义与价值。",
    guidanceLowToHigh:
      "发送者倾向关系氛围，接收者倾向任务结果。建议将情绪和关系诉求转化为明确请求、事实和行动建议。",
  },
  risk_vs_opportunity: {
    name: "风险扫描 vs 机会探索",
    highLabel: "风险扫描倾向",
    lowLabel: "机会探索倾向",
    guidanceHighToLow:
      "发送者倾向风险扫描，接收者倾向探索机会。建议在指出风险的同时，先肯定可能性和积极面，避免以警告开头。",
    guidanceLowToHigh:
      "发送者倾向机会探索，接收者倾向扫描风险。建议主动识别和承认潜在风险，补充可行性分析和边界条件。",
  },
  autonomy_vs_coordination: {
    name: "自主边界 vs 群体协调",
    highLabel: "自主边界优先",
    lowLabel: "群体协调优先",
    guidanceHighToLow:
      "发送者倾向独立自主，接收者倾向群体协调。建议补充对群体影响的考虑，表达对他人的尊重和包容。",
    guidanceLowToHigh:
      "发送者倾向群体协调，接收者倾向独立自主。建议尊重对方的独立性和自主决策空间，避免过度介入或代决。",
  },
};

// ============================================================
// Dimension scores per MBTI type (–2 to +2)
// ============================================================

type DimensionScores = Record<DimensionId, number>;

export const TYPE_DIMENSIONS: Record<MbtiCode, DimensionScores> = {
  INTJ: {
    abstract_vs_concrete: 2,
    long_term_vs_immediate: 2,
    logic_vs_emotion: 2,
    structure_vs_exploration: 1,
    direct_vs_high_context: 1,
    task_vs_relationship: 2,
    risk_vs_opportunity: 2,
    autonomy_vs_coordination: 1,
  },
  INTP: {
    abstract_vs_concrete: 2,
    long_term_vs_immediate: 0,
    logic_vs_emotion: 2,
    structure_vs_exploration: -1,
    direct_vs_high_context: 0,
    task_vs_relationship: 1,
    risk_vs_opportunity: 1,
    autonomy_vs_coordination: 2,
  },
  ENTJ: {
    abstract_vs_concrete: 1,
    long_term_vs_immediate: 2,
    logic_vs_emotion: 2,
    structure_vs_exploration: 2,
    direct_vs_high_context: 2,
    task_vs_relationship: 2,
    risk_vs_opportunity: 1,
    autonomy_vs_coordination: 0,
  },
  ENTP: {
    abstract_vs_concrete: 2,
    long_term_vs_immediate: -1,
    logic_vs_emotion: 1,
    structure_vs_exploration: -2,
    direct_vs_high_context: 1,
    task_vs_relationship: -1,
    risk_vs_opportunity: -1,
    autonomy_vs_coordination: 1,
  },
  INFJ: {
    abstract_vs_concrete: 2,
    long_term_vs_immediate: 2,
    logic_vs_emotion: -1,
    structure_vs_exploration: 1,
    direct_vs_high_context: -1,
    task_vs_relationship: -1,
    risk_vs_opportunity: 1,
    autonomy_vs_coordination: -1,
  },
  INFP: {
    abstract_vs_concrete: 1,
    long_term_vs_immediate: -1,
    logic_vs_emotion: -2,
    structure_vs_exploration: -2,
    direct_vs_high_context: -1,
    task_vs_relationship: -2,
    risk_vs_opportunity: -1,
    autonomy_vs_coordination: 2,
  },
  ENFJ: {
    abstract_vs_concrete: 1,
    long_term_vs_immediate: 1,
    logic_vs_emotion: -2,
    structure_vs_exploration: 1,
    direct_vs_high_context: 0,
    task_vs_relationship: -2,
    risk_vs_opportunity: 0,
    autonomy_vs_coordination: -2,
  },
  ENFP: {
    abstract_vs_concrete: 2,
    long_term_vs_immediate: -1,
    logic_vs_emotion: -2,
    structure_vs_exploration: -2,
    direct_vs_high_context: 0,
    task_vs_relationship: -2,
    risk_vs_opportunity: -2,
    autonomy_vs_coordination: -1,
  },
  ISTJ: {
    abstract_vs_concrete: -2,
    long_term_vs_immediate: 1,
    logic_vs_emotion: 2,
    structure_vs_exploration: 2,
    direct_vs_high_context: 1,
    task_vs_relationship: 2,
    risk_vs_opportunity: 2,
    autonomy_vs_coordination: 1,
  },
  ISFJ: {
    abstract_vs_concrete: -2,
    long_term_vs_immediate: 0,
    logic_vs_emotion: -1,
    structure_vs_exploration: 1,
    direct_vs_high_context: -1,
    task_vs_relationship: -1,
    risk_vs_opportunity: 1,
    autonomy_vs_coordination: -1,
  },
  ESTJ: {
    abstract_vs_concrete: -1,
    long_term_vs_immediate: 1,
    logic_vs_emotion: 2,
    structure_vs_exploration: 2,
    direct_vs_high_context: 2,
    task_vs_relationship: 2,
    risk_vs_opportunity: 2,
    autonomy_vs_coordination: -1,
  },
  ESFJ: {
    abstract_vs_concrete: -1,
    long_term_vs_immediate: 0,
    logic_vs_emotion: -1,
    structure_vs_exploration: 1,
    direct_vs_high_context: 0,
    task_vs_relationship: -1,
    risk_vs_opportunity: 0,
    autonomy_vs_coordination: -2,
  },
  ISTP: {
    abstract_vs_concrete: -1,
    long_term_vs_immediate: -1,
    logic_vs_emotion: 1,
    structure_vs_exploration: -1,
    direct_vs_high_context: 1,
    task_vs_relationship: 1,
    risk_vs_opportunity: -1,
    autonomy_vs_coordination: 2,
  },
  ISFP: {
    abstract_vs_concrete: -1,
    long_term_vs_immediate: -1,
    logic_vs_emotion: -2,
    structure_vs_exploration: -1,
    direct_vs_high_context: -1,
    task_vs_relationship: -1,
    risk_vs_opportunity: -1,
    autonomy_vs_coordination: 1,
  },
  ESTP: {
    abstract_vs_concrete: -2,
    long_term_vs_immediate: -2,
    logic_vs_emotion: 1,
    structure_vs_exploration: -2,
    direct_vs_high_context: 2,
    task_vs_relationship: 1,
    risk_vs_opportunity: -2,
    autonomy_vs_coordination: 0,
  },
  ESFP: {
    abstract_vs_concrete: -2,
    long_term_vs_immediate: -1,
    logic_vs_emotion: -1,
    structure_vs_exploration: -1,
    direct_vs_high_context: 0,
    task_vs_relationship: -1,
    risk_vs_opportunity: -2,
    autonomy_vs_coordination: -1,
  },
};

// ============================================================
// Gap guidance generation
// ============================================================

const GAP_THRESHOLD = 2; // only generate guidance when |diff| >= this

export function getDimensionGapGuidance(
  sender: MbtiCode,
  receiver: MbtiCode
): string {
  if (sender === receiver) {
    return "双方认知风格相同，个体表达方式仍有差异，请注意表达方式的细微调整，避免假设对方完全按照自己的方式理解。";
  }

  const sScores = TYPE_DIMENSIONS[sender];
  const rScores = TYPE_DIMENSIONS[receiver];
  const items: string[] = [];

  for (const dim of ALL_DIMENSIONS) {
    const diff = sScores[dim] - rScores[dim];
    if (Math.abs(diff) >= GAP_THRESHOLD) {
      const cfg = DIMENSION_CONFIGS[dim];
      const guidance = diff > 0 ? cfg.guidanceHighToLow : cfg.guidanceLowToHigh;
      items.push(`【${cfg.name}】${guidance}`);
    }
  }

  return items.length > 0
    ? items.join("\n")
    : "双方认知维度差异较小，但各维度倾向仍有不同，请根据具体沟通情境灵活调整表达方式。";
}
