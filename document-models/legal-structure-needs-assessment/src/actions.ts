// Custom actions for legal structure assessment
import { createAction, type Action } from "document-model";
import { z } from "zod";

// Delete input types
export interface DeleteMultisigWalletInput {
  id: string;
}

export interface DeleteEntityInput {
  id: string;
}

export interface DeleteOperationalActivityInput {
  id: string;
}

export interface DeletePaymentRequirementInput {
  id: string;
}

export interface DeleteCommercialActivityInput {
  id: string;
}

export interface DeleteIpAssetInput {
  id: string;
}

export interface DeleteFundraisingActivityInput {
  id: string;
}

// Delete action types
export interface DeleteMultisigWalletAction extends Action {
  type: "DELETE_MULTISIG_WALLET";
  input: DeleteMultisigWalletInput;
}

export interface DeleteExistingEntityAction extends Action {
  type: "DELETE_EXISTING_ENTITY";
  input: DeleteEntityInput;
}

export interface DeleteContributorEntityAction extends Action {
  type: "DELETE_CONTRIBUTOR_ENTITY";
  input: DeleteEntityInput;
}

export interface DeleteOperationalActivityAction extends Action {
  type: "DELETE_OPERATIONAL_ACTIVITY";
  input: DeleteOperationalActivityInput;
}

export interface DeletePaymentRequirementAction extends Action {
  type: "DELETE_PAYMENT_REQUIREMENT";
  input: DeletePaymentRequirementInput;
}

export interface DeleteCommercialActivityAction extends Action {
  type: "DELETE_COMMERCIAL_ACTIVITY";
  input: DeleteCommercialActivityInput;
}

export interface DeleteIpAssetAction extends Action {
  type: "DELETE_IP_ASSET";
  input: DeleteIpAssetInput;
}

export interface DeleteFundraisingActivityAction extends Action {
  type: "DELETE_FUNDRAISING_ACTIVITY";
  input: DeleteFundraisingActivityInput;
}

// Zod schemas for validation
const DeleteMultisigWalletInputSchema = () => z.object({
  id: z.string(),
});

const DeleteEntityInputSchema = () => z.object({
  id: z.string(),
});

const DeleteOperationalActivityInputSchema = () => z.object({
  id: z.string(),
});

const DeletePaymentRequirementInputSchema = () => z.object({
  id: z.string(),
});

const DeleteCommercialActivityInputSchema = () => z.object({
  id: z.string(),
});

const DeleteIpAssetInputSchema = () => z.object({
  id: z.string(),
});

const DeleteFundraisingActivityInputSchema = () => z.object({
  id: z.string(),
});

// Action creators using createAction
export const deleteMultisigWallet = (input: DeleteMultisigWalletInput) =>
  createAction<DeleteMultisigWalletAction>(
    "DELETE_MULTISIG_WALLET",
    { ...input },
    undefined,
    DeleteMultisigWalletInputSchema,
    "global",
  );

export const deleteExistingEntity = (input: DeleteEntityInput) =>
  createAction<DeleteExistingEntityAction>(
    "DELETE_EXISTING_ENTITY",
    { ...input },
    undefined,
    DeleteEntityInputSchema,
    "global",
  );

export const deleteContributorEntity = (input: DeleteEntityInput) =>
  createAction<DeleteContributorEntityAction>(
    "DELETE_CONTRIBUTOR_ENTITY",
    { ...input },
    undefined,
    DeleteEntityInputSchema,
    "global",
  );

export const deleteOperationalActivity = (input: DeleteOperationalActivityInput) =>
  createAction<DeleteOperationalActivityAction>(
    "DELETE_OPERATIONAL_ACTIVITY",
    { ...input },
    undefined,
    DeleteOperationalActivityInputSchema,
    "global",
  );

export const deletePaymentRequirement = (input: DeletePaymentRequirementInput) =>
  createAction<DeletePaymentRequirementAction>(
    "DELETE_PAYMENT_REQUIREMENT",
    { ...input },
    undefined,
    DeletePaymentRequirementInputSchema,
    "global",
  );

export const deleteCommercialActivity = (input: DeleteCommercialActivityInput) =>
  createAction<DeleteCommercialActivityAction>(
    "DELETE_COMMERCIAL_ACTIVITY",
    { ...input },
    undefined,
    DeleteCommercialActivityInputSchema,
    "global",
  );

export const deleteIpAsset = (input: DeleteIpAssetInput) =>
  createAction<DeleteIpAssetAction>(
    "DELETE_IP_ASSET",
    { ...input },
    undefined,
    DeleteIpAssetInputSchema,
    "global",
  );

export const deleteFundraisingActivity = (input: DeleteFundraisingActivityInput) =>
  createAction<DeleteFundraisingActivityAction>(
    "DELETE_FUNDRAISING_ACTIVITY",
    { ...input },
    undefined,
    DeleteFundraisingActivityInputSchema,
    "global",
  );

export const customActions = {
  deleteMultisigWallet,
  deleteExistingEntity,
  deleteContributorEntity,
  deleteOperationalActivity,
  deletePaymentRequirement,
  deleteCommercialActivity,
  deleteIpAsset,
  deleteFundraisingActivity,
};