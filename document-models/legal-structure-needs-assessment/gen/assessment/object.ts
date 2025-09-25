import { BaseDocumentClass } from "document-model";
import {
  type CalculateSuitabilityInput,
  type GenerateRecommendationsInput,
  type CompleteAssessmentInput,
  type LegalStructureNeedsAssessmentState,
  type LegalStructureNeedsAssessmentLocalState,
} from "../types.js";
import {
  calculateSuitability,
  generateRecommendations,
  completeAssessment,
} from "./creators.js";
import { type LegalStructureNeedsAssessmentAction } from "../actions.js";

export default class LegalStructureNeedsAssessment_Assessment extends BaseDocumentClass<
  LegalStructureNeedsAssessmentState,
  LegalStructureNeedsAssessmentLocalState,
  LegalStructureNeedsAssessmentAction
> {
  public calculateSuitability(input: CalculateSuitabilityInput) {
    return this.dispatch(calculateSuitability(input));
  }

  public generateRecommendations(input: GenerateRecommendationsInput) {
    return this.dispatch(generateRecommendations(input));
  }

  public completeAssessment(input: CompleteAssessmentInput) {
    return this.dispatch(completeAssessment(input));
  }
}
