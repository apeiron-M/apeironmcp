/**
 * Factory methods for creating WorkBreakdownStructureDocument instances
 */

import {
  createBaseState,
  defaultBaseState,
  type PHAuthState,
  type PHDocumentState,
  type PHBaseState,
} from "document-model";
import type {
  WorkBreakdownStructureDocument,
  WorkBreakdownStructureLocalState,
  WorkBreakdownStructureState,
} from "./gen/types.js";
import { createDocument } from "./gen/utils.js";

export function defaultGlobalState(): WorkBreakdownStructureState {
  return {
    id: "",
    title: "",
    description: "",
    deliverables: [],
    tasks: [],
    teamMembers: [],
    createdAt: "",
    updatedAt: null,
  };
}

export function defaultLocalState(): WorkBreakdownStructureLocalState {
  return {};
}

export function defaultPHState(): WorkBreakdownStructurePHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<WorkBreakdownStructureState>,
): WorkBreakdownStructureState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  } as WorkBreakdownStructureState;
}

export function createLocalState(
  state?: Partial<WorkBreakdownStructureLocalState>,
): WorkBreakdownStructureLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as WorkBreakdownStructureLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<WorkBreakdownStructureState>,
  localState?: Partial<WorkBreakdownStructureLocalState>,
): WorkBreakdownStructurePHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

export type WorkBreakdownStructurePHState = PHBaseState & {
  global: WorkBreakdownStructureState;
  local: WorkBreakdownStructureLocalState;
};

/**
 * Creates a WorkBreakdownStructureDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createWorkBreakdownStructureDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<WorkBreakdownStructureState>;
    local?: Partial<WorkBreakdownStructureLocalState>;
  }>,
): WorkBreakdownStructureDocument {
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
