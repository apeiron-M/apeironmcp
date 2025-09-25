import type { PHDocument, BaseStateFromDocument } from "document-model";
import type { WorkBreakdownStructureState } from "./schema/types.js";
import type { WorkBreakdownStructureAction } from "./actions.js";

export { z } from "./schema/index.js";
export type * from "./schema/types.js";
type WorkBreakdownStructureLocalState = Record<PropertyKey, never>;
export type ExtendedWorkBreakdownStructureState =
  BaseStateFromDocument<WorkBreakdownStructureDocument>;
export type WorkBreakdownStructureDocument = PHDocument<
  WorkBreakdownStructureState,
  WorkBreakdownStructureLocalState
>;
export type {
  WorkBreakdownStructureState,
  WorkBreakdownStructureLocalState,
  WorkBreakdownStructureAction,
};
