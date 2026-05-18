import type { MbtiCode } from "./mbti/types";

// ============================================================
// UI display constants for 16 MBTI types
// ============================================================

export interface MbtiDisplayInfo {
  shortLabel: string; // e.g. "战略型"
  traits: string; // e.g. "长期、结构、风险扫描、逻辑闭环"
  color: string; // CSS hsl or hex for border/accent
  emoji: string; // emoji for the type
}

export const MBTI_DISPLAY: Record<MbtiCode, MbtiDisplayInfo> = {
  INTJ: {
    shortLabel: "战略型",
    traits: "长期、结构、风险扫描、逻辑闭环",
    color: "#7c5cfc",
    emoji: "🧠",
  },
  INTP: {
    shortLabel: "逻辑型",
    traits: "原理、定义、一致性、理论可能性",
    color: "#6366f1",
    emoji: "🔬",
  },
  ENTJ: {
    shortLabel: "指挥型",
    traits: "目标、效率、资源配置、执行力",
    color: "#ef4444",
    emoji: "👑",
  },
  ENTP: {
    shortLabel: "辩论型",
    traits: "发散、挑战假设、可能性、智力刺激",
    color: "#f97316",
    emoji: "⚡",
  },
  INFJ: {
    shortLabel: "倡导型",
    traits: "意义、动机、价值一致、深层关系",
    color: "#a855f7",
    emoji: "🔮",
  },
  INFP: {
    shortLabel: "调停型",
    traits: "个人意义、情绪真实、内心价值",
    color: "#ec4899",
    emoji: "🌸",
  },
  ENFJ: {
    shortLabel: "主人公型",
    traits: "他人感受、团队凝聚、共同成长",
    color: "#f43f5e",
    emoji: "💫",
  },
  ENFP: {
    shortLabel: "倡导型",
    traits: "情绪能量、创意可能性、被理解感",
    color: "#0ea5e9",
    emoji: "🌟",
  },
  ISTJ: {
    shortLabel: "物流型",
    traits: "规则、可靠性、经验、责任",
    color: "#3b82f6",
    emoji: "📋",
  },
  ISFJ: {
    shortLabel: "守卫型",
    traits: "关怀、稳定、现实支持、具体责任",
    color: "#06b6d4",
    emoji: "🛡️",
  },
  ESTJ: {
    shortLabel: "总经理型",
    traits: "效率、标准、流程、责任边界",
    color: "#10b981",
    emoji: "📊",
  },
  ESFJ: {
    shortLabel: "执政官型",
    traits: "礼貌、和谐、他人反馈、共同规范",
    color: "#22c55e",
    emoji: "🤝",
  },
  ISTP: {
    shortLabel: "鉴赏家型",
    traits: "可行、直接解决、低废话、高自主",
    color: "#14b8a6",
    emoji: "🔧",
  },
  ISFP: {
    shortLabel: "探险家型",
    traits: "当下感受、个人节奏、真实体验",
    color: "#84cc16",
    emoji: "🎨",
  },
  ESTP: {
    shortLabel: "企业家型",
    traits: "机会、行动、现实收益、互动刺激",
    color: "#eab308",
    emoji: "🎯",
  },
  ESFP: {
    shortLabel: "表演者型",
    traits: "快乐、情绪感染、人际互动、体验",
    color: "#d97706",
    emoji: "🎉",
  },
};

export const MBTI_OPTIONS = Object.entries(MBTI_DISPLAY).map(
  ([value, info]) => ({
    value: value as MbtiCode,
    label: `${info.emoji} ${value} · ${info.shortLabel}`,
    traits: info.traits,
  })
);

export const MBTI_EMOJI: Record<MbtiCode, string> = {
  INTJ: "🧠",
  INTP: "🔬",
  ENTJ: "👑",
  ENTP: "⚡",
  INFJ: "🔮",
  INFP: "🌸",
  ENFJ: "💫",
  ENFP: "🌟",
  ISTJ: "📋",
  ISFJ: "🛡️",
  ESTJ: "📊",
  ESFJ: "🤝",
  ISTP: "🔧",
  ISFP: "🎨",
  ESTP: "🎯",
  ESFP: "🎉",
};
