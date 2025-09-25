import { type SignalDispatch } from "document-model";
import {
  type CreateDeliverableAction,
  type UpdateDeliverableAction,
  type DeleteDeliverableAction,
  type AssignTasksToDeliverableAction,
} from "./actions.js";
import { type WorkBreakdownStructureState } from "../types.js";

export interface WorkBreakdownStructureDeliverablesOperations {
  createDeliverableOperation: (
    state: WorkBreakdownStructureState,
    action: CreateDeliverableAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateDeliverableOperation: (
    state: WorkBreakdownStructureState,
    action: UpdateDeliverableAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteDeliverableOperation: (
    state: WorkBreakdownStructureState,
    action: DeleteDeliverableAction,
    dispatch?: SignalDispatch,
  ) => void;
  assignTasksToDeliverableOperation: (
    state: WorkBreakdownStructureState,
    action: AssignTasksToDeliverableAction,
    dispatch?: SignalDispatch,
  ) => void;
}
