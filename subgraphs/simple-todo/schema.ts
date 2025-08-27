import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Subgraph definition for SimpleTodo (simple-todo)
  """
  type TodoItem {
    id: OID!
    title: String!
    description: String
    completed: Boolean!
    createdAt: DateTime!
    completedAt: DateTime
  }

  type SimpleTodoState {
    todos: [TodoItem!]!
    totalCount: Int!
    completedCount: Int!
  }

  """
  Queries: SimpleTodo
  """
  type SimpleTodoQueries {
    getDocument(docId: PHID!, driveId: PHID): SimpleTodo
    getDocuments(driveId: String!): [SimpleTodo!]
  }

  type Query {
    SimpleTodo: SimpleTodoQueries
  }

  """
  Mutations: SimpleTodo
  """
  type Mutation {
    SimpleTodo_createDocument(name: String!, driveId: String): String

    SimpleTodo_addTodo(
      driveId: String
      docId: PHID
      input: SimpleTodo_AddTodoInput
    ): Int
    SimpleTodo_updateTodo(
      driveId: String
      docId: PHID
      input: SimpleTodo_UpdateTodoInput
    ): Int
    SimpleTodo_completeTodo(
      driveId: String
      docId: PHID
      input: SimpleTodo_CompleteTodoInput
    ): Int
    SimpleTodo_uncompleteTodo(
      driveId: String
      docId: PHID
      input: SimpleTodo_UncompleteTodoInput
    ): Int
    SimpleTodo_deleteTodo(
      driveId: String
      docId: PHID
      input: SimpleTodo_DeleteTodoInput
    ): Int
  }

  """
  Module: Todos
  """
  input SimpleTodo_AddTodoInput {
    id: OID!
    title: String!
    description: String
    createdAt: DateTime!
  }
  input SimpleTodo_UpdateTodoInput {
    id: OID!
    title: String
    description: String
  }
  input SimpleTodo_CompleteTodoInput {
    id: OID!
    completedAt: DateTime!
  }
  input SimpleTodo_UncompleteTodoInput {
    id: OID!
  }
  input SimpleTodo_DeleteTodoInput {
    id: OID!
  }
`;
