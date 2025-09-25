import { createAction } from "document-model";
import {
  z,
  type AddCommercialActivityInput,
  type AddIpAssetInput,
  type SetIpManagementInput,
  type AddFundraisingActivityInput,
} from "../types.js";
import {
  type AddCommercialActivityAction,
  type AddIpAssetAction,
  type SetIpManagementAction,
  type AddFundraisingActivityAction,
} from "./actions.js";

export const addCommercialActivity = (input: AddCommercialActivityInput) =>
  createAction<AddCommercialActivityAction>(
    "ADD_COMMERCIAL_ACTIVITY",
    { ...input },
    undefined,
    z.AddCommercialActivityInputSchema,
    "global",
  );

export const addIpAsset = (input: AddIpAssetInput) =>
  createAction<AddIpAssetAction>(
    "ADD_IP_ASSET",
    { ...input },
    undefined,
    z.AddIpAssetInputSchema,
    "global",
  );

export const setIpManagement = (input: SetIpManagementInput) =>
  createAction<SetIpManagementAction>(
    "SET_IP_MANAGEMENT",
    { ...input },
    undefined,
    z.SetIpManagementInputSchema,
    "global",
  );

export const addFundraisingActivity = (input: AddFundraisingActivityInput) =>
  createAction<AddFundraisingActivityAction>(
    "ADD_FUNDRAISING_ACTIVITY",
    { ...input },
    undefined,
    z.AddFundraisingActivityInputSchema,
    "global",
  );
