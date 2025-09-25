import { type SignalDispatch } from "document-model";
import {
  type SetOrganizationNameAction,
  type AddMultisigWalletAction,
  type AddExistingEntityAction,
  type AddContributorEntityAction,
  type AddContractEngagementAction,
  type AddFinancialToolAction,
  type SetComplianceInfoAction,
} from "./actions.js";
import { type LegalStructureNeedsAssessmentState } from "../types.js";

export interface LegalStructureNeedsAssessmentOrganizationOperations {
  setOrganizationNameOperation: (
    state: LegalStructureNeedsAssessmentState,
    action: SetOrganizationNameAction,
    dispatch?: SignalDispatch,
  ) => void;
  addMultisigWalletOperation: (
    state: LegalStructureNeedsAssessmentState,
    action: AddMultisigWalletAction,
    dispatch?: SignalDispatch,
  ) => void;
  addExistingEntityOperation: (
    state: LegalStructureNeedsAssessmentState,
    action: AddExistingEntityAction,
    dispatch?: SignalDispatch,
  ) => void;
  addContributorEntityOperation: (
    state: LegalStructureNeedsAssessmentState,
    action: AddContributorEntityAction,
    dispatch?: SignalDispatch,
  ) => void;
  addContractEngagementOperation: (
    state: LegalStructureNeedsAssessmentState,
    action: AddContractEngagementAction,
    dispatch?: SignalDispatch,
  ) => void;
  addFinancialToolOperation: (
    state: LegalStructureNeedsAssessmentState,
    action: AddFinancialToolAction,
    dispatch?: SignalDispatch,
  ) => void;
  setComplianceInfoOperation: (
    state: LegalStructureNeedsAssessmentState,
    action: SetComplianceInfoAction,
    dispatch?: SignalDispatch,
  ) => void;
}
