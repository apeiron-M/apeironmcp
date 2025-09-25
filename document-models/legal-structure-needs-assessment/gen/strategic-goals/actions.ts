import { type Action } from "document-model";
import type {
  SetDecentralizationCriteriaInput,
  SetNonprofitPurposeInput,
  SetNonprofitIndicatorsInput,
  CalculateNonprofitScoreInput,
} from "../types.js";

export type SetDecentralizationCriteriaAction = Action & {
  type: "SET_DECENTRALIZATION_CRITERIA";
  input: SetDecentralizationCriteriaInput;
};
export type SetNonprofitPurposeAction = Action & {
  type: "SET_NONPROFIT_PURPOSE";
  input: SetNonprofitPurposeInput;
};
export type SetNonprofitIndicatorsAction = Action & {
  type: "SET_NONPROFIT_INDICATORS";
  input: SetNonprofitIndicatorsInput;
};
export type CalculateNonprofitScoreAction = Action & {
  type: "CALCULATE_NONPROFIT_SCORE";
  input: CalculateNonprofitScoreInput;
};

export type LegalStructureNeedsAssessmentStrategicGoalsAction =
  | SetDecentralizationCriteriaAction
  | SetNonprofitPurposeAction
  | SetNonprofitIndicatorsAction
  | CalculateNonprofitScoreAction;
