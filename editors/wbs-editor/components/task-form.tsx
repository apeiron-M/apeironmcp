import type React from "react";
import { useState } from "react";
import { TextInput, Textarea, Select } from "@powerhousedao/document-engineering";
import { Button } from "@powerhousedao/design-system";
import { Icon } from "@powerhousedao/design-system";
import { type WorkBreakdownStructureState, type WbsTask, type TaskStatus, type TaskPriority } from "../../../document-models/work-breakdown-structure/gen/schema/types.js";
import { createTask, updateTask, moveTask } from "../../../document-models/work-breakdown-structure/gen/creators.js";
import { TaskIOManager } from "./task-io-manager.js";

interface TaskFormProps {
  task?: WbsTask | null;
  state: WorkBreakdownStructureState;
  dispatch: (action: any) => void;
  onClose: () => void;
}

export function TaskForm({ task, state, dispatch, onClose }: TaskFormProps) {
  const isEditing = !!task;
  const [formData, setFormData] = useState({
    code: task?.code || "",
    title: task?.title || "",
    summary: task?.summary || "",
    description: task?.description || "",
    // definitionOfDone: task?.definitionOfDone || "",
    status: task?.status || "TODO",
    priority: task?.priority || "MEDIUM",
    estimatedHours: task?.estimatedHours?.toString() || "",
    startDate: task?.startDate ? new Date(task.startDate).toISOString().split('T')[0] : "",
    dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : "",
    parentTaskId: task?.parentTaskId || "",
    ownerId: task?.ownerId || "",
    deliverableId: task?.deliverableId || ""
  });

  const generateId = () => crypto.randomUUID();

  const statusOptions = [
    { label: "Scoping", value: "SCOPING" },
    { label: "To Do", value: "TODO" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Review", value: "REVIEW" },
    { label: "Done", value: "DONE" },
    { label: "Blocked", value: "BLOCKED" },
    { label: "Cancelled", value: "CANCELLED" }
  ];

  const priorityOptions = [
    { label: "Low", value: "LOW" },
    { label: "Medium", value: "MEDIUM" },
    { label: "High", value: "HIGH" },
    { label: "Stretch", value: "STRETCH" },
    { label: "Critical", value: "CRITICAL" }
  ];

  // Build hierarchical parent task options
  const buildParentTaskOptions = () => {
    const options = [{ label: "None (Root Task)", value: "" }];
    
    const addTasksRecursively = (tasks: WbsTask[], level = 0) => {
      const rootTasks = tasks.filter(t => !t.parentTaskId && t.id !== task?.id);
      const childTasks = tasks.filter(t => t.parentTaskId && t.id !== task?.id);
      
      rootTasks.forEach(rootTask => {
        const indent = '\u00a0'.repeat(level * 4);
        options.push({
          label: `${indent}${rootTask.code} - ${rootTask.title}`,
          value: rootTask.id
        });
        
        // Add children recursively
        const children = childTasks.filter(t => t.parentTaskId === rootTask.id);
        if (children.length > 0) {
          addTasksRecursively(children, level + 1);
        }
      });
    };
    
    addTasksRecursively(state.tasks || []);
    return options;
  };
  
  const parentTaskOptions = buildParentTaskOptions();

  // Build team member options for owner assignment
  const ownerOptions = [
    { label: "Unassigned", value: "" },
    ...(state.teamMembers || [])
      .filter(member => member.isActive)
      .map(member => ({
        label: `${member.name}${member.role ? ` (${member.role})` : ''}`,
        value: member.id
      }))
  ];

  // Build deliverable options
  const deliverableOptions = [
    { label: "No deliverable", value: "" },
    ...(state.deliverables || [])
      .map(deliverable => ({
        label: deliverable.title,
        value: deliverable.id
      }))
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && task) {
      dispatch(updateTask({
        taskId: task.id,
        deliverableId: formData.deliverableId || null,
        ownerId: formData.ownerId || null,
        code: formData.code,
        title: formData.title,
        summary: formData.summary || null,
        description: formData.description || null,
        status: formData.status,
        priority: formData.priority,
        estimatedHours: formData.estimatedHours ? parseInt(formData.estimatedHours) : null,
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
        updatedAt: new Date().toISOString()
      }));
      
      // Update parent if changed
      if (formData.parentTaskId !== task.parentTaskId) {
        dispatch(moveTask({
          taskId: task.id,
          newParentTaskId: formData.parentTaskId || null,
          updatedAt: new Date().toISOString()
        }));
      }
    } else {
      dispatch(createTask({
        id: generateId(),
        deliverableId: formData.deliverableId || null,
        parentTaskId: formData.parentTaskId || null,
        ownerId: formData.ownerId || null,
        code: formData.code,
        title: formData.title,
        summary: formData.summary || null,
        description: formData.description || null,
        // definitionOfDone: formData.definitionOfDone || null,
        status: formData.status,
        priority: formData.priority,
        estimatedHours: formData.estimatedHours ? parseInt(formData.estimatedHours) : null,
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
        createdAt: new Date().toISOString()
      }));
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {isEditing ? "Edit Task" : "Create New Task"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <span className="text-xl">✖</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="Task Code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="e.g., 1.0, 2.1.3"
              required
            />
            
            <Select
              label="Deliverable"
              options={deliverableOptions}
              value={formData.deliverableId}
              onChange={(value) => setFormData({ ...formData, deliverableId: value as string })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Parent Task"
              options={parentTaskOptions}
              value={formData.parentTaskId}
              onChange={(value) => setFormData({ ...formData, parentTaskId: value as string })}
            />

            <Select
              label="Task Owner"
              options={ownerOptions}
              value={formData.ownerId}
              onChange={(value) => setFormData({ ...formData, ownerId: value as string })}
            />
          </div>

          <TextInput
            label="Task Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter task title"
            required
          />

          <Textarea
            label="Summary"
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            placeholder="Brief summary of the task"
          />

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Detailed description of what needs to be done"
          />

          {/* TODO: Definition of Done not available in current schema
          <Textarea
            label="Definition of Done"
            value={formData.definitionOfDone}
            onChange={(e) => setFormData({ ...formData, definitionOfDone: e.target.value })}
            placeholder="Clear criteria for when this task is complete"
          />
          */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Status"
              options={statusOptions}
              value={formData.status}
              onChange={(value) => setFormData({ ...formData, status: value as TaskStatus })}
            />
            
            <Select
              label="Priority"
              options={priorityOptions}
              value={formData.priority}
              onChange={(value) => setFormData({ ...formData, priority: value as TaskPriority })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextInput
              label="Estimated Hours"
              type="number"
              value={formData.estimatedHours}
              onChange={(e) => setFormData({ ...formData, estimatedHours: e.target.value })}
              placeholder="0"
            />
            
            <TextInput
              label="Start Date"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
            
            <TextInput
              label="Due Date"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </div>

          {/* Task Inputs and Outputs - Only show when editing existing task */}
          {isEditing && task && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                Task Dependencies & Results
              </h3>
              <TaskIOManager task={task} dispatch={dispatch} />
            </div>
          )}

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
              {isEditing ? "Update Task" : "Create Task"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}