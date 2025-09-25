import { type SignalDispatch } from "document-model";
import { type CreateWbsAction, type UpdateWbsInfoAction } from "./actions.js";
import { type WorkBreakdownStructureState } from "../types.js";

export interface WorkBreakdownStructureCoreOperations {
  createWbsOperation: (
    state: WorkBreakdownStructureState,
    action: CreateWbsAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateWbsInfoOperation: (
    state: WorkBreakdownStructureState,
    action: UpdateWbsInfoAction,
    dispatch?: SignalDispatch,
  ) => void;
}
