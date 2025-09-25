export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Amount: {
    input: { unit?: string; value?: number };
    output: { unit?: string; value?: number };
  };
  Amount_Crypto: {
    input: { unit: string; value: string };
    output: { unit: string; value: string };
  };
  Amount_Currency: {
    input: { unit: string; value: string };
    output: { unit: string; value: string };
  };
  Amount_Fiat: {
    input: { unit: string; value: number };
    output: { unit: string; value: number };
  };
  Amount_Money: { input: number; output: number };
  Amount_Percentage: { input: number; output: number };
  Amount_Tokens: { input: number; output: number };
  Currency: { input: string; output: string };
  Date: { input: string; output: string };
  DateTime: { input: string; output: string };
  EmailAddress: { input: string; output: string };
  EthereumAddress: { input: string; output: string };
  OID: { input: string; output: string };
  OLabel: { input: string; output: string };
  PHID: { input: string; output: string };
  URL: { input: string; output: string };
  Upload: { input: File; output: File };
};

export type AddTaskInputInput = {
  createdAt: Scalars["DateTime"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  isRequired?: InputMaybe<Scalars["Boolean"]["input"]>;
  linkedTaskOutputId?: InputMaybe<Scalars["OID"]["input"]>;
  taskId: Scalars["OID"]["input"];
  title: Scalars["String"]["input"];
  type: TaskDataType | `${TaskDataType}`;
};

export type AddTaskOutputInput = {
  createdAt: Scalars["DateTime"]["input"];
  deliveryFormat?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  taskId: Scalars["OID"]["input"];
  title: Scalars["String"]["input"];
  type: TaskDataType | `${TaskDataType}`;
};

export type AddTeamMemberInput = {
  avatar?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  joinedAt: Scalars["DateTime"]["input"];
  name: Scalars["String"]["input"];
  role?: InputMaybe<Scalars["String"]["input"]>;
};

export type AssignTasksToDeliverableInput = {
  deliverableId: Scalars["OID"]["input"];
  taskIds: Array<Scalars["OID"]["input"]>;
  updatedAt: Scalars["DateTime"]["input"];
};

export type CreateDeliverableInput = {
  createdAt: Scalars["DateTime"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  status: DeliverableStatus | `${DeliverableStatus}`;
  timeline?: InputMaybe<Scalars["String"]["input"]>;
  title: Scalars["String"]["input"];
};

export type CreateTaskInput = {
  code: Scalars["String"]["input"];
  createdAt: Scalars["DateTime"]["input"];
  deliverableId?: InputMaybe<Scalars["OID"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  dueDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  estimatedHours?: InputMaybe<Scalars["Int"]["input"]>;
  id: Scalars["OID"]["input"];
  ownerId?: InputMaybe<Scalars["OID"]["input"]>;
  parentTaskId?: InputMaybe<Scalars["OID"]["input"]>;
  priority: TaskPriority | `${TaskPriority}`;
  startDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  status: TaskStatus | `${TaskStatus}`;
  summary?: InputMaybe<Scalars["String"]["input"]>;
  title: Scalars["String"]["input"];
};

export type CreateWbsInput = {
  createdAt: Scalars["DateTime"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  title: Scalars["String"]["input"];
};

export type DeleteDeliverableInput = {
  deliverableId: Scalars["OID"]["input"];
  updatedAt: Scalars["DateTime"]["input"];
};

export type DeleteTaskInput = {
  taskId: Scalars["OID"]["input"];
  updatedAt: Scalars["DateTime"]["input"];
};

export type Deliverable = {
  createdAt: Scalars["DateTime"]["output"];
  description: Maybe<Scalars["String"]["output"]>;
  id: Scalars["OID"]["output"];
  status: DeliverableStatus | `${DeliverableStatus}`;
  timeline: Maybe<Scalars["String"]["output"]>;
  title: Scalars["String"]["output"];
  updatedAt: Maybe<Scalars["DateTime"]["output"]>;
};

export type DeliverableStatus =
  | "CANCELLED"
  | "COMPLETED"
  | "IN_PROGRESS"
  | "PLANNING"
  | "REVIEW";

export type MoveTaskInput = {
  newParentTaskId?: InputMaybe<Scalars["OID"]["input"]>;
  taskId: Scalars["OID"]["input"];
  updatedAt: Scalars["DateTime"]["input"];
};

export type RemoveTaskInputInput = {
  inputId: Scalars["OID"]["input"];
  taskId: Scalars["OID"]["input"];
  updatedAt: Scalars["DateTime"]["input"];
};

export type RemoveTaskOutputInput = {
  outputId: Scalars["OID"]["input"];
  taskId: Scalars["OID"]["input"];
  updatedAt: Scalars["DateTime"]["input"];
};

export type RemoveTeamMemberInput = {
  memberId: Scalars["OID"]["input"];
  updatedAt: Scalars["DateTime"]["input"];
};

export type TaskDataType =
  | "APPROVAL"
  | "CODE"
  | "DATA"
  | "DELIVERABLE"
  | "DESIGN"
  | "DOCUMENT"
  | "FEEDBACK"
  | "RESOURCE";

export type TaskInput = {
  createdAt: Scalars["DateTime"]["output"];
  description: Maybe<Scalars["String"]["output"]>;
  id: Scalars["OID"]["output"];
  isRequired: Scalars["Boolean"]["output"];
  linkedTaskOutputId: Maybe<Scalars["OID"]["output"]>;
  title: Scalars["String"]["output"];
  type: TaskDataType | `${TaskDataType}`;
};

export type TaskOutput = {
  createdAt: Scalars["DateTime"]["output"];
  deliveryFormat: Maybe<Scalars["String"]["output"]>;
  description: Maybe<Scalars["String"]["output"]>;
  id: Scalars["OID"]["output"];
  title: Scalars["String"]["output"];
  type: TaskDataType | `${TaskDataType}`;
};

export type TaskPriority = "CRITICAL" | "HIGH" | "LOW" | "MEDIUM" | "STRETCH";

export type TaskStatus =
  | "BLOCKED"
  | "CANCELLED"
  | "DONE"
  | "IN_PROGRESS"
  | "REVIEW"
  | "SCOPING"
  | "TODO";

export type TeamMember = {
  avatar: Maybe<Scalars["String"]["output"]>;
  email: Maybe<Scalars["String"]["output"]>;
  id: Scalars["OID"]["output"];
  isActive: Scalars["Boolean"]["output"];
  joinedAt: Scalars["DateTime"]["output"];
  name: Scalars["String"]["output"];
  role: Maybe<Scalars["String"]["output"]>;
};

export type UpdateDeliverableInput = {
  deliverableId: Scalars["OID"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<DeliverableStatus | `${DeliverableStatus}`>;
  timeline?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  updatedAt: Scalars["DateTime"]["input"];
};

export type UpdateTaskInput = {
  actualHours?: InputMaybe<Scalars["Int"]["input"]>;
  code?: InputMaybe<Scalars["String"]["input"]>;
  deliverableId?: InputMaybe<Scalars["OID"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  dueDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  estimatedHours?: InputMaybe<Scalars["Int"]["input"]>;
  ownerId?: InputMaybe<Scalars["OID"]["input"]>;
  priority?: InputMaybe<TaskPriority | `${TaskPriority}`>;
  progress?: InputMaybe<Scalars["Int"]["input"]>;
  startDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  status?: InputMaybe<TaskStatus | `${TaskStatus}`>;
  summary?: InputMaybe<Scalars["String"]["input"]>;
  taskId: Scalars["OID"]["input"];
  title?: InputMaybe<Scalars["String"]["input"]>;
  updatedAt: Scalars["DateTime"]["input"];
};

export type UpdateTeamMemberInput = {
  avatar?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
  memberId: Scalars["OID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  role?: InputMaybe<Scalars["String"]["input"]>;
  updatedAt: Scalars["DateTime"]["input"];
};

export type UpdateWbsInfoInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  updatedAt: Scalars["DateTime"]["input"];
};

export type WbsTask = {
  actualHours: Maybe<Scalars["Int"]["output"]>;
  code: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  deliverableId: Maybe<Scalars["OID"]["output"]>;
  description: Maybe<Scalars["String"]["output"]>;
  dueDate: Maybe<Scalars["DateTime"]["output"]>;
  estimatedHours: Maybe<Scalars["Int"]["output"]>;
  id: Scalars["OID"]["output"];
  inputs: Array<TaskInput>;
  outputs: Array<TaskOutput>;
  ownerId: Maybe<Scalars["OID"]["output"]>;
  parentTaskId: Maybe<Scalars["OID"]["output"]>;
  priority: TaskPriority | `${TaskPriority}`;
  progress: Maybe<Scalars["Int"]["output"]>;
  startDate: Maybe<Scalars["DateTime"]["output"]>;
  status: TaskStatus | `${TaskStatus}`;
  summary: Maybe<Scalars["String"]["output"]>;
  title: Scalars["String"]["output"];
  updatedAt: Maybe<Scalars["DateTime"]["output"]>;
};

export type WorkBreakdownStructureState = {
  createdAt: Scalars["DateTime"]["output"];
  deliverables: Array<Deliverable>;
  description: Maybe<Scalars["String"]["output"]>;
  id: Scalars["OID"]["output"];
  tasks: Array<WbsTask>;
  teamMembers: Array<TeamMember>;
  title: Maybe<Scalars["String"]["output"]>;
  updatedAt: Maybe<Scalars["DateTime"]["output"]>;
};
