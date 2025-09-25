import type React from "react";
import { useState } from "react";
import { TextInput, Textarea, Select } from "@powerhousedao/document-engineering";
import { Button } from "@powerhousedao/design-system";
import { type TaskDataType } from "../../../document-models/work-breakdown-structure/gen/schema/types.js";
import { addTaskOutput } from "../../../document-models/work-breakdown-structure/gen/creators.js";

interface AddOutputFormProps {
  taskId: string;
  dispatch: (action: any) => void;
  onClose: () => void;
}

export function AddOutputForm({ taskId, dispatch, onClose }: AddOutputFormProps) {
  const [formData, setFormData] = useState({
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

  const outputTemplates = {
    DOCUMENT: {
      title: "Documentation",
      description: "Written documentation, reports, or specifications produced by this task",
      examples: ["Technical Documentation", "User Manual", "Test Report", "Architecture Document"],
      formats: ["PDF", "Markdown", "Word Document", "Confluence Page"]
    },
    DATA: {
      title: "Processed Data",
      description: "Cleaned, analyzed, or transformed data resulting from this task",
      examples: ["Analytics Report", "Cleaned Dataset", "Database Export", "Performance Metrics"],
      formats: ["CSV", "JSON", "Excel", "Database Dump"]
    },
    CODE: {
      title: "Software Component",
      description: "Code, modules, or software components developed in this task",
      examples: ["Feature Module", "API Endpoint", "UI Component", "Testing Suite"],
      formats: ["GitHub Repository", "ZIP Archive", "Docker Image", "NPM Package"]
    },
    DESIGN: {
      title: "Design Assets",
      description: "Visual designs, prototypes, or creative assets produced",
      examples: ["UI Mockups", "Prototype", "Icon Set", "Brand Guidelines"],
      formats: ["Figma File", "Sketch File", "PDF", "PNG/SVG Assets"]
    },
    APPROVAL: {
      title: "Formal Approval",
      description: "Official approvals, certifications, or sign-offs obtained",
      examples: ["Management Sign-off", "Legal Clearance", "Compliance Certificate", "Budget Approval"],
      formats: ["Signed Document", "Email Confirmation", "Digital Certificate", "Meeting Minutes"]
    },
    FEEDBACK: {
      title: "Collected Feedback",
      description: "Feedback, reviews, or input gathered from stakeholders",
      examples: ["User Testing Results", "Code Review Report", "Stakeholder Comments", "Survey Results"],
      formats: ["Report Document", "Survey Data", "Meeting Notes", "Review Comments"]
    },
    RESOURCE: {
      title: "Prepared Resource",
      description: "Tools, templates, or resources prepared for future use",
      examples: ["Deployment Scripts", "Configuration Templates", "Training Materials", "Process Guidelines"],
      formats: ["Script Files", "Template Documents", "Video Tutorial", "Step-by-Step Guide"]
    },
    DELIVERABLE: {
      title: "Final Deliverable",
      description: "Completed work product ready for handover or deployment",
      examples: ["Production System", "Completed Feature", "Published Content", "Launched Campaign"],
      formats: ["Live System", "Deployed Application", "Published Website", "Released Product"]
    }
  };

  const handleTypeChange = (type: TaskDataType) => {
    const template = outputTemplates[type];
    setFormData({
      ...formData,
      type,
      title: template.title,
      description: template.description,
      deliveryFormat: template.formats[0] // Default to first format option
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTaskOutput({
      taskId,
      id: generateId(),
      title: formData.title,
      description: formData.description || null,
      type: formData.type,
      deliveryFormat: formData.deliveryFormat || null,
      createdAt: new Date().toISOString()
    }));
    onClose();
  };

  const currentTemplate = outputTemplates[formData.type];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Add Task Output/Result
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <span className="text-xl">✖</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Output Type Selection */}
          <div>
            <Select
              label="Output Type"
              options={dataTypeOptions}
              value={formData.type}
              onChange={(value) => handleTypeChange(value as TaskDataType)}
            />
            <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200 font-medium mb-2">Template Examples:</p>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                {currentTemplate.examples.map((example, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Output Details */}
          <TextInput
            label="Output Name"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter a descriptive name for this output"
            required
          />

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe what this output will deliver and its purpose"
            rows={3}
          />

          {/* Delivery Format */}
          <div>
            <TextInput
              label="Delivery Format"
              value={formData.deliveryFormat}
              onChange={(e) => setFormData({ ...formData, deliveryFormat: e.target.value })}
              placeholder="How will this output be delivered?"
            />
            <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              Suggested formats: {currentTemplate.formats.join(", ")}
            </div>
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
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white"
            >
              Add Output
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}