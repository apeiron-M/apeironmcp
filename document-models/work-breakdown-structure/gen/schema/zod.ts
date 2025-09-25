import { z } from "zod";
import type {
  AddTaskInputInput,
  AddTaskOutputInput,
  AddTeamMemberInput,
  AssignTasksToDeliverableInput,
  CreateDeliverableInput,
  CreateTaskInput,
  CreateWbsInput,
  DeleteDeliverableInput,
  DeleteTaskInput,
  Deliverable,
  DeliverableStatus,
  MoveTaskInput,
  RemoveTaskInputInput,
  RemoveTaskOutputInput,
  RemoveTeamMemberInput,
  TaskDataType,
  TaskInput,
  TaskOutput,
  TaskPriority,
  TaskStatus,
  TeamMember,
  UpdateDeliverableInput,
  UpdateTaskInput,
  UpdateTeamMemberInput,
  UpdateWbsInfoInput,
  WbsTask,
  WorkBreakdownStructureState,
} from "./types.js";

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny =>
  v !== undefined && v !== null;

export const definedNonNullAnySchema = z
  .any()
  .refine((v) => isDefinedNonNullAny(v));

export const DeliverableStatusSchema = z.enum([
  "CANCELLED",
  "COMPLETED",
  "IN_PROGRESS",
  "PLANNING",
  "REVIEW",
]);

export const TaskDataTypeSchema = z.enum([
  "APPROVAL",
  "CODE",
  "DATA",
  "DELIVERABLE",
  "DESIGN",
  "DOCUMENT",
  "FEEDBACK",
  "RESOURCE",
]);

export const TaskPrioritySchema = z.enum([
  "CRITICAL",
  "HIGH",
  "LOW",
  "MEDIUM",
  "STRETCH",
]);

export const TaskStatusSchema = z.enum([
  "BLOCKED",
  "CANCELLED",
  "DONE",
  "IN_PROGRESS",
  "REVIEW",
  "SCOPING",
  "TODO",
]);

export function AddTaskInputInputSchema(): z.ZodObject<
  Properties<AddTaskInputInput>
> {
  return z.object({
    createdAt: z.string().datetime(),
    description: z.string().nullish(),
    id: z.string(),
    isRequired: z.boolean().nullish(),
    linkedTaskOutputId: z.string().nullish(),
    taskId: z.string(),
    title: z.string(),
    type: TaskDataTypeSchema,
  });
}

export function AddTaskOutputInputSchema(): z.ZodObject<
  Properties<AddTaskOutputInput>
> {
  return z.object({
    createdAt: z.string().datetime(),
    deliveryFormat: z.string().nullish(),
    description: z.string().nullish(),
    id: z.string(),
    taskId: z.string(),
    title: z.string(),
    type: TaskDataTypeSchema,
  });
}

export function AddTeamMemberInputSchema(): z.ZodObject<
  Properties<AddTeamMemberInput>
> {
  return z.object({
    avatar: z.string().nullish(),
    email: z.string().nullish(),
    id: z.string(),
    joinedAt: z.string().datetime(),
    name: z.string(),
    role: z.string().nullish(),
  });
}

export function AssignTasksToDeliverableInputSchema(): z.ZodObject<
  Properties<AssignTasksToDeliverableInput>
> {
  return z.object({
    deliverableId: z.string(),
    taskIds: z.array(z.string()),
    updatedAt: z.string().datetime(),
  });
}

export function CreateDeliverableInputSchema(): z.ZodObject<
  Properties<CreateDeliverableInput>
> {
  return z.object({
    createdAt: z.string().datetime(),
    description: z.string().nullish(),
    id: z.string(),
    status: DeliverableStatusSchema,
    timeline: z.string().nullish(),
    title: z.string(),
  });
}

export function CreateTaskInputSchema(): z.ZodObject<
  Properties<CreateTaskInput>
> {
  return z.object({
    code: z.string(),
    createdAt: z.string().datetime(),
    deliverableId: z.string().nullish(),
    description: z.string().nullish(),
    dueDate: z.string().datetime().nullish(),
    estimatedHours: z.number().nullish(),
    id: z.string(),
    ownerId: z.string().nullish(),
    parentTaskId: z.string().nullish(),
    priority: TaskPrioritySchema,
    startDate: z.string().datetime().nullish(),
    status: TaskStatusSchema,
    summary: z.string().nullish(),
    title: z.string(),
  });
}

export function CreateWbsInputSchema(): z.ZodObject<
  Properties<CreateWbsInput>
> {
  return z.object({
    createdAt: z.string().datetime(),
    description: z.string().nullish(),
    id: z.string(),
    title: z.string(),
  });
}

export function DeleteDeliverableInputSchema(): z.ZodObject<
  Properties<DeleteDeliverableInput>
> {
  return z.object({
    deliverableId: z.string(),
    updatedAt: z.string().datetime(),
  });
}

export function DeleteTaskInputSchema(): z.ZodObject<
  Properties<DeleteTaskInput>
> {
  return z.object({
    taskId: z.string(),
    updatedAt: z.string().datetime(),
  });
}

export function DeliverableSchema(): z.ZodObject<Properties<Deliverable>> {
  return z.object({
    __typename: z.literal("Deliverable").optional(),
    createdAt: z.string().datetime(),
    description: z.string().nullable(),
    id: z.string(),
    status: DeliverableStatusSchema,
    timeline: z.string().nullable(),
    title: z.string(),
    updatedAt: z.string().datetime().nullable(),
  });
}

