import type React from "react";
import { useState } from "react";
import { TextInput, Textarea, Select } from "@powerhousedao/document-engineering";
import { Button } from "@powerhousedao/design-system";
import { type TaskDataType, type WorkBreakdownStructureState } from "../../../document-models/work-breakdown-structure/gen/schema/types.js";
import { addTaskInput } from "../../../document-models/work-breakdown-structure/gen/creators.js";

interface AddInputFormProps {
  taskId: string;
  state: WorkBreakdownStructureState;
  dispatch: (action: any) => void;
  onClose: () => void;
}

export function AddInputForm({ taskId, state, dispatch, onClose }: AddInputFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "DOCUMENT" as TaskDataType,
    isRequired: true,
    linkedTaskOutputId: ""
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

  const inputTemplates = {
    DOCUMENT: {
      title: "Requirements Document",
      description: "Detailed requirements and specifications needed to complete this task",
      examples: ["Product Requirements Document", "Technical Specification", "User Stories", "API Documentation"]
    },
    DATA: {
      title: "Dataset",
      description: "Data sources or datasets required for analysis or processing",
      examples: ["User Analytics Data", "Sales Database", "Customer Survey Results", "Market Research Data"]
    },
    CODE: {
      title: "Code Dependencies",
      description: "Existing code, libraries, or frameworks needed for implementation",
      examples: ["Authentication Service", "Payment API Integration", "UI Component Library", "Database Schema"]
    },
    DESIGN: {
      title: "Design Assets",
      description: "Visual designs, mockups, or style guides needed for implementation",
      examples: ["UI Mockups", "Brand Guidelines", "Icon Set", "User Flow Diagrams"]
    },
    APPROVAL: {
      title: "Stakeholder Approval",
      description: "Required approvals or sign-offs before proceeding with this task",
      examples: ["Management Approval", "Legal Review", "Budget Authorization", "Technical Architecture Review"]
    },
    FEEDBACK: {
      title: "Stakeholder Feedback",
      description: "Input, reviews, or feedback needed from stakeholders",
      examples: ["User Testing Feedback", "Code Review Comments", "Design Critique", "Business Validation"]
    },
    RESOURCE: {
      title: "External Resource",
      description: "External tools, services, or resources needed for task completion",
      examples: ["Third-party API Access", "Software License", "Hardware Equipment", "External Consultant"]
    },
    DELIVERABLE: {
      title: "Previous Deliverable",
      description: "Output from another task that serves as input for this task",
      examples: ["Completed Feature Module", "Approved Design System", "Database Migration", "Test Results"]
    }
  };

  const handleTypeChange = (type: TaskDataType) => {
    const template = inputTemplates[type];
    setFormData({
      ...formData,
      type,
      title: template.title,
      description: template.description
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTaskInput({
      taskId,
      id: generateId(),
      title: formData.title,
      description: formData.description || null,
      type: formData.type,
      isRequired: formData.isRequired,
      linkedTaskOutputId: formData.linkedTaskOutputId || null,
      createdAt: new Date().toISOString()
    }));
    onClose();
  };

  const currentTemplate = inputTemplates[formData.type];

  // Build available task outputs for linking
  const availableOutputs = (state.tasks || [])
    .filter(task => task.id !== taskId) // Exclude current task
    .flatMap(task => 
      (task.outputs || []).map(output => ({
        label: `${task.code}: ${output.title} (${output.type})`,
        value: output.id,
        taskTitle: task.title,
        taskCode: task.code,
        outputTitle: output.title,
        outputType: output.type
      }))
    );

  const linkingOptions = [
    { label: "No linked output", value: "" },
    ...availableOutputs
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Add Task Input/Dependency
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <span className="text-xl">✖</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input Type Selection */}
          <div>
            <Select
              label="Input Type"
              options={dataTypeOptions}
              value={formData.type}
              onChange={(value) => handleTypeChange(value as TaskDataType)}
            />
            <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200 font-medium mb-2">Template Examples:</p>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                {currentTemplate.examples.map((example, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Input Details */}
          <TextInput
            label="Input Name"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter a descriptive name for this input"
            required
          />

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe what this input provides and why it's needed"
            rows={3}
          />

          {/* Required Toggle */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isRequired"
              checked={formData.isRequired}
              onChange={(e) => setFormData({ ...formData, isRequired: e.target.checked })}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="isRequired" className="text-sm font-medium text-gray-900 dark:text-gray-100">
              This is a required dependency
            </label>
          </div>

          {/* Link to Task Output */}
          <div>
            <Select
              label="Link to Task Output (Optional)"
              options={linkingOptions}
              value={formData.linkedTaskOutputId}
              onChange={(value) => setFormData({ ...formData, linkedTaskOutputId: value as string })}
            />
            {formData.linkedTaskOutputId && (
              <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200 font-medium">
                  🔗 This input will be automatically fulfilled when the linked task output is completed.
                </p>
              </div>
            )}
            {availableOutputs.length === 0 && (
              <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                No task outputs available to link. Create tasks with outputs first.
              </div>
            )}
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
            >
              Add Input
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}