import { type SignalDispatch } from "document-model";
import {
  type CalculateSuitabilityAction,
  type GenerateRecommendationsAction,
  type CompleteAssessmentAction,
} from "./actions.js";
import { type LegalStructureNeedsAssessmentState } from "../types.js";

export interface LegalStructureNeedsAssessmentAssessmentOperations {
  calculateSuitabilityOperation: (
    state: LegalStructureNeedsAssessmentState,
    action: CalculateSuitabilityAction,
    dispatch?: SignalDispatch,
  ) => void;
  generateRecommendationsOperation: (
    state: LegalStructureNeedsAssessmentState,
    action: GenerateRecommendationsAction,
    dispatch?: SignalDispatch,
  ) => void;
  completeAssessmentOperation: (
    state: LegalStructureNeedsAssessmentState,
    action: CompleteAssessmentAction,
    dispatch?: SignalDispatch,
  ) => void;
}
