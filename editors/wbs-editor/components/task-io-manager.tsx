import type React from "react";
import { useState } from "react";
import { TextInput, Textarea, Select } from "@powerhousedao/document-engineering";
import { Button } from "@powerhousedao/design-system";
import { type WbsTask, type TaskInput, type TaskOutput, type TaskDataType } from "../../../document-models/work-breakdown-structure/gen/schema/types.js";
import { addTaskInput, addTaskOutput, removeTaskInput, removeTaskOutput } from "../../../document-models/work-breakdown-structure/gen/creators.js";

interface TaskIOManagerProps {
  task: WbsTask;
  dispatch: (action: any) => void;
}

export function TaskIOManager({ task, dispatch }: TaskIOManagerProps) {
  const [showInputForm, setShowInputForm] = useState(false);
  const [showOutputForm, setShowOutputForm] = useState(false);
  const [inputForm, setInputForm] = useState({
    title: "",
    description: "",
    type: "DOCUMENT" as TaskDataType,
    isRequired: true
  });
  const [outputForm, setOutputForm] = useState({
    title: "",
    description: "",
    type: "DELIVERABLE" as TaskDataType,
    deliveryFormat: ""
  });

  const generateId = () => crypto.randomUUID();

  const dataTypeOptions = [
    { label: "Document", value: "DOCUMENT" },
    { label: "Data", value: "DATA" },
    { label: "Code", value: "CODE" },
    { label: "Design", value: "DESIGN" },
    { label: "Approval", value: "APPROVAL" },
    { label: "Feedback", value: "FEEDBACK" },
    { label: "Resource", value: "RESOURCE" },
    { label: "Deliverable", value: "DELIVERABLE" }
  ];

  const handleAddInput = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTaskInput({
      taskId: task.id,
      id: generateId(),
      title: inputForm.title,
      description: inputForm.description || null,
      type: inputForm.type,
      isRequired: inputForm.isRequired,
      createdAt: new Date().toISOString()
    }));
    setInputForm({ title: "", description: "", type: "DOCUMENT", isRequired: true });
    setShowInputForm(false);
  };

  const handleAddOutput = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTaskOutput({
      taskId: task.id,
      id: generateId(),
      title: outputForm.title,
      description: outputForm.description || null,
      type: outputForm.type,
      deliveryFormat: outputForm.deliveryFormat || null,
      createdAt: new Date().toISOString()
    }));
    setOutputForm({ title: "", description: "", type: "DELIVERABLE", deliveryFormat: "" });
    setShowOutputForm(false);
  };

  const handleRemoveInput = (inputId: string) => {
    dispatch(removeTaskInput({
      taskId: task.id,
      inputId,
      updatedAt: new Date().toISOString()
    }));
  };

  const handleRemoveOutput = (outputId: string) => {
    dispatch(removeTaskOutput({
      taskId: task.id,
      outputId,
      updatedAt: new Date().toISOString()
    }));
  };

  return (
    <div className="space-y-6">
      {/* Task Inputs/Dependencies */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-md font-medium text-gray-900 dark:text-gray-100">
            Task Inputs/Dependencies ({task.inputs?.length || 0})
          </h4>
          <Button
            onClick={() => setShowInputForm(true)}
            className="text-sm"
          >
            📥 Add Input
          </Button>
        </div>
        
        {task.inputs && task.inputs.length > 0 ? (
          <div className="space-y-2">
            {task.inputs.map((input: TaskInput) => (
              <div key={input.id} className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-blue-900 dark:text-blue-100">{input.title}</span>
                    <span className="text-xs bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                      {input.type}
                    </span>
                    {input.isRequired && (
                      <span className="text-xs bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 px-2 py-1 rounded">
                        Required
                      </span>
                    )}
                  </div>
                  {input.description && (
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">{input.description}</p>
                  )}
                </div>
                <button
                  onClick={() => handleRemoveInput(input.id)}
                  className="p-1 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                  aria-label="Remove input"
                >
                  <span className="text-xs">🗑️</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
            <p className="text-gray-500 dark:text-gray-400 text-sm">No inputs/dependencies defined</p>
          </div>
        )}

        {showInputForm && (
          <div className="mt-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <form onSubmit={handleAddInput} className="space-y-3">
              <div className="flex justify-between items-center">
                <h5 className="font-medium">Add Task Input/Dependency</h5>
                <button
                  type="button"
                  onClick={() => setShowInputForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✖
                </button>
              </div>
              <TextInput
                label="Input Name"
                value={inputForm.title}
                onChange={(e) => setInputForm({ ...inputForm, title: e.target.value })}
                placeholder="e.g., Requirements Document"
                required
              />
              <Textarea
                label="Description"
                value={inputForm.description}
                onChange={(e) => setInputForm({ ...inputForm, description: e.target.value })}
                placeholder="Describe what this input provides or requires"
              />
              <div className="grid grid-cols-2 gap-3">
                <Select
                  label="Data Type"
                  options={dataTypeOptions}
                  value={inputForm.type}
                  onChange={(value) => setInputForm({ ...inputForm, type: value as TaskDataType })}
                />
                <div className="flex items-center mt-6">
                  <input
                    type="checkbox"
                    id="isRequired"
                    checked={inputForm.isRequired}
                    onChange={(e) => setInputForm({ ...inputForm, isRequired: e.target.checked })}
                    className="mr-2"
                  />
                  <label htmlFor="isRequired" className="text-sm">Required input</label>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" onClick={() => setShowInputForm(false)}>Cancel</Button>
                <Button type="submit">Add Input</Button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Task Outputs/Results */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-md font-medium text-gray-900 dark:text-gray-100">
            Task Outputs/Results ({task.outputs?.length || 0})
          </h4>
          <Button
            onClick={() => setShowOutputForm(true)}
            className="text-sm"
          >
            📤 Add Output
          </Button>
        </div>
        
        {task.outputs && task.outputs.length > 0 ? (
          <div className="space-y-2">
            {task.outputs.map((output: TaskOutput) => (
              <div key={output.id} className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-green-900 dark:text-green-100">{output.title}</span>
                    <span className="text-xs bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                      {output.type}
                    </span>
                    {output.deliveryFormat && (
                      <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                        {output.deliveryFormat}
                      </span>
                    )}
                  </div>
                  {output.description && (
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">{output.description}</p>
                  )}
                </div>
                <button
                  onClick={() => handleRemoveOutput(output.id)}
                  className="p-1 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                  aria-label="Remove output"
                >
                  <span className="text-xs">🗑️</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
            <p className="text-gray-500 dark:text-gray-400 text-sm">No outputs/results defined</p>
          </div>
        )}

        {showOutputForm && (
          <div className="mt-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <form onSubmit={handleAddOutput} className="space-y-3">
              <div className="flex justify-between items-center">
                <h5 className="font-medium">Add Task Output/Result</h5>
                <button
                  type="button"
                  onClick={() => setShowOutputForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✖
                </button>
              </div>
              <TextInput
                label="Output Name"
                value={outputForm.title}
                onChange={(e) => setOutputForm({ ...outputForm, title: e.target.value })}
                placeholder="e.g., Design Mockups"
                required
              />
              <Textarea
                label="Description"
                value={outputForm.description}
                onChange={(e) => setOutputForm({ ...outputForm, description: e.target.value })}
                placeholder="Describe what this output will deliver"
              />
              <div className="grid grid-cols-2 gap-3">
                <Select
                  label="Data Type"
                  options={dataTypeOptions}
                  value={outputForm.type}
                  onChange={(value) => setOutputForm({ ...outputForm, type: value as TaskDataType })}
                />
                <TextInput
                  label="Delivery Format"
                  value={outputForm.deliveryFormat}
                  onChange={(e) => setOutputForm({ ...outputForm, deliveryFormat: e.target.value })}
                  placeholder="e.g., PDF, Figma file, ZIP"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" onClick={() => setShowOutputForm(false)}>Cancel</Button>
                <Button type="submit">Add Output</Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}