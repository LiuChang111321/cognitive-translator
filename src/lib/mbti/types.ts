export const MBTI_CODES = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP",
] as const;

export type MbtiCode = (typeof MBTI_CODES)[number];

export interface MbtiProfile {
  code: MbtiCode;
  name: string;
  shortLabel: string;
  communicationStyle: string;
  attentionBias: string;
  strengthInCommunication: string;
  commonMisreadByOthers: string;
  underStressExpression: string;
  preferredInput: string;
  preferredOutput: string;
  translationHints: {
    whenSending: string;
    whenReceiving: string;
  };
}

export const isMbtiCode = (v: string): v is MbtiCode =>
  MBTI_CODES.includes(v as MbtiCode);
