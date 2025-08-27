import { useState, useCallback } from "react";
import type { ChangeEvent } from "react";

export interface TodoItemProps {
  todo: {
    id: string;
    title: string;
    description: string | null;
    completed: boolean;
    createdAt: string;
    completedAt: string | null;
  };
  onUpdate: (id: string, title?: string, description?: string) => void;
  onComplete: (id: string) => void;
  onUncomplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ 
  todo, 
  onUpdate, 
  onComplete, 
  onUncomplete, 
  onDelete 
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || "");

  const handleSave = useCallback(() => {
    onUpdate(todo.id, editTitle, editDescription);
    setIsEditing(false);
  }, [todo.id, editTitle, editDescription, onUpdate]);

  const handleCancel = useCallback(() => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
    setIsEditing(false);
  }, [todo.title, todo.description]);

  const handleToggleComplete = useCallback(() => {
    if (todo.completed) {
      onUncomplete(todo.id);
    } else {
      onComplete(todo.id);
    }
  }, [todo.id, todo.completed, onComplete, onUncomplete]);

  if (isEditing) {
    return (
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEditTitle(e.target.value)}
            placeholder="Todo title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={editDescription}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEditDescription(e.target.value)}
            placeholder="Description (optional)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            <button 
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-md transition-colors"
            >
              Save
            </button>
            <button 
              onClick={handleCancel}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 text-sm rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 bg-white border border-gray-200 rounded-lg shadow-sm transition-all ${
      todo.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggleComplete}
          className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 transition-colors ${
            todo.completed 
              ? 'bg-green-500 border-green-500' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          {todo.completed && (
            <svg className="w-3 h-3 text-white m-auto" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        
        <div className="flex-grow min-w-0">
          <h3 className={`font-medium ${
            todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
          }`}>
            {todo.title}
          </h3>
          {todo.description && (
            <p className={`text-sm mt-1 ${
              todo.completed ? 'line-through text-gray-400' : 'text-gray-600'
            }`}>
              {todo.description}
            </p>
          )}
          <div className="flex gap-4 text-xs text-gray-400 mt-2">
            <span>Created: {new Date(todo.createdAt).toLocaleDateString()}</span>
            {todo.completedAt && (
              <span>Completed: {new Date(todo.completedAt).toLocaleDateString()}</span>
            )}
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 text-sm rounded-md transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 text-sm rounded-md transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}