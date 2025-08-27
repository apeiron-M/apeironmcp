import type { PHDocument, BaseStateFromDocument } from "document-model";
import type { SimpleTodoState } from "./schema/types.js";
import type { SimpleTodoAction } from "./actions.js";

export { z } from "./schema/index.js";
export type * from "./schema/types.js";
type SimpleTodoLocalState = Record<PropertyKey, never>;
export type ExtendedSimpleTodoState = BaseStateFromDocument<SimpleTodoDocument>;
export type SimpleTodoDocument = PHDocument<
  SimpleTodoState,
  SimpleTodoLocalState
>;
export type { SimpleTodoState, SimpleTodoLocalState, SimpleTodoAction };
