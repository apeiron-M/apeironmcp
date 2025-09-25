import { createAction } from "document-model";
import {
  z,
  type AddTeamMemberInput,
  type UpdateTeamMemberInput,
  type RemoveTeamMemberInput,
} from "../types.js";
import {
  type AddTeamMemberAction,
  type UpdateTeamMemberAction,
  type RemoveTeamMemberAction,
} from "./actions.js";

export const addTeamMember = (input: AddTeamMemberInput) =>
  createAction<AddTeamMemberAction>(
    "ADD_TEAM_MEMBER",
    { ...input },
    undefined,
    z.AddTeamMemberInputSchema,
    "global",
  );

export const updateTeamMember = (input: UpdateTeamMemberInput) =>
  createAction<UpdateTeamMemberAction>(
    "UPDATE_TEAM_MEMBER",
    { ...input },
    undefined,
    z.UpdateTeamMemberInputSchema,
    "global",
  );

export const removeTeamMember = (input: RemoveTeamMemberInput) =>
  createAction<RemoveTeamMemberAction>(
    "REMOVE_TEAM_MEMBER",
    { ...input },
    undefined,
    z.RemoveTeamMemberInputSchema,
    "global",
  );
