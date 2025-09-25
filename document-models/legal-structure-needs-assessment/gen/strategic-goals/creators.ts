import { createAction } from "document-model";
import {
  z,
  type SetDecentralizationCriteriaInput,
  type SetNonprofitPurposeInput,
  type SetNonprofitIndicatorsInput,
  type CalculateNonprofitScoreInput,
} from "../types.js";
import {
  type SetDecentralizationCriteriaAction,
  type SetNonprofitPurposeAction,
  type SetNonprofitIndicatorsAction,
  type CalculateNonprofitScoreAction,
} from "./actions.js";

export const setDecentralizationCriteria = (
  input: SetDecentralizationCriteriaInput,
) =>
  createAction<SetDecentralizationCriteriaAction>(
    "SET_DECENTRALIZATION_CRITERIA",
    { ...input },
    undefined,
    z.SetDecentralizationCriteriaInputSchema,
    "global",
  );

export const setNonprofitPurpose = (input: SetNonprofitPurposeInput) =>
  createAction<SetNonprofitPurposeAction>(
    "SET_NONPROFIT_PURPOSE",
    { ...input },
    undefined,
    z.SetNonprofitPurposeInputSchema,
    "global",
  );

export const setNonprofitIndicators = (input: SetNonprofitIndicatorsInput) =>
  createAction<SetNonprofitIndicatorsAction>(
    "SET_NONPROFIT_INDICATORS",
    { ...input },
    undefined,
    z.SetNonprofitIndicatorsInputSchema,
    "global",
  );

export const calculateNonprofitScore = (input: CalculateNonprofitScoreInput) =>
  createAction<CalculateNonprofitScoreAction>(
    "CALCULATE_NONPROFIT_SCORE",
    { ...input },
    undefined,
    z.CalculateNonprofitScoreInputSchema,
    "global",
  );
