import { type SignalDispatch } from "document-model";
import {
  type AddTeamMemberAction,
  type UpdateTeamMemberAction,
  type RemoveTeamMemberAction,
} from "./actions.js";
import { type WorkBreakdownStructureState } from "../types.js";

export interface WorkBreakdownStructureTeamOperations {
  addTeamMemberOperation: (
    state: WorkBreakdownStructureState,
    action: AddTeamMemberAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateTeamMemberOperation: (
    state: WorkBreakdownStructureState,
    action: UpdateTeamMemberAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeTeamMemberOperation: (
    state: WorkBreakdownStructureState,
    action: RemoveTeamMemberAction,
    dispatch?: SignalDispatch,
  ) => void;
}
