import { type SignalDispatch } from "document-model";
import { type SetGovernanceFrameworkAction } from "./actions.js";
import { type LegalStructureNeedsAssessmentState } from "../types.js";

export interface LegalStructureNeedsAssessmentGovernanceOperations {
  setGovernanceFrameworkOperation: (
    state: LegalStructureNeedsAssessmentState,
    action: SetGovernanceFrameworkAction,
    dispatch?: SignalDispatch,
  ) => void;
}
