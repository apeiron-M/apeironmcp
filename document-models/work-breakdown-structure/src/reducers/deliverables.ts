import type { WorkBreakdownStructureDeliverablesOperations } from "../../gen/deliverables/operations.js";
import { DeliverableNotFoundError, TaskNotFoundError } from "../../gen/deliverables/error.js";

export const reducer: WorkBreakdownStructureDeliverablesOperations = {
  createDeliverableOperation(state, action, dispatch) {
        const newDeliverable = {
          id: action.input.id,
          title: action.input.title,
          description: action.input.description || null,
          timeline: action.input.timeline || null,
          status: action.input.status,
          createdAt: action.input.createdAt,
          updatedAt: null
        };

        state.deliverables.push(newDeliverable);
        state.updatedAt = action.input.createdAt;
    },

  updateDeliverableOperation(state, action, dispatch) {
      const deliverableIndex = state.deliverables.findIndex(deliverable => deliverable.id === action.input.deliverableId);

      if (deliverableIndex === -1) {
        throw new DeliverableNotFoundError(`Deliverable with ID ${action.input.deliverableId} not found`);
      }

      const deliverable = state.deliverables[deliverableIndex];

      if (action.input.title !== undefined) deliverable.title = action.input.title;
      if (action.input.description !== undefined) deliverable.description = action.input.description;
      if (action.input.timeline !== undefined) deliverable.timeline = action.input.timeline;
      if (action.input.status !== undefined && action.input.status !== null) deliverable.status = action.input.status;

      deliverable.updatedAt = action.input.updatedAt;
      state.updatedAt = action.input.updatedAt;
  },

  deleteDeliverableOperation(state, action, dispatch) {
      const deliverableIndex = state.deliverables.findIndex(deliverable => deliverable.id === action.input.deliverableId);

      if (deliverableIndex === -1) {
        throw new DeliverableNotFoundError(`Deliverable with ID ${action.input.deliverableId} not found`);
      }

      // Unassign all tasks from this deliverable
      state.tasks.forEach(task => {
        if (task.deliverableId === action.input.deliverableId) {
          task.deliverableId = null;
        }
      });

      // Remove the deliverable
      state.deliverables.splice(deliverableIndex, 1);
      state.updatedAt = action.input.updatedAt;
  },

  assignTasksToDeliverableOperation(state, action, dispatch) {
      const deliverableExists = state.deliverables.some(deliverable => deliverable.id === action.input.deliverableId);

      if (!deliverableExists) {
        throw new DeliverableNotFoundError(`Deliverable with ID ${action.input.deliverableId} not found`);
      }

      // Verify all tasks exist
      for (const taskId of action.input.taskIds) {
        const taskExists = state.tasks.some(task => task.id === taskId);
        if (!taskExists) {
          throw new TaskNotFoundError(`Task with ID ${taskId} not found`);
        }
      }

      // Assign tasks to deliverable
      state.tasks.forEach(task => {
        if (action.input.taskIds.includes(task.id)) {
          task.deliverableId = action.input.deliverableId;
          task.updatedAt = action.input.updatedAt;
        }
      });

      state.updatedAt = action.input.updatedAt;
  }
};