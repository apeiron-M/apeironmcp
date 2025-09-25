import type { WorkBreakdownStructureTasksOperations } from "../../gen/tasks/operations.js";
import { TaskNotFoundError, ParentTaskNotFoundError, CircularDependencyError } from "../../gen/tasks/error.js";

export const reducer: WorkBreakdownStructureTasksOperations = {
  createTaskOperation(state, action, dispatch) {
        const newTask = {
          id: action.input.id,
          deliverableId: action.input.deliverableId || null,
          parentTaskId: action.input.parentTaskId || null,
          ownerId: action.input.ownerId || null,
          code: action.input.code,
          title: action.input.title,
          summary: action.input.summary || null,
          description: action.input.description || null,
          status: action.input.status,
          priority: action.input.priority,
          progress: 0,
          estimatedHours: action.input.estimatedHours || null,
          actualHours: null,
          startDate: action.input.startDate || null,
          dueDate: action.input.dueDate || null,
          inputs: [],
          outputs: [],
          createdAt: action.input.createdAt,
          updatedAt: null
        };

        state.tasks.push(newTask);
        state.updatedAt = action.input.createdAt;
    },

  updateTaskOperation(state, action, dispatch) {
      const taskIndex = state.tasks.findIndex(task => task.id === action.input.taskId);

      if (taskIndex === -1) {
        throw new TaskNotFoundError(`Task with ID ${action.input.taskId} not found`);
      }

      const task = state.tasks[taskIndex];

      if (action.input.deliverableId !== undefined) task.deliverableId = action.input.deliverableId;
      if (action.input.ownerId !== undefined) task.ownerId = action.input.ownerId;
      if (action.input.code !== undefined) task.code = action.input.code || "";
      if (action.input.title !== undefined) task.title = action.input.title || "";
      if (action.input.summary !== undefined) task.summary = action.input.summary;
      if (action.input.description !== undefined) task.description = action.input.description;
      if (action.input.status !== undefined && action.input.status !== null) task.status = action.input.status;
      if (action.input.priority !== undefined && action.input.priority !== null) task.priority = action.input.priority;
      if (action.input.progress !== undefined) task.progress = action.input.progress;
      if (action.input.estimatedHours !== undefined) task.estimatedHours = action.input.estimatedHours;
      if (action.input.actualHours !== undefined) task.actualHours = action.input.actualHours;
      if (action.input.startDate !== undefined) task.startDate = action.input.startDate;
      if (action.input.dueDate !== undefined) task.dueDate = action.input.dueDate;

      task.updatedAt = action.input.updatedAt;
      state.updatedAt = action.input.updatedAt;
  },

  moveTaskOperation(state, action, dispatch) {
      const taskIndex = state.tasks.findIndex(task => task.id === action.input.taskId);

      if (taskIndex === -1) {
        throw new TaskNotFoundError(`Task with ID ${action.input.taskId} not found`);
      }

      // Check if new parent exists (if specified)
      if (action.input.newParentTaskId) {
        const parentExists = state.tasks.some(task => task.id === action.input.newParentTaskId);
        if (!parentExists) {
          throw new ParentTaskNotFoundError(`Parent task with ID ${action.input.newParentTaskId} not found`);
        }
        
        // Check for circular dependency (task cannot be ancestor of new parent)
        const isCircular = (parentId, targetId) => {
          if (parentId === targetId) return true;
          const parent = state.tasks.find(t => t.id === parentId);
          return parent && parent.parentTaskId && isCircular(parent.parentTaskId, targetId);
        };
        
        if (isCircular(action.input.newParentTaskId, action.input.taskId)) {
          throw new CircularDependencyError('Cannot create circular dependency in task hierarchy');
        }
      }

      state.tasks[taskIndex].parentTaskId = action.input.newParentTaskId || null;
      state.tasks[taskIndex].updatedAt = action.input.updatedAt;
      state.updatedAt = action.input.updatedAt;
  },

  deleteTaskOperation(state, action, dispatch) {
      const taskIndex = state.tasks.findIndex(task => task.id === action.input.taskId);

      if (taskIndex === -1) {
        throw new TaskNotFoundError(`Task with ID ${action.input.taskId} not found`);
      }

      // Recursively collect all descendant task IDs
      const getDescendantIds = (parentId) => {
        const children = state.tasks.filter(task => task.parentTaskId === parentId);
        let descendants = children.map(child => child.id);
        children.forEach(child => {
          descendants = descendants.concat(getDescendantIds(child.id));
        });
        return descendants;
      };

      const taskId = action.input.taskId;
      const descendantIds = getDescendantIds(taskId);
      const allIdsToDelete = [taskId, ...descendantIds];

      // Remove all tasks (parent and descendants)
      state.tasks = state.tasks.filter(task => !allIdsToDelete.includes(task.id));
      state.updatedAt = action.input.updatedAt;
  },
};