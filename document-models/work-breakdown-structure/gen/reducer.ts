// TODO: remove eslint-disable rules once refactor is done
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  type StateReducer,
  isDocumentAction,
  createReducer,
} from "document-model";
import { type WorkBreakdownStructureDocument, z } from "./types.js";

import { reducer as CoreReducer } from "../src/reducers/core.js";
import { reducer as TasksReducer } from "../src/reducers/tasks.js";
import { reducer as TaskIoReducer } from "../src/reducers/task-io.js";
import { reducer as TeamReducer } from "../src/reducers/team.js";
import { reducer as DeliverablesReducer } from "../src/reducers/deliverables.js";

const stateReducer: StateReducer<WorkBreakdownStructureDocument> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }

  switch (action.type) {
    case "CREATE_WBS":
      z.CreateWbsInputSchema().parse(action.input);
      CoreReducer.createWbsOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UPDATE_WBS_INFO":
      z.UpdateWbsInfoInputSchema().parse(action.input);
      CoreReducer.updateWbsInfoOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "CREATE_TASK":
      z.CreateTaskInputSchema().parse(action.input);
      TasksReducer.createTaskOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UPDATE_TASK":
      z.UpdateTaskInputSchema().parse(action.input);
      TasksReducer.updateTaskOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "MOVE_TASK":
      z.MoveTaskInputSchema().parse(action.input);
      TasksReducer.moveTaskOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "DELETE_TASK":
      z.DeleteTaskInputSchema().parse(action.input);
      TasksReducer.deleteTaskOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_TASK_INPUT":
      z.AddTaskInputInputSchema().parse(action.input);
      TaskIoReducer.addTaskInputOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_TASK_OUTPUT":
      z.AddTaskOutputInputSchema().parse(action.input);
      TaskIoReducer.addTaskOutputOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REMOVE_TASK_INPUT":
      z.RemoveTaskInputInputSchema().parse(action.input);
      TaskIoReducer.removeTaskInputOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REMOVE_TASK_OUTPUT":
      z.RemoveTaskOutputInputSchema().parse(action.input);
      TaskIoReducer.removeTaskOutputOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_TEAM_MEMBER":
      z.AddTeamMemberInputSchema().parse(action.input);
      TeamReducer.addTeamMemberOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UPDATE_TEAM_MEMBER":
      z.UpdateTeamMemberInputSchema().parse(action.input);
      TeamReducer.updateTeamMemberOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REMOVE_TEAM_MEMBER":
      z.RemoveTeamMemberInputSchema().parse(action.input);
      TeamReducer.removeTeamMemberOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "CREATE_DELIVERABLE":
      z.CreateDeliverableInputSchema().parse(action.input);
      DeliverablesReducer.createDeliverableOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UPDATE_DELIVERABLE":
      z.UpdateDeliverableInputSchema().parse(action.input);
      DeliverablesReducer.updateDeliverableOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "DELETE_DELIVERABLE":
      z.DeleteDeliverableInputSchema().parse(action.input);
      DeliverablesReducer.deleteDeliverableOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ASSIGN_TASKS_TO_DELIVERABLE":
      z.AssignTasksToDeliverableInputSchema().parse(action.input);
      DeliverablesReducer.assignTasksToDeliverableOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    default:
      return state;
  }
};

export const reducer =
  createReducer<WorkBreakdownStructureDocument>(stateReducer);
