import { createAction } from "document-model";
import {
  z,
  type SetOrganizationNameInput,
  type AddMultisigWalletInput,
  type AddExistingEntityInput,
  type AddContributorEntityInput,
  type AddContractEngagementInput,
  type AddFinancialToolInput,
  type SetComplianceInfoInput,
} from "../types.js";
import {
  type SetOrganizationNameAction,
  type AddMultisigWalletAction,
  type AddExistingEntityAction,
  type AddContributorEntityAction,
  type AddContractEngagementAction,
  type AddFinancialToolAction,
  type SetComplianceInfoAction,
} from "./actions.js";

export const setOrganizationName = (input: SetOrganizationNameInput) =>
  createAction<SetOrganizationNameAction>(
    "SET_ORGANIZATION_NAME",
    { ...input },
    undefined,
    z.SetOrganizationNameInputSchema,
    "global",
  );

export const addMultisigWallet = (input: AddMultisigWalletInput) =>
  createAction<AddMultisigWalletAction>(
    "ADD_MULTISIG_WALLET",
    { ...input },
    undefined,
    z.AddMultisigWalletInputSchema,
    "global",
  );

export const addExistingEntity = (input: AddExistingEntityInput) =>
  createAction<AddExistingEntityAction>(
    "ADD_EXISTING_ENTITY",
    { ...input },
    undefined,
    z.AddExistingEntityInputSchema,
    "global",
  );

export const addContributorEntity = (input: AddContributorEntityInput) =>
  createAction<AddContributorEntityAction>(
    "ADD_CONTRIBUTOR_ENTITY",
    { ...input },
    undefined,
    z.AddContributorEntityInputSchema,
    "global",
  );

export const addContractEngagement = (input: AddContractEngagementInput) =>
  createAction<AddContractEngagementAction>(
    "ADD_CONTRACT_ENGAGEMENT",
    { ...input },
    undefined,
    z.AddContractEngagementInputSchema,
    "global",
  );

export const addFinancialTool = (input: AddFinancialToolInput) =>
  createAction<AddFinancialToolAction>(
    "ADD_FINANCIAL_TOOL",
    { ...input },
    undefined,
    z.AddFinancialToolInputSchema,
    "global",
  );

export const setComplianceInfo = (input: SetComplianceInfoInput) =>
  createAction<SetComplianceInfoAction>(
    "SET_COMPLIANCE_INFO",
    { ...input },
    undefined,
    z.SetComplianceInfoInputSchema,
    "global",
  );
