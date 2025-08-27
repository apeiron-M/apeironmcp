/**
 * Factory methods for creating SimpleTodoDocument instances
 */

import {
  createBaseState,
  defaultBaseState,
  type PHAuthState,
  type PHDocumentState,
  type PHBaseState,
} from "document-model";
import type {
  SimpleTodoDocument,
  SimpleTodoLocalState,
  SimpleTodoState,
} from "./gen/types.js";
import { createDocument } from "./gen/utils.js";

export function defaultGlobalState(): SimpleTodoState {
  return {
    todos: [],
    totalCount: 0,
    completedCount: 0,
  };
}

export function defaultLocalState(): SimpleTodoLocalState {
  return {};
}

export function defaultPHState(): SimpleTodoPHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<SimpleTodoState>,
): SimpleTodoState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  } as SimpleTodoState;
}

export function createLocalState(
  state?: Partial<SimpleTodoLocalState>,
): SimpleTodoLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as SimpleTodoLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<SimpleTodoState>,
  localState?: Partial<SimpleTodoLocalState>,
): SimpleTodoPHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

export type SimpleTodoPHState = PHBaseState & {
  global: SimpleTodoState;
  local: SimpleTodoLocalState;
};

/**
 * Creates a SimpleTodoDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createSimpleTodoDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<SimpleTodoState>;
    local?: Partial<SimpleTodoLocalState>;
  }>,
): SimpleTodoDocument {
  const document = createDocument(
    state
      ? createState(
          createBaseState(state.auth, state.document),
          state.global,
          state.local,
        )
      : undefined,
  );

  return document;
}
