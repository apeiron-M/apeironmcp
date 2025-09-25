import { type Action } from "document-model";
import type {
  SetOrganizationNameInput,
  AddMultisigWalletInput,
  AddExistingEntityInput,
  AddContributorEntityInput,
  AddContractEngagementInput,
  AddFinancialToolInput,
  SetComplianceInfoInput,
} from "../types.js";

export type SetOrganizationNameAction = Action & {
  type: "SET_ORGANIZATION_NAME";
  input: SetOrganizationNameInput;
};
export type AddMultisigWalletAction = Action & {
  type: "ADD_MULTISIG_WALLET";
  input: AddMultisigWalletInput;
};
export type AddExistingEntityAction = Action & {
  type: "ADD_EXISTING_ENTITY";
  input: AddExistingEntityInput;
};
export type AddContributorEntityAction = Action & {
  type: "ADD_CONTRIBUTOR_ENTITY";
  input: AddContributorEntityInput;
};
export type AddContractEngagementAction = Action & {
  type: "ADD_CONTRACT_ENGAGEMENT";
  input: AddContractEngagementInput;
};
export type AddFinancialToolAction = Action & {
  type: "ADD_FINANCIAL_TOOL";
  input: AddFinancialToolInput;
};
export type SetComplianceInfoAction = Action & {
  type: "SET_COMPLIANCE_INFO";
  input: SetComplianceInfoInput;
};

export type LegalStructureNeedsAssessmentOrganizationAction =
  | SetOrganizationNameAction
  | AddMultisigWalletAction
  | AddExistingEntityAction
  | AddContributorEntityAction
  | AddContractEngagementAction
  | AddFinancialToolAction
  | SetComplianceInfoAction;
