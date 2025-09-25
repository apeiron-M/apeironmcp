import { BaseDocumentClass } from "document-model";
import {
  type AddCommercialActivityInput,
  type AddIpAssetInput,
  type SetIpManagementInput,
  type AddFundraisingActivityInput,
  type LegalStructureNeedsAssessmentState,
  type LegalStructureNeedsAssessmentLocalState,
} from "../types.js";
import {
  addCommercialActivity,
  addIpAsset,
  setIpManagement,
  addFundraisingActivity,
} from "./creators.js";
import { type LegalStructureNeedsAssessmentAction } from "../actions.js";

export default class LegalStructureNeedsAssessment_CommercialIp extends BaseDocumentClass<
  LegalStructureNeedsAssessmentState,
  LegalStructureNeedsAssessmentLocalState,
  LegalStructureNeedsAssessmentAction
> {
  public addCommercialActivity(input: AddCommercialActivityInput) {
    return this.dispatch(addCommercialActivity(input));
  }

  public addIpAsset(input: AddIpAssetInput) {
    return this.dispatch(addIpAsset(input));
  }

  public setIpManagement(input: SetIpManagementInput) {
    return this.dispatch(setIpManagement(input));
  }

  public addFundraisingActivity(input: AddFundraisingActivityInput) {
    return this.dispatch(addFundraisingActivity(input));
  }
}
