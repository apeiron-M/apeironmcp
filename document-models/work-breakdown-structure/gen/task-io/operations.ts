import { type SignalDispatch } from "document-model";
import {
  type AddTaskInputAction,
  type AddTaskOutputAction,
  type RemoveTaskInputAction,
  type RemoveTaskOutputAction,
} from "./actions.js";
import { type WorkBreakdownStructureState } from "../types.js";

export interface WorkBreakdownStructureTaskIoOperations {
  addTaskInputOperation: (
    state: WorkBreakdownStructureState,
    action: AddTaskInputAction,
    dispatch?: SignalDispatch,
  ) => void;
  addTaskOutputOperation: (
    state: WorkBreakdownStructureState,
    action: AddTaskOutputAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeTaskInputOperation: (
    state: WorkBreakdownStructureState,
    action: RemoveTaskInputAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeTaskOutputOperation: (
    state: WorkBreakdownStructureState,
    action: RemoveTaskOutputAction,
    dispatch?: SignalDispatch,
  ) => void;
}
