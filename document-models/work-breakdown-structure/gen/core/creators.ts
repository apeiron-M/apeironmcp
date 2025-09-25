import { createAction } from "document-model";
import { z, type CreateWbsInput, type UpdateWbsInfoInput } from "../types.js";
import { type CreateWbsAction, type UpdateWbsInfoAction } from "./actions.js";

export const createWbs = (input: CreateWbsInput) =>
  createAction<CreateWbsAction>(
    "CREATE_WBS",
    { ...input },
    undefined,
    z.CreateWbsInputSchema,
    "global",
  );

export const updateWbsInfo = (input: UpdateWbsInfoInput) =>
  createAction<UpdateWbsInfoAction>(
    "UPDATE_WBS_INFO",
    { ...input },
    undefined,
    z.UpdateWbsInfoInputSchema,
    "global",
  );
