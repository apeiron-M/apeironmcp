import type { WorkBreakdownStructureTaskIoOperations } from "../../gen/task-io/operations.js";
import { TaskNotFoundError, InputNotFoundError, OutputNotFoundError } from "../../gen/task-io/error.js";

export const reducer: WorkBreakdownStructureTaskIoOperations = {
    addTaskInputOperation(state, action, dispatch) {
        const taskIndex = state.tasks.findIndex(task => task.id === action.input.taskId);

        if (taskIndex === -1) {
          throw new TaskNotFoundError(`Task with ID ${action.input.taskId} not found`);
        }

        const newInput = {
          id: action.input.id,
          title: action.input.title,
          description: action.input.description || null,
          type: action.input.type,
          isRequired: action.input.isRequired || false,
          linkedTaskOutputId: action.input.linkedTaskOutputId || null,
          createdAt: action.input.createdAt
        };

        state.tasks[taskIndex].inputs.push(newInput);
        state.updatedAt = action.input.createdAt;
    },
    addTaskOutputOperation(state, action, dispatch) {
        const taskIndex = state.tasks.findIndex(task => task.id === action.input.taskId);

        if (taskIndex === -1) {
          throw new TaskNotFoundError(`Task with ID ${action.input.taskId} not found`);
        }

        const newOutput = {
          id: action.input.id,
          title: action.input.title,
          description: action.input.description || null,
          type: action.input.type,
          deliveryFormat: action.input.deliveryFormat || null,
          createdAt: action.input.createdAt
        };

        state.tasks[taskIndex].outputs.push(newOutput);
        state.updatedAt = action.input.createdAt;
    },
    removeTaskInputOperation(state, action, dispatch) {
        const taskIndex = state.tasks.findIndex(task => task.id === action.input.taskId);

        if (taskIndex === -1) {
          throw new TaskNotFoundError(`Task with ID ${action.input.taskId} not found`);
        }

        const task = state.tasks[taskIndex];
        const inputIndex = task.inputs.findIndex(input => input.id === action.input.inputId);

        if (inputIndex === -1) {
          throw new InputNotFoundError(`Input with ID ${action.input.inputId} not found`);
        }

        task.inputs.splice(inputIndex, 1);
        state.updatedAt = action.input.updatedAt;
    },
    removeTaskOutputOperation(state, action, dispatch) {
        const taskIndex = state.tasks.findIndex(task => task.id === action.input.taskId);

        if (taskIndex === -1) {
          throw new TaskNotFoundError(`Task with ID ${action.input.taskId} not found`);
        }

        const task = state.tasks[taskIndex];
        const outputIndex = task.outputs.findIndex(output => output.id === action.input.outputId);

        if (outputIndex === -1) {
          throw new OutputNotFoundError(`Output with ID ${action.input.outputId} not found`);
        }

        task.outputs.splice(outputIndex, 1);
        state.updatedAt = action.input.updatedAt;
    }
};
