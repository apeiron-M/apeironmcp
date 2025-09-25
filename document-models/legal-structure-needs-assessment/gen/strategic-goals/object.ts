import { BaseDocumentClass } from "document-model";
import {
  type SetDecentralizationCriteriaInput,
  type SetNonprofitPurposeInput,
  type SetNonprofitIndicatorsInput,
  type CalculateNonprofitScoreInput,
  type LegalStructureNeedsAssessmentState,
  type LegalStructureNeedsAssessmentLocalState,
} from "../types.js";
import {
  setDecentralizationCriteria,
  setNonprofitPurpose,
  setNonprofitIndicators,
  calculateNonprofitScore,
} from "./creators.js";
import { type LegalStructureNeedsAssessmentAction } from "../actions.js";

export default class LegalStructureNeedsAssessment_StrategicGoals extends BaseDocumentClass<
  LegalStructureNeedsAssessmentState,
  LegalStructureNeedsAssessmentLocalState,
  LegalStructureNeedsAssessmentAction
> {
  public setDecentralizationCriteria(input: SetDecentralizationCriteriaInput) {
    return this.dispatch(setDecentralizationCriteria(input));
  }

  public setNonprofitPurpose(input: SetNonprofitPurposeInput) {
    return this.dispatch(setNonprofitPurpose(input));
  }

  public setNonprofitIndicators(input: SetNonprofitIndicatorsInput) {
    return this.dispatch(setNonprofitIndicators(input));
  }

  public calculateNonprofitScore(input: CalculateNonprofitScoreInput) {
    return this.dispatch(calculateNonprofitScore(input));
  }
}
