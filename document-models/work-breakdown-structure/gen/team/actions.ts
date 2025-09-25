import { type Action } from "document-model";
import type {
  AddTeamMemberInput,
  UpdateTeamMemberInput,
  RemoveTeamMemberInput,
} from "../types.js";

export type AddTeamMemberAction = Action & {
  type: "ADD_TEAM_MEMBER";
  input: AddTeamMemberInput;
};
export type UpdateTeamMemberAction = Action & {
  type: "UPDATE_TEAM_MEMBER";
  input: UpdateTeamMemberInput;
};
export type RemoveTeamMemberAction = Action & {
  type: "REMOVE_TEAM_MEMBER";
  input: RemoveTeamMemberInput;
};

export type WorkBreakdownStructureTeamAction =
  | AddTeamMemberAction
  | UpdateTeamMemberAction
  | RemoveTeamMemberAction;
