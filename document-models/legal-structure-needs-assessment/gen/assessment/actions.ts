import { type Action } from "document-model";
import type {
  CalculateSuitabilityInput,
  GenerateRecommendationsInput,
  CompleteAssessmentInput,
} from "../types.js";

export type CalculateSuitabilityAction = Action & {
  type: "CALCULATE_SUITABILITY";
  input: CalculateSuitabilityInput;
};
export type GenerateRecommendationsAction = Action & {
  type: "GENERATE_RECOMMENDATIONS";
  input: GenerateRecommendationsInput;
};
export type CompleteAssessmentAction = Action & {
  type: "COMPLETE_ASSESSMENT";
  input: CompleteAssessmentInput;
};

export type LegalStructureNeedsAssessmentAssessmentAction =
  | CalculateSuitabilityAction
  | GenerateRecommendationsAction
  | CompleteAssessmentAction;
