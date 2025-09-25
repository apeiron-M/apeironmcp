import { type SignalDispatch } from "document-model";
import {
  type CreateTaskAction,
  type UpdateTaskAction,
  type MoveTaskAction,
  type DeleteTaskAction,
} from "./actions.js";
import { type WorkBreakdownStructureState } from "../types.js";

export interface WorkBreakdownStructureTasksOperations {
  createTaskOperation: (
    state: WorkBreakdownStructureState,
    action: CreateTaskAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateTaskOperation: (
    state: WorkBreakdownStructureState,
    action: UpdateTaskAction,
    dispatch?: SignalDispatch,
  ) => void;
  moveTaskOperation: (
    state: WorkBreakdownStructureState,
    action: MoveTaskAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteTaskOperation: (
    state: WorkBreakdownStructureState,
    action: DeleteTaskAction,
    dispatch?: SignalDispatch,
  ) => void;
}
