import type { DocumentModelState } from "document-model";

export const documentModel: DocumentModelState = {
  author: {
    name: "Powerhouse",
    website: "https://www.powerhouse.inc/",
  },
  description:
    "A simple todo list document for managing tasks with basic operations",
  extension: "stodo",
  id: "simple-todo",
  name: "Simple Todo",
  specifications: [
    {
      changeLog: [],
      modules: [
        {
          description: "Operations for managing todo items",
          id: "todos-module",
          name: "todos",
          operations: [
            {
              description: "Add a new todo item",
              errors: [],
              examples: [],
              id: "add-todo-op",
              name: "ADD_TODO",
              reducer:
                "const newTodo = {\n  id: action.input.id,\n  title: action.input.title,\n  description: action.input.description || null,\n  completed: false,\n  createdAt: action.input.createdAt,\n  completedAt: null\n};\n\nstate.todos.push(newTodo);\nstate.totalCount = state.todos.length;\nstate.completedCount = state.todos.filter(todo => todo.completed).length;",
              schema:
                "input AddTodoInput {\n  id: OID!\n  title: String!\n  description: String\n  createdAt: DateTime!\n}",
              scope: "global",
              template: "Add a new todo item",
            },
            {
              description: "Update todo title and/or description",
              errors: [
                {
                  code: "TODO_NOT_FOUND",
                  description: "Todo item with the specified ID was not found",
                  id: "todo-not-found-update",
                  name: "TodoNotFoundError",
                  template: "",
                },
              ],
              examples: [],
              id: "update-todo-op",
              name: "UPDATE_TODO",
              reducer:
                "const todoIndex = state.todos.findIndex(todo => todo.id === action.input.id);\n\nif (todoIndex === -1) {\n  throw new TodoNotFoundError(`Todo with ID ${action.input.id} not found`);\n}\n\nif (action.input.title) {\n  state.todos[todoIndex].title = action.input.title;\n}\n\nif (action.input.description !== undefined) {\n  state.todos[todoIndex].description = action.input.description || null;\n}",
              schema:
                "input UpdateTodoInput {\n  id: OID!\n  title: String\n  description: String\n}",
              scope: "global",
              template: "Update todo title and/or description",
            },
            {
              description: "Mark todo as completed",
              errors: [
                {
                  code: "TODO_NOT_FOUND",
                  description: "Todo item with the specified ID was not found",
                  id: "todo-not-found-complete",
                  name: "TodoNotFoundError",
                  template: "",
                },
                {
                  code: "TODO_ALREADY_COMPLETED",
                  description: "Todo item is already marked as completed",
                  id: "todo-already-completed",
                  name: "TodoAlreadyCompletedError",
                  template: "",
                },
              ],
              examples: [],
              id: "complete-todo-op",
              name: "COMPLETE_TODO",
              reducer:
                "const todoIndex = state.todos.findIndex(todo => todo.id === action.input.id);\n\nif (todoIndex === -1) {\n  throw new TodoNotFoundError(`Todo with ID ${action.input.id} not found`);\n}\n\nif (state.todos[todoIndex].completed) {\n  throw new TodoAlreadyCompletedError(`Todo with ID ${action.input.id} is already completed`);\n}\n\nstate.todos[todoIndex].completed = true;\nstate.todos[todoIndex].completedAt = action.input.completedAt;\nstate.completedCount = state.todos.filter(todo => todo.completed).length;",
              schema:
                "input CompleteTodoInput {\n  id: OID!\n  completedAt: DateTime!\n}",
              scope: "global",
              template: "Mark todo as completed",
            },
            {
              description: "Mark todo as not completed",
              errors: [
                {
                  code: "TODO_NOT_FOUND",
                  description: "Todo item with the specified ID was not found",
                  id: "todo-not-found-uncomplete",
                  name: "TodoNotFoundError",
                  template: "",
                },
              ],
              examples: [],
              id: "uncomplete-todo-op",
              name: "UNCOMPLETE_TODO",
              reducer:
                "const todoIndex = state.todos.findIndex(todo => todo.id === action.input.id);\n\nif (todoIndex === -1) {\n  throw new TodoNotFoundError(`Todo with ID ${action.input.id} not found`);\n}\n\nstate.todos[todoIndex].completed = false;\nstate.todos[todoIndex].completedAt = null;\nstate.completedCount = state.todos.filter(todo => todo.completed).length;",
              schema: "input UncompleteTodoInput {\n  id: OID!\n}",
              scope: "global",
              template: "Mark todo as not completed",
            },
            {
              description: "Remove todo item",
              errors: [
                {
                  code: "TODO_NOT_FOUND",
                  description: "Todo item with the specified ID was not found",
                  id: "todo-not-found-delete",
                  name: "TodoNotFoundError",
                  template: "",
                },
              ],
              examples: [],
              id: "delete-todo-op",
              name: "DELETE_TODO",
              reducer:
                "const todoIndex = state.todos.findIndex(todo => todo.id === action.input.id);\n\nif (todoIndex === -1) {\n  throw new TodoNotFoundError(`Todo with ID ${action.input.id} not found`);\n}\n\nstate.todos.splice(todoIndex, 1);\nstate.totalCount = state.todos.length;\nstate.completedCount = state.todos.filter(todo => todo.completed).length;",
              schema: "input DeleteTodoInput {\n  id: OID!\n}",
              scope: "global",
              template: "Remove todo item",
            },
          ],
        },
      ],
      state: {
        global: {
          examples: [],
          initialValue:
            '"{\\n  \\"todos\\": [],\\n  \\"totalCount\\": 0,\\n  \\"completedCount\\": 0\\n}"',
          schema:
            "type TodoItem {\n  id: OID!\n  title: String!\n  description: String\n  completed: Boolean!\n  createdAt: DateTime!\n  completedAt: DateTime\n}\n\ntype SimpleTodoState {\n  todos: [TodoItem!]!\n  totalCount: Int!\n  completedCount: Int!\n}",
        },
        local: {
          examples: [],
          initialValue: '"{}"',
          schema: "",
        },
      },
      version: 1,
    },
  ],
};
