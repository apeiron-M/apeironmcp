import { BaseDocumentClass } from "document-model";
import {
  type SetGovernanceFrameworkInput,
  type LegalStructureNeedsAssessmentState,
  type LegalStructureNeedsAssessmentLocalState,
} from "../types.js";
import { setGovernanceFramework } from "./creators.js";
import { type LegalStructureNeedsAssessmentAction } from "../actions.js";

export default class LegalStructureNeedsAssessment_Governance extends BaseDocumentClass<
  LegalStructureNeedsAssessmentState,
  LegalStructureNeedsAssessmentLocalState,
  LegalStructureNeedsAssessmentAction
> {
  public setGovernanceFramework(input: SetGovernanceFrameworkInput) {
    return this.dispatch(setGovernanceFramework(input));
  }
}
