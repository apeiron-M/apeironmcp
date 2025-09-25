import { type Action } from "document-model";
import type {
  AddCommercialActivityInput,
  AddIpAssetInput,
  SetIpManagementInput,
  AddFundraisingActivityInput,
} from "../types.js";

export type AddCommercialActivityAction = Action & {
  type: "ADD_COMMERCIAL_ACTIVITY";
  input: AddCommercialActivityInput;
};
export type AddIpAssetAction = Action & {
  type: "ADD_IP_ASSET";
  input: AddIpAssetInput;
};
export type SetIpManagementAction = Action & {
  type: "SET_IP_MANAGEMENT";
  input: SetIpManagementInput;
};
export type AddFundraisingActivityAction = Action & {
  type: "ADD_FUNDRAISING_ACTIVITY";
  input: AddFundraisingActivityInput;
};

export type LegalStructureNeedsAssessmentCommercialIpAction =
  | AddCommercialActivityAction
  | AddIpAssetAction
  | SetIpManagementAction
  | AddFundraisingActivityAction;
