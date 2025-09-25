import type { WorkBreakdownStructureCoreAction } from "./core/actions.js";
import type { WorkBreakdownStructureTasksAction } from "./tasks/actions.js";
import type { WorkBreakdownStructureTaskIoAction } from "./task-io/actions.js";
import type { WorkBreakdownStructureTeamAction } from "./team/actions.js";
import type { WorkBreakdownStructureDeliverablesAction } from "./deliverables/actions.js";

export * from "./core/actions.js";
export * from "./tasks/actions.js";
export * from "./task-io/actions.js";
export * from "./team/actions.js";
export * from "./deliverables/actions.js";

export type WorkBreakdownStructureAction =
  | WorkBreakdownStructureCoreAction
  | WorkBreakdownStructureTasksAction
  | WorkBreakdownStructureTaskIoAction
  | WorkBreakdownStructureTeamAction
  | WorkBreakdownStructureDeliverablesAction;
