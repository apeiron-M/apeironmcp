import type { SimpleTodoTodosOperations } from "../../gen/todos/operations.js";
import { TodoNotFoundError, TodoAlreadyCompletedError } from "../../gen/todos/error.js";

export const reducer: SimpleTodoTodosOperations = {
    addTodoOperation(state, action, dispatch) {
        const newTodo = {
          id: action.input.id,
          title: action.input.title,
          description: action.input.description || null,
          completed: false,
          createdAt: action.input.createdAt,
          completedAt: null
        };

        state.todos.push(newTodo);
        state.totalCount = state.todos.length;
        state.completedCount = state.todos.filter(todo => todo.completed).length;
    },
    updateTodoOperation(state, action, dispatch) {
        const todoIndex = state.todos.findIndex(todo => todo.id === action.input.id);

        if (todoIndex === -1) {
          throw new TodoNotFoundError(`Todo with ID ${action.input.id} not found`);
        }

        if (action.input.title) {
          state.todos[todoIndex].title = action.input.title;
        }

        if (action.input.description !== undefined) {
          state.todos[todoIndex].description = action.input.description || null;
        }
    },
    completeTodoOperation(state, action, dispatch) {
        const todoIndex = state.todos.findIndex(todo => todo.id === action.input.id);

        if (todoIndex === -1) {
          throw new TodoNotFoundError(`Todo with ID ${action.input.id} not found`);
        }

        if (state.todos[todoIndex].completed) {
          throw new TodoAlreadyCompletedError(`Todo with ID ${action.input.id} is already completed`);
        }

        state.todos[todoIndex].completed = true;
        state.todos[todoIndex].completedAt = action.input.completedAt;
        state.completedCount = state.todos.filter(todo => todo.completed).length;
    },
    uncompleteTodoOperation(state, action, dispatch) {
        const todoIndex = state.todos.findIndex(todo => todo.id === action.input.id);

        if (todoIndex === -1) {
          throw new TodoNotFoundError(`Todo with ID ${action.input.id} not found`);
        }

        state.todos[todoIndex].completed = false;
        state.todos[todoIndex].completedAt = null;
        state.completedCount = state.todos.filter(todo => todo.completed).length;
    },
    deleteTodoOperation(state, action, dispatch) {
        const todoIndex = state.todos.findIndex(todo => todo.id === action.input.id);

        if (todoIndex === -1) {
          throw new TodoNotFoundError(`Todo with ID ${action.input.id} not found`);
        }

        state.todos.splice(todoIndex, 1);
        state.totalCount = state.todos.length;
        state.completedCount = state.todos.filter(todo => todo.completed).length;
    }
};
