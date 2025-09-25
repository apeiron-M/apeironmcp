import { BaseDocumentClass } from "document-model";
import {
  type SetOrganizationNameInput,
  type AddMultisigWalletInput,
  type AddExistingEntityInput,
  type AddContributorEntityInput,
  type AddContractEngagementInput,
  type AddFinancialToolInput,
  type SetComplianceInfoInput,
  type LegalStructureNeedsAssessmentState,
  type LegalStructureNeedsAssessmentLocalState,
} from "../types.js";
import {
  setOrganizationName,
  addMultisigWallet,
  addExistingEntity,
  addContributorEntity,
  addContractEngagement,
  addFinancialTool,
  setComplianceInfo,
} from "./creators.js";
import { type LegalStructureNeedsAssessmentAction } from "../actions.js";

export default class LegalStructureNeedsAssessment_Organization extends BaseDocumentClass<
  LegalStructureNeedsAssessmentState,
  LegalStructureNeedsAssessmentLocalState,
  LegalStructureNeedsAssessmentAction
> {
  public setOrganizationName(input: SetOrganizationNameInput) {
    return this.dispatch(setOrganizationName(input));
  }

  public addMultisigWallet(input: AddMultisigWalletInput) {
    return this.dispatch(addMultisigWallet(input));
  }

  public addExistingEntity(input: AddExistingEntityInput) {
    return this.dispatch(addExistingEntity(input));
  }

  public addContributorEntity(input: AddContributorEntityInput) {
    return this.dispatch(addContributorEntity(input));
  }

  public addContractEngagement(input: AddContractEngagementInput) {
    return this.dispatch(addContractEngagement(input));
  }

  public addFinancialTool(input: AddFinancialToolInput) {
    return this.dispatch(addFinancialTool(input));
  }

  public setComplianceInfo(input: SetComplianceInfoInput) {
    return this.dispatch(setComplianceInfo(input));
  }
}
