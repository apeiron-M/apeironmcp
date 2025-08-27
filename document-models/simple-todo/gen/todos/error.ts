export type ErrorCode = "TodoNotFoundError" | "TodoAlreadyCompletedError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class TodoNotFoundError extends Error implements ReducerError {
  errorCode = "TodoNotFoundError" as ErrorCode;
  constructor(message = "TodoNotFoundError") {
    super(message);
  }
}

export class TodoAlreadyCompletedError extends Error implements ReducerError {
  errorCode = "TodoAlreadyCompletedError" as ErrorCode;
  constructor(message = "TodoAlreadyCompletedError") {
    super(message);
  }
}

export const errors = {
  UpdateTodo: {
    TodoNotFoundError,
  },
  CompleteTodo: {
    TodoNotFoundError,
    TodoAlreadyCompletedError,
  },
  UncompleteTodo: {
    TodoNotFoundError,
  },
  DeleteTodo: {
    TodoNotFoundError,
  },
};
