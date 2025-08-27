import { useState, useCallback } from "react";
import type { ChangeEvent, FormEvent } from "react";

export interface AddTodoFormProps {
  onAdd: (title: string, description?: string) => void;
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    onAdd(title.trim(), description.trim() || undefined);
    setTitle("");
    setDescription("");
    setIsExpanded(false);
  }, [title, description, onAdd]);

  const handleTitleFocus = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const handleCancel = useCallback(() => {
    setTitle("");
    setDescription("");
    setIsExpanded(false);
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          onFocus={handleTitleFocus}
          placeholder="Add a new todo..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        {isExpanded && (
          <>
            <input
              type="text"
              value={description}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={!title.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2 text-sm rounded-md transition-colors"
              >
                Add Todo
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 text-sm rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}