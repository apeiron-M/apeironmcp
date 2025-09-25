import { createAction } from "document-model";
import { z, type SetGovernanceFrameworkInput } from "../types.js";
import { type SetGovernanceFrameworkAction } from "./actions.js";

export const setGovernanceFramework = (input: SetGovernanceFrameworkInput) =>
  createAction<SetGovernanceFrameworkAction>(
    "SET_GOVERNANCE_FRAMEWORK",
    { ...input },
    undefined,
    z.SetGovernanceFrameworkInputSchema,
    "global",
  );