export function MoveTaskInputSchema(): z.ZodObject<Properties<MoveTaskInput>> {
  return z.object({
    newParentTaskId: z.string().nullish(),
    taskId: z.string(),
    updatedAt: z.string().datetime(),
  });
}

export function RemoveTaskInputInputSchema(): z.ZodObject<
  Properties<RemoveTaskInputInput>
> {
  return z.object({
    inputId: z.string(),
    taskId: z.string(),
    updatedAt: z.string().datetime(),
  });
}

export function RemoveTaskOutputInputSchema(): z.ZodObject<
  Properties<RemoveTaskOutputInput>
> {
  return z.object({
    outputId: z.string(),
    taskId: z.string(),
    updatedAt: z.string().datetime(),
  });
}

export function RemoveTeamMemberInputSchema(): z.ZodObject<
  Properties<RemoveTeamMemberInput>
> {
  return z.object({
    memberId: z.string(),
    updatedAt: z.string().datetime(),
  });
}

export function TaskInputSchema(): z.ZodObject<Properties<TaskInput>> {
  return z.object({
    __typename: z.literal("TaskInput").optional(),
    createdAt: z.string().datetime(),
    description: z.string().nullable(),
    id: z.string(),
    isRequired: z.boolean(),
    linkedTaskOutputId: z.string().nullable(),
    title: z.string(),
    type: TaskDataTypeSchema,
  });
}

export function TaskOutputSchema(): z.ZodObject<Properties<TaskOutput>> {
  return z.object({
    __typename: z.literal("TaskOutput").optional(),
    createdAt: z.string().datetime(),
    deliveryFormat: z.string().nullable(),
    description: z.string().nullable(),
    id: z.string(),
    title: z.string(),
    type: TaskDataTypeSchema,
  });
}

export function TeamMemberSchema(): z.ZodObject<Properties<TeamMember>> {
  return z.object({
    __typename: z.literal("TeamMember").optional(),
    avatar: z.string().nullable(),
    email: z.string().nullable(),
    id: z.string(),
    isActive: z.boolean(),
    joinedAt: z.string().datetime(),
    name: z.string(),
    role: z.string().nullable(),
  });
}

export function UpdateDeliverableInputSchema(): z.ZodObject<
  Properties<UpdateDeliverableInput>
> {
  return z.object({
    deliverableId: z.string(),
    description: z.string().nullish(),
    status: DeliverableStatusSchema.nullish(),
    timeline: z.string().nullish(),
    title: z.string().nullish(),
    updatedAt: z.string().datetime(),
  });
}

export function UpdateTaskInputSchema(): z.ZodObject<
  Properties<UpdateTaskInput>
> {
  return z.object({
    actualHours: z.number().nullish(),
    code: z.string().nullish(),
    deliverableId: z.string().nullish(),
    description: z.string().nullish(),
    dueDate: z.string().datetime().nullish(),
    estimatedHours: z.number().nullish(),
    ownerId: z.string().nullish(),
    priority: TaskPrioritySchema.nullish(),
    progress: z.number().nullish(),
    startDate: z.string().datetime().nullish(),
    status: TaskStatusSchema.nullish(),
    summary: z.string().nullish(),
    taskId: z.string(),
    title: z.string().nullish(),
    updatedAt: z.string().datetime(),
  });
}

export function UpdateTeamMemberInputSchema(): z.ZodObject<
  Properties<UpdateTeamMemberInput>
> {
  return z.object({
    avatar: z.string().nullish(),
    email: z.string().nullish(),
    isActive: z.boolean().nullish(),
    memberId: z.string(),
    name: z.string().nullish(),
    role: z.string().nullish(),
    updatedAt: z.string().datetime(),
  });
}

export function UpdateWbsInfoInputSchema(): z.ZodObject<
  Properties<UpdateWbsInfoInput>
> {
  return z.object({
    description: z.string().nullish(),
    title: z.string().nullish(),
    updatedAt: z.string().datetime(),
  });
}

export function WbsTaskSchema(): z.ZodObject<Properties<WbsTask>> {
  return z.object({
    __typename: z.literal("WbsTask").optional(),
    actualHours: z.number().nullable(),
    code: z.string(),
    createdAt: z.string().datetime(),
    deliverableId: z.string().nullable(),
    description: z.string().nullable(),
    dueDate: z.string().datetime().nullable(),
    estimatedHours: z.number().nullable(),
    id: z.string(),
    inputs: z.array(z.lazy(() => TaskInputSchema())),
    outputs: z.array(TaskOutputSchema()),
    ownerId: z.string().nullable(),
    parentTaskId: z.string().nullable(),
    priority: TaskPrioritySchema,
    progress: z.number().nullable(),
    startDate: z.string().datetime().nullable(),
    status: TaskStatusSchema,
    summary: z.string().nullable(),
    title: z.string(),
    updatedAt: z.string().datetime().nullable(),
  });
}

export function WorkBreakdownStructureStateSchema(): z.ZodObject<
  Properties<WorkBreakdownStructureState>
> {
  return z.object({
    __typename: z.literal("WorkBreakdownStructureState").optional(),
    createdAt: z.string().datetime(),
    deliverables: z.array(DeliverableSchema()),
    description: z.string().nullable(),
    id: z.string(),
    tasks: z.array(WbsTaskSchema()),
    teamMembers: z.array(TeamMemberSchema()),
    title: z.string().nullable(),
    updatedAt: z.string().datetime().nullable(),
  });
}
