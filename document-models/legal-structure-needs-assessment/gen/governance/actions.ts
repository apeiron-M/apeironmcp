import { type Action } from "document-model";
import type { SetGovernanceFrameworkInput } from "../types.js";

export type SetGovernanceFrameworkAction = Action & {
  type: "SET_GOVERNANCE_FRAMEWORK";
  input: SetGovernanceFrameworkInput;
};

export type LegalStructureNeedsAssessmentGovernanceAction =
  SetGovernanceFrameworkAction;
