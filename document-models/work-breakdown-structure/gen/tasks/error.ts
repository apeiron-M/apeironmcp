export type ErrorCode =
  | "TaskNotFoundError"
  | "ParentTaskNotFoundError"
  | "CircularDependencyError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class TaskNotFoundError extends Error implements ReducerError {
  errorCode = "TaskNotFoundError" as ErrorCode;
  constructor(message = "TaskNotFoundError") {
    super(message);
  }
}

export class ParentTaskNotFoundError extends Error implements ReducerError {
  errorCode = "ParentTaskNotFoundError" as ErrorCode;
  constructor(message = "ParentTaskNotFoundError") {
    super(message);
  }
}

export class CircularDependencyError extends Error implements ReducerError {
  errorCode = "CircularDependencyError" as ErrorCode;
  constructor(message = "CircularDependencyError") {
    super(message);
  }
}

export const errors = {
  UpdateTask: {
    TaskNotFoundError,
  },
  MoveTask: {
    TaskNotFoundError,
    ParentTaskNotFoundError,
    CircularDependencyError,
  },
  DeleteTask: {
    TaskNotFoundError,
  },
};
