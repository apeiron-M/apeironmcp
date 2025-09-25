export type ErrorCode = "DeliverableNotFoundError" | "TaskNotFoundError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class DeliverableNotFoundError extends Error implements ReducerError {
  errorCode = "DeliverableNotFoundError" as ErrorCode;
  constructor(message = "DeliverableNotFoundError") {
    super(message);
  }
}

export class TaskNotFoundError extends Error implements ReducerError {
  errorCode = "TaskNotFoundError" as ErrorCode;
  constructor(message = "TaskNotFoundError") {
    super(message);
  }
}

export const errors = {
  UpdateDeliverable: {
    DeliverableNotFoundError,
  },
  DeleteDeliverable: {
    DeliverableNotFoundError,
  },
  AssignTasksToDeliverable: {
    DeliverableNotFoundError,
    TaskNotFoundError,
  },
};
