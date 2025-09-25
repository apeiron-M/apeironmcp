import { type SignalDispatch } from "document-model";
import {
  type SetDecentralizationCriteriaAction,
  type SetNonprofitPurposeAction,
  type SetNonprofitIndicatorsAction,
  type CalculateNonprofitScoreAction,
} from "./actions.js";
import { type LegalStructureNeedsAssessmentState } from "../types.js";

export interface LegalStructureNeedsAssessmentStrategicGoalsOperations {
  setDecentralizationCriteriaOperation: (
    state: LegalStructureNeedsAssessmentState,
    action: SetDecentralizationCriteriaAction,
    dispatch?: SignalDispatch,
  ) => void;
  setNonprofitPurposeOperation: (
    state: LegalStructureNeedsAssessmentState,
    action: SetNonprofitPurposeAction,
    dispatch?: SignalDispatch,
  ) => void;
  setNonprofitIndicatorsOperation: (
    state: LegalStructureNeedsAssessmentState,
    action: SetNonprofitIndicatorsAction,
    dispatch?: SignalDispatch,
  ) => void;
  calculateNonprofitScoreOperation: (
    state: LegalStructureNeedsAssessmentState,
    action: CalculateNonprofitScoreAction,
    dispatch?: SignalDispatch,
  ) => void;
}
