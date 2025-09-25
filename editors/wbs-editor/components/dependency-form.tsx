import type React from "react";
import { useState } from "react";
import { Select, TextInput } from "@powerhousedao/document-engineering";
import { Button } from "@powerhousedao/design-system";
import { Icon } from "@powerhousedao/design-system";
import { type WorkBreakdownStructureState } from "../../../document-models/work-breakdown-structure/gen/schema/types.js";
// TODO: Dependency actions not yet available in generated creators
// import { createDependency } from "../../../document-models/work-breakdown-structure/gen/creators.js";

interface DependencyFormProps {
  state: WorkBreakdownStructureState;
  dispatch: (action: any) => void;
  onClose: () => void;
}

export function DependencyForm({ state, dispatch, onClose }: DependencyFormProps) {
  const [formData, setFormData] = useState({
    fromTaskId: "",
    toTaskId: "",
    dependencyType: "FINISH_TO_START",
    lag: "0"
  });

  const generateId = () => crypto.randomUUID();

  const taskOptions = (state.tasks || []).map(task => ({
    label: `${task.code} - ${task.title}`,
    value: task.id
  }));

  const dependencyTypeOptions = [
    { label: "Finish to Start (FS)", value: "FINISH_TO_START" },
    { label: "Start to Start (SS)", value: "START_TO_START" },
    { label: "Finish to Finish (FF)", value: "FINISH_TO_FINISH" },
    { label: "Start to Finish (SF)", value: "START_TO_FINISH" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fromTaskId || !formData.toTaskId) {
      return;
    }

    if (formData.fromTaskId === formData.toTaskId) {
      alert("A task cannot depend on itself");
      return;
    }

    // TODO: Create dependency action not yet available
    // dispatch(createDependency({
    //   id: generateId(),
    //   fromTaskId: formData.fromTaskId,
    //   toTaskId: formData.toTaskId,
    //   dependencyType: formData.dependencyType,
    //   lag: parseInt(formData.lag) || null
    // }));
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Create Task Dependency
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <span className="text-xl">✖</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="From Task (Predecessor)"
            options={taskOptions}
            value={formData.fromTaskId}
            onChange={(value) => setFormData({ ...formData, fromTaskId: value as string })}
            required
          />

          <Select
            label="To Task (Successor)"
            options={taskOptions.filter(opt => opt.value !== formData.fromTaskId)}
            value={formData.toTaskId}
            onChange={(value) => setFormData({ ...formData, toTaskId: value as string })}
            required
          />

          <Select
            label="Dependency Type"
            options={dependencyTypeOptions}
            value={formData.dependencyType}
            onChange={(value) => setFormData({ ...formData, dependencyType: value as string })}
          />

          <TextInput
            label="Lag Time (Days)"
            type="number"
            value={formData.lag}
            onChange={(e) => setFormData({ ...formData, lag: e.target.value })}
            placeholder="0"
          />

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Dependency Types Explained:
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li><strong>FS:</strong> Task A must finish before Task B starts</li>
              <li><strong>SS:</strong> Task A must start before Task B starts</li>
              <li><strong>FF:</strong> Task A must finish before Task B finishes</li>
              <li><strong>SF:</strong> Task A must start before Task B finishes</li>
            </ul>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!formData.fromTaskId || !formData.toTaskId}
            >
              Create Dependency
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}