import { BaseDocumentClass } from "document-model";
import {
  type AddOperationalActivityInput,
  type AddPaymentRequirementInput,
  type SetContributorJurisdictionsInput,
  type SetFinancialInfrastructureInput,
  type SetFinancialMetricsInput,
  type LegalStructureNeedsAssessmentState,
  type LegalStructureNeedsAssessmentLocalState,
} from "../types.js";
import {
  addOperationalActivity,
  addPaymentRequirement,
  setContributorJurisdictions,
  setFinancialInfrastructure,
  setFinancialMetrics,
} from "./creators.js";
import { type LegalStructureNeedsAssessmentAction } from "../actions.js";

export default class LegalStructureNeedsAssessment_OperationalNeeds extends BaseDocumentClass<
  LegalStructureNeedsAssessmentState,
  LegalStructureNeedsAssessmentLocalState,
  LegalStructureNeedsAssessmentAction
> {
  public addOperationalActivity(input: AddOperationalActivityInput) {
    return this.dispatch(addOperationalActivity(input));
  }

  public addPaymentRequirement(input: AddPaymentRequirementInput) {
    return this.dispatch(addPaymentRequirement(input));
  }

  public setContributorJurisdictions(input: SetContributorJurisdictionsInput) {
    return this.dispatch(setContributorJurisdictions(input));
  }

  public setFinancialInfrastructure(input: SetFinancialInfrastructureInput) {
    return this.dispatch(setFinancialInfrastructure(input));
  }

  public setFinancialMetrics(input: SetFinancialMetricsInput) {
    return this.dispatch(setFinancialMetrics(input));
  }
}
