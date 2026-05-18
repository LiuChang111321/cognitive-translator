import type { MbtiCode } from "./mbti/types";

export type CognitiveStyle = MbtiCode;

export type Scenario = "恋爱关系" | "朋友沟通" | "团队协作" | "工作反馈" | "自定义";

export interface TranslateInput {
  senderType: CognitiveStyle;
  receiverType: CognitiveStyle;
  scenario: Scenario;
  customScenario: string;
  originalText: string;
}

export interface TranslateResult {
  surfaceMeaning: string;
  senderDeepIntent: string;
  receiverPossibleMisread: string;
  translatedExpression: string;
  cognitiveGap: string;
  communicationRisk: string;
  suggestedReply: string;
  minimalSharedSemantics: string;
  practicalNextStep: string;
  confidenceNote: string;
}

export type TranslateStatus = "idle" | "loading" | "success" | "error";

export interface TranslateState {
  status: TranslateStatus;
  result: TranslateResult | null;
  error: string | null;
}

export interface ExamplePreset {
  id: string;
  label: string;
  senderType: CognitiveStyle;
  receiverType: CognitiveStyle;
  scenario: Scenario;
  customScenario: string;
  originalText: string;
}
