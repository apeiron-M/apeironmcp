export type ErrorCode =
  | "TaskNotFoundError"
  | "InputNotFoundError"
  | "OutputNotFoundError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class TaskNotFoundError extends Error implements ReducerError {
  errorCode = "TaskNotFoundError" as ErrorCode;
  constructor(message = "TaskNotFoundError") {
    super(message);
  }
}

export class InputNotFoundError extends Error implements ReducerError {
  errorCode = "InputNotFoundError" as ErrorCode;
  constructor(message = "InputNotFoundError") {
    super(message);
  }
}

export class OutputNotFoundError extends Error implements ReducerError {
  errorCode = "OutputNotFoundError" as ErrorCode;
  constructor(message = "OutputNotFoundError") {
    super(message);
  }
}

export const errors = {
  AddTaskInput: {
    TaskNotFoundError,
  },
  AddTaskOutput: {
    TaskNotFoundError,
  },
  RemoveTaskInput: {
    TaskNotFoundError,
    InputNotFoundError,
  },
  RemoveTaskOutput: {
    TaskNotFoundError,
    OutputNotFoundError,
  },
};
