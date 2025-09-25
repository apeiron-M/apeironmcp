import { type Action } from "document-model";
import type { CreateWbsInput, UpdateWbsInfoInput } from "../types.js";

export type CreateWbsAction = Action & {
  type: "CREATE_WBS";
  input: CreateWbsInput;
};
export type UpdateWbsInfoAction = Action & {
  type: "UPDATE_WBS_INFO";
  input: UpdateWbsInfoInput;
};

export type WorkBreakdownStructureCoreAction =
  | CreateWbsAction
  | UpdateWbsInfoAction;
