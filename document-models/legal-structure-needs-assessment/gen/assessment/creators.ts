import { createAction } from "document-model";
import {
  z,
  type CalculateSuitabilityInput,
  type GenerateRecommendationsInput,
  type CompleteAssessmentInput,
} from "../types.js";
import {
  type CalculateSuitabilityAction,
  type GenerateRecommendationsAction,
  type CompleteAssessmentAction,
} from "./actions.js";

export const calculateSuitability = (input: CalculateSuitabilityInput) =>
  createAction<CalculateSuitabilityAction>(
    "CALCULATE_SUITABILITY",
    { ...input },
    undefined,
    z.CalculateSuitabilityInputSchema,
    "global",
  );

export const generateRecommendations = (input: GenerateRecommendationsInput) =>
  createAction<GenerateRecommendationsAction>(
    "GENERATE_RECOMMENDATIONS",
    { ...input },
    undefined,
    z.GenerateRecommendationsInputSchema,
    "global",
  );

export const completeAssessment = (input: CompleteAssessmentInput) =>
  createAction<CompleteAssessmentAction>(
    "COMPLETE_ASSESSMENT",
    { ...input },
    undefined,
    z.CompleteAssessmentInputSchema,
    "global",
  );
