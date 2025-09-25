import type { WorkBreakdownStructureCoreOperations } from "../../gen/core/operations.js";

export const reducer: WorkBreakdownStructureCoreOperations = {
  createWbsOperation(state, action, dispatch) {
        const newWBS = {
          id: action.input.id,
          title: action.input.title,
          description: action.input.description || null,
          deliverables: [],
          tasks: [],
          teamMembers: [],
          createdAt: action.input.createdAt,
          updatedAt: null
        };

        Object.assign(state, newWBS);
    },

  updateWbsInfoOperation(state, action, dispatch) {
      if (action.input.title !== undefined) {
        state.title = action.input.title;
      }
      if (action.input.description !== undefined) {
        state.description = action.input.description;
      }
      state.updatedAt = action.input.updatedAt;
  },
};