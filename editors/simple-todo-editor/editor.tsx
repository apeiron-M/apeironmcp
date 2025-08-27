import { useDocumentById } from "@powerhousedao/reactor-browser";
import { useCallback } from "react";
import type { EditorProps } from "document-model";
import {
  type SimpleTodoDocument,
  actions,
} from "../../document-models/simple-todo/index.js";
// Using native HTML elements for better compatibility
import { TodoItem } from "./todo-item.js";
import { AddTodoForm } from "./add-todo-form.js";

export type IProps = EditorProps;

export default function Editor(props: IProps) {
  const { document: initialDocument } = props;
  const [document, dispatch] = useDocumentById(initialDocument.header.id);
  const typedDocument = document as SimpleTodoDocument;
  
  const globalState = typedDocument.state.global as {
    todos: Array<{
      id: string;
      title: string;
      description: string | null;
      completed: boolean;
      createdAt: string;
      completedAt: string | null;
    }>;
    totalCount: number;
    completedCount: number;
  };

  const handleAddTodo = useCallback((title: string, description?: string) => {
    dispatch(actions.addTodo({
      id: crypto.randomUUID(),
      title,
      description: description || undefined,
      createdAt: new Date().toISOString()
    }));
  }, [dispatch]);

  const handleUpdateTodo = useCallback((id: string, title?: string, description?: string) => {
    dispatch(actions.updateTodo({
      id,
      title,
      description
    }));
  }, [dispatch]);

  const handleCompleteTodo = useCallback((id: string) => {
    dispatch(actions.completeTodo({
      id,
      completedAt: new Date().toISOString()
    }));
  }, [dispatch]);

  const handleUncompleteTodo = useCallback((id: string) => {
    dispatch(actions.uncompleteTodo({ id }));
  }, [dispatch]);

  const handleDeleteTodo = useCallback((id: string) => {
    dispatch(actions.deleteTodo({ id }));
  }, [dispatch]);

  const pendingTodos = globalState.todos.filter(todo => !todo.completed);
  const completedTodos = globalState.todos.filter(todo => todo.completed);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Simple Todo</h1>
        <div className="flex gap-4 text-sm text-gray-600">
          <span>Total: {globalState.totalCount}</span>
          <span>Completed: {globalState.completedCount}</span>
          <span>Pending: {globalState.totalCount - globalState.completedCount}</span>
        </div>
      </div>

      <AddTodoForm onAdd={handleAddTodo} />

      <div className="space-y-6 mt-8">
        {pendingTodos.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Pending ({pendingTodos.length})
            </h2>
            <div className="space-y-2">
              {pendingTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onUpdate={handleUpdateTodo}
                  onComplete={handleCompleteTodo}
                  onUncomplete={handleUncompleteTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </div>
          </div>
        )}

        {completedTodos.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Completed ({completedTodos.length})
            </h2>
            <div className="space-y-2">
              {completedTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onUpdate={handleUpdateTodo}
                  onComplete={handleCompleteTodo}
                  onUncomplete={handleUncompleteTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </div>
          </div>
        )}

        {globalState.totalCount === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No todos yet. Add one above to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}
