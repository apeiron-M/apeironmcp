import { z } from "zod";
import type {
  AddTodoInput,
  CompleteTodoInput,
  DeleteTodoInput,
  SimpleTodoState,
  TodoItem,
  UncompleteTodoInput,
  UpdateTodoInput,
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

export function AddTodoInputSchema(): z.ZodObject<Properties<AddTodoInput>> {
  return z.object({
    createdAt: z.string().datetime(),
    description: z.string().nullish(),
    id: z.string(),
    title: z.string(),
  });
}

export function CompleteTodoInputSchema(): z.ZodObject<
  Properties<CompleteTodoInput>
> {
  return z.object({
    completedAt: z.string().datetime(),
    id: z.string(),
  });
}

export function DeleteTodoInputSchema(): z.ZodObject<
  Properties<DeleteTodoInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function SimpleTodoStateSchema(): z.ZodObject<
  Properties<SimpleTodoState>
> {
  return z.object({
    __typename: z.literal("SimpleTodoState").optional(),
    completedCount: z.number(),
    todos: z.array(TodoItemSchema()),
    totalCount: z.number(),
  });
}

export function TodoItemSchema(): z.ZodObject<Properties<TodoItem>> {
  return z.object({
    __typename: z.literal("TodoItem").optional(),
    completed: z.boolean(),
    completedAt: z.string().datetime().nullable(),
    createdAt: z.string().datetime(),
    description: z.string().nullable(),
    id: z.string(),
    title: z.string(),
  });
}

export function UncompleteTodoInputSchema(): z.ZodObject<
  Properties<UncompleteTodoInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function UpdateTodoInputSchema(): z.ZodObject<
  Properties<UpdateTodoInput>
> {
  return z.object({
    description: z.string().nullish(),
    id: z.string(),
    title: z.string().nullish(),
  });
}
