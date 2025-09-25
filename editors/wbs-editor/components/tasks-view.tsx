import type React from "react";
import { useMemo, useState } from "react";
import { ObjectSetTable, type ColumnDef, type ColumnAlignment, TextInput, Textarea, Select } from "@powerhousedao/document-engineering";
import { Button } from "@powerhousedao/design-system";
import { Icon } from "@powerhousedao/design-system";
import { type WorkBreakdownStructureState, type WbsTask, type TaskStatus, type TaskPriority, TaskInput, TaskOutput, TaskDataType } from "../../../document-models/work-breakdown-structure/gen/schema/types.js";
import { createTask, updateTask, deleteTask, moveTask, addTaskInput, addTaskOutput, removeTaskInput, removeTaskOutput, createDeliverable, updateDeliverable, assignTasksToDeliverable } from "../../../document-models/work-breakdown-structure/gen/creators.js";
import { TaskForm } from "./task-form.js";
import { AddInputForm } from "./add-input-form.js";
import { AddOutputForm } from "./add-output-form.js";

interface TasksViewProps {
  state: WorkBreakdownStructureState;
  dispatch: (action: any) => void;
}

export function TasksView({ state, dispatch }: TasksViewProps) {
  const tasks = state.tasks || [];
  
  const [selectedTask, setSelectedTask] = useState<WbsTask | null>(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showInputForm, setShowInputForm] = useState(false);
  const [showOutputForm, setShowOutputForm] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [showDeliverableForm, setShowDeliverableForm] = useState(false);
  const [expandedDeliverables, setExpandedDeliverables] = useState<Set<string>>(
    new Set((state.deliverables || []).map(d => d.id))
  );
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(
    new Set(tasks.filter(t => tasks.some(child => child.parentTaskId === t.id)).map(t => t.id))
  );

  const generateId = () => crypto.randomUUID();

  const toggleDeliverableExpansion = (deliverableId: string) => {
    setExpandedDeliverables(prev => {
      const newSet = new Set(prev);
      if (newSet.has(deliverableId)) {
        newSet.delete(deliverableId);
      } else {
        newSet.add(deliverableId);
      }
      return newSet;
    });
  };

  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const calculateDeliverableProgress = (deliverableId: string) => {
    const deliverableTasks = tasks.filter(task => task.deliverableId === deliverableId);
    if (deliverableTasks.length === 0) return 0;
    
    const totalProgress = deliverableTasks.reduce((sum, task) => sum + (task.progress || 0), 0);
    return Math.round(totalProgress / deliverableTasks.length);
  };

  const handleCreateTask = () => {
    setSelectedTask(null);
    setShowTaskForm(true);
  };

  const handleEditTask = (task: WbsTask) => {
    setSelectedTask(task);
    setShowTaskForm(true);
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask({ taskId, updatedAt: new Date().toISOString() }));
  };

  const handleUpdateTaskStatus = (taskId: string, status: TaskStatus) => {
    dispatch(updateTask({ taskId, status, updatedAt: new Date().toISOString() }));
  };

  const handleUpdateTaskProgress = (taskId: string, progress: number) => {
    dispatch(updateTask({ taskId, progress, updatedAt: new Date().toISOString() }));
  };

  const handleAddTaskInput = (taskId: string) => {
    setSelectedTaskId(taskId);
    setShowInputForm(true);
  };

  const handleAddTaskOutput = (taskId: string) => {
    setSelectedTaskId(taskId);
    setShowOutputForm(true);
  };

  const handleToggleSelection = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedTaskIds([]);
  };

  const handleTaskSelect = (taskId: string) => {
    setSelectedTaskIds(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleCreateDeliverableFromSelected = () => {
    if (selectedTaskIds.length === 0) return;
    setShowDeliverableForm(true);
  };

  const handleDeliverableSubmit = (deliverableData: { title: string; description: string; timeline: string; ownerId: string }) => {
    const deliverableId = generateId();
    
    // Create the deliverable
    dispatch(createDeliverable({
      id: deliverableId,
      title: deliverableData.title,
      description: deliverableData.description || null,
      timeline: deliverableData.timeline || null,
      ownerId: deliverableData.ownerId || null,
      status: "PLANNING",
      createdAt: new Date().toISOString()
    }));

    // Assign selected tasks to the deliverable
    if (selectedTaskIds.length > 0) {
      dispatch(assignTasksToDeliverable({
        deliverableId,
        taskIds: selectedTaskIds,
        updatedAt: new Date().toISOString()
      }));
    }

    // Reset selection
    setSelectedTaskIds([]);
    setIsSelectionMode(false);
    setShowDeliverableForm(false);
  };

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

  const getStatusBadgeColor = (status: TaskStatus) => {
    switch (status) {
      case "DONE": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "IN_PROGRESS": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "BLOCKED": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "REVIEW": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const columns = useMemo<Array<ColumnDef<WbsTask>>>(
    () => [
      {
        field: "code",
        title: "Code",
        editable: true,
        align: "left" as ColumnAlignment,
        width: 100,
        onSave: (newValue, context) => {
          dispatch(updateTask({ taskId: (context as any).row.id, code: newValue as string, updatedAt: new Date().toISOString() }));
          return true;
        },
      },
      {
        field: "title",
        title: "Task Title",
        editable: true,
        align: "left" as ColumnAlignment,
        width: 300,
        onSave: (newValue, context) => {
          dispatch(updateTask({ taskId: (context as any).row.id, title: newValue as string, updatedAt: new Date().toISOString() }));
          return true;
        },
      },
      {
        field: "status",
        title: "Status",
        editable: false,
        align: "center" as ColumnAlignment,
        width: 120,
        renderCell: (value, row) => (
          <div className="flex justify-center">
            <Select
              options={statusOptions}
              value={value as string}
              onChange={(newStatus) => handleUpdateTaskStatus((row as any).id, newStatus as TaskStatus)}
              className="min-w-0"
            />
          </div>
        ),
      },
      {
        field: "priority",
        title: "Priority",
        editable: false,
        align: "center" as ColumnAlignment,
        width: 100,
        renderCell: (value, row) => (
          <div className="flex justify-center">
            <Select
              options={priorityOptions}
              value={(value as string) || "MEDIUM"}
              onChange={(newPriority) => {
                dispatch(updateTask({ taskId: (row as any).id, priority: newPriority as TaskPriority, updatedAt: new Date().toISOString() }));
              }}
              className="min-w-0"
            />
          </div>
        ),
      },
      {
        field: "progress",
        title: "Progress",
        editable: true,
        align: "center" as ColumnAlignment,
        width: 120,
        renderCell: (value, row) => (
          <div className="flex items-center justify-center space-x-2">
            <input
              type="range"
              min="0"
              max="100"
              value={value || 0}
              onChange={(e) => handleUpdateTaskProgress((row as any).id, parseInt(e.target.value))}
              className="w-16"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[3rem]">
              {value || 0}%
            </span>
          </div>
        ),
      },
      {
        field: "estimatedHours",
        title: "Est. Hours",
        editable: true,
        align: "center" as ColumnAlignment,
        width: 100,
        onSave: (newValue, context) => {
          const hours = parseInt(newValue as string) || null;
          dispatch(updateTask({ taskId: (context as any).row.id, estimatedHours: hours, updatedAt: new Date().toISOString() }));
          return true;
        },
      },
      {
        field: "actualHours",
        title: "Actual Hours",
        editable: true,
        align: "center" as ColumnAlignment,
        width: 100,
        onSave: (newValue, context) => {
          const hours = parseInt(newValue as string) || null;
          dispatch(updateTask({ taskId: (context as any).row.id, actualHours: hours, updatedAt: new Date().toISOString() }));
          return true;
        },
      },
      {
        field: "dueDate",
        title: "Due Date",
        editable: true,
        align: "center" as ColumnAlignment,
        width: 120,
        renderCell: (value) => (
          <span className="text-sm">
            {value ? new Date(value).toLocaleDateString() : "-"}
          </span>
        ),
        onSave: (newValue, context) => {
          const date = newValue ? new Date(newValue as string).toISOString() : null;
          dispatch(updateTask({ taskId: (context as any).row.id, dueDate: date, updatedAt: new Date().toISOString() }));
          return true;
        },
      },
      {
        field: "actions",
        title: "Actions",
        editable: false,
        align: "center" as ColumnAlignment,
        width: 120,
        renderCell: (_, row) => (
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => handleEditTask(row as any)}
              className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 rounded"
              aria-label="Edit task"
            >
              <span className="text-xs">✏️</span>
            </button>
            <button
              onClick={() => handleDeleteTask((row as any).id)}
              className="p-1 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded"
              aria-label="Delete task"
            >
              <span className="text-xs">🗑️</span>
            </button>
          </div>
        ),
      },
    ],
    [dispatch, statusOptions, priorityOptions]
  );

  // Organize tasks into hierarchy grouped by deliverables
  const organizeTasksHierarchy = (tasks: WbsTask[]) => {
    const deliverables = state.deliverables || [];
    const result: Array<(WbsTask & { level: number; isDeliverable?: boolean; deliverableInfo?: any; taskCount?: number })> = [];

    // Group tasks by deliverable
    const tasksByDeliverable = new Map<string | null, WbsTask[]>();
    
    tasks.forEach(task => {
      const deliverableId = task.deliverableId || null;
      if (!tasksByDeliverable.has(deliverableId)) {
        tasksByDeliverable.set(deliverableId, []);
      }
      tasksByDeliverable.get(deliverableId)!.push(task);
    });

    // Build hierarchy for tasks within each group
    const buildTaskHierarchy = (taskList: WbsTask[], startLevel = 0): Array<WbsTask & { level: number }> => {
      const taskMap = new Map(taskList.map(task => [task.id, task]));
      const roots: WbsTask[] = [];
      const children = new Map<string, WbsTask[]>();

      // Build parent-child relationships
      taskList.forEach(task => {
        if (!task.parentTaskId || !taskMap.has(task.parentTaskId)) {
          roots.push(task);
        } else {
          if (!children.has(task.parentTaskId)) {
            children.set(task.parentTaskId, []);
          }
          children.get(task.parentTaskId)!.push(task);
        }
      });

      // Flatten with proper nesting levels
      const flattenWithLevel = (tasks: WbsTask[], level = startLevel): Array<WbsTask & { level: number }> => {
        const taskResult: Array<WbsTask & { level: number }> = [];
        
        tasks.forEach(task => {
          taskResult.push({ ...task, level });
          const childTasks = children.get(task.id) || [];
          taskResult.push(...flattenWithLevel(childTasks, level + 1));
        });
        
        return taskResult;
      };

      return flattenWithLevel(roots);
    };

    // First add all deliverables as root nodes
    deliverables.forEach(deliverable => {
      const deliverableTasks = tasksByDeliverable.get(deliverable.id) || [];
      
      // Add deliverable as a root node
      result.push({
        id: deliverable.id,
        deliverableId: null,
        parentTaskId: null,
        ownerId: null,
        code: "",
        title: deliverable.title,
        summary: deliverable.description,
        description: null,
        status: deliverable.status as any,
        priority: "MEDIUM" as any,
        progress: 0,
        estimatedHours: null,
        actualHours: null,
        startDate: null,
        dueDate: null,
        inputs: [],
        outputs: [],
        createdAt: deliverable.createdAt,
        updatedAt: deliverable.updatedAt,
        level: 0,
        isDeliverable: true,
        deliverableInfo: deliverable,
        taskCount: deliverableTasks.length
      } as any);

      // Add tasks for this deliverable with proper indentation
      const hierarchicalTasks = buildTaskHierarchy(deliverableTasks, 1);
      result.push(...hierarchicalTasks);
    });

    // Add unassigned tasks section only if there are any
    const unassignedTasks = tasksByDeliverable.get(null) || [];
    if (unassignedTasks.length > 0) {
      // Add separator if there are deliverables
      if (deliverables.length > 0) {
        result.push({
          id: "separator",
          deliverableId: null,
          parentTaskId: null,
          ownerId: null,
          code: "",
          title: "─────────────────────────────",
          summary: null,
          description: null,
          status: "TODO" as any,
          priority: "MEDIUM" as any,
          progress: 0,
          estimatedHours: null,
          actualHours: null,
          startDate: null,
          dueDate: null,
          inputs: [],
          outputs: [],
          createdAt: new Date().toISOString(),
          updatedAt: null,
          level: 0,
          isDeliverable: true,
          deliverableInfo: { status: "UNASSIGNED" }
        } as any);
      }

      // Add "Unassigned Tasks" header
      result.push({
        id: "unassigned-header",
        deliverableId: null,
        parentTaskId: null,
        ownerId: null,
        code: "",
        title: "Unassigned Tasks (Not in any deliverable)",
        summary: "Select these tasks and create a deliverable to organize them",
        description: null,
        status: "TODO" as any,
        priority: "MEDIUM" as any,
        progress: 0,
        estimatedHours: null,
        actualHours: null,
        startDate: null,
        dueDate: null,
        inputs: [],
        outputs: [],
        createdAt: new Date().toISOString(),
        updatedAt: null,
        level: 0,
        isDeliverable: true,
        deliverableInfo: { status: "UNASSIGNED" },
        taskCount: unassignedTasks.length
      } as any);

      const hierarchicalUnassigned = buildTaskHierarchy(unassignedTasks, 1);
      result.push(...hierarchicalUnassigned);
    }

    return result;
  };

  const hierarchicalTasks = organizeTasksHierarchy(tasks);

  // Filter tasks based on expanded state
  const filterTasksByExpansion = (tasks: any[]) => {
    const result: any[] = [];
    let currentDeliverableExpanded = true;
    
    for (const task of tasks) {
      if (task.isDeliverable) {
        // Always show deliverable headers
        result.push(task);
        
        // Check if this deliverable is expanded
        const deliverableInfo = task.deliverableInfo || {};
        const isUnassigned = deliverableInfo.status === "UNASSIGNED";
        currentDeliverableExpanded = isUnassigned || expandedDeliverables.has(deliverableInfo.id || '');
      } else {
        // Only show tasks if their deliverable is expanded
        if (!currentDeliverableExpanded) continue;
        
        // For regular tasks, check if all parent tasks are expanded
        const isTaskVisible = () => {
          if (!task.parentTaskId) return true; // Root task is visible
          
          // Check if parent task is expanded
          let currentTaskId = task.parentTaskId;
          while (currentTaskId) {
            if (!expandedTasks.has(currentTaskId)) return false;
            const parentTask = tasks.find(t => t.id === currentTaskId);
            currentTaskId = parentTask?.parentTaskId;
          }
          return true;
        };
        
        if (isTaskVisible()) {
          result.push(task);
        }
      }
    }
    
    return result;
  };

  const filteredTasks = filterTasksByExpansion(hierarchicalTasks);

  const handleAddTask = (parentTaskId?: string) => {
    let taskCode: string;
    
    if (parentTaskId) {
      // Generate subtask code (e.g., 1.1, 1.2, 2.1)
      const parentTask = tasks.find(t => t.id === parentTaskId);
      const siblingTasks = tasks.filter(t => t.parentTaskId === parentTaskId);
      const siblingCount = siblingTasks.length;
      taskCode = `${parentTask?.code}.${siblingCount + 1}`;
    } else {
      // Generate root task code (e.g., 1.0, 2.0)
      const rootTasks = tasks.filter(t => !t.parentTaskId);
      taskCode = `${rootTasks.length + 1}.0`;
    }
    
    dispatch(createTask({
      id: generateId(),
      parentTaskId: parentTaskId || null,
      code: taskCode,
      title: "New Task",
      status: "TODO" as TaskStatus,
      priority: "MEDIUM" as TaskPriority,
      createdAt: new Date().toISOString()
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Tasks ({tasks.length})
            {isSelectionMode && (
              <span className="text-sm text-blue-600 dark:text-blue-400 ml-2">
                - {selectedTaskIds.length} selected
              </span>
            )}
          </h2>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Deliverables: {(state.deliverables || []).length} | 
            Root Tasks: {tasks.filter(t => !t.parentTaskId).length} | 
            Subtasks: {tasks.filter(t => t.parentTaskId).length}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isSelectionMode ? (
            <>
              <Button
                onClick={handleCreateDeliverableFromSelected}
                disabled={selectedTaskIds.length === 0}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
              >
                <span className="text-sm">📦</span>
                <span>Create New Deliverable ({selectedTaskIds.length})</span>
              </Button>
              {(state.deliverables || []).length > 0 && (
                <div className="flex items-center space-x-2">
                  <select
                    onChange={(e) => {
                      if (e.target.value && selectedTaskIds.length > 0) {
                        dispatch(assignTasksToDeliverable({
                          deliverableId: e.target.value,
                          taskIds: selectedTaskIds,
                          updatedAt: new Date().toISOString()
                        }));
                        setSelectedTaskIds([]);
                        setIsSelectionMode(false);
                      }
                    }}
                    value=""
                    className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
                    disabled={selectedTaskIds.length === 0}
                  >
                    <option value="">📋 Assign to Existing Deliverable</option>
                    {(state.deliverables || []).map(deliverable => (
                      <option key={deliverable.id} value={deliverable.id}>
                        📦 {deliverable.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <Button
                onClick={handleToggleSelection}
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700"
              >
                <span>Cancel Selection</span>
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleToggleSelection}
                disabled={tasks.length === 0}
                className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700"
              >
                <span className="text-sm">☑️</span>
                <span>Select Tasks</span>
              </Button>
              <Button
                onClick={handleCreateTask}
                className="flex items-center space-x-2"
              >
                <span className="text-sm">➕</span>
                <span>Add Task</span>
              </Button>
            </>
          )}
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-gray-500 dark:text-gray-400 text-xl">📋</span>
        </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No tasks yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create your first task to start breaking down the work.
          </p>
          <Button onClick={handleCreateTask}>
            <span className="text-sm mr-2">➕</span>
            Create First Task
          </Button>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-4">
            <div className="grid gap-2 pb-3 border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300" style={{ gridTemplateColumns: isSelectionMode ? '2rem 8rem 1fr 6rem 5rem 5rem 6rem 5rem 5rem 5rem 8rem' : '8rem 1fr 6rem 5rem 5rem 6rem 5rem 5rem 5rem 8rem' }}>
              {isSelectionMode && <div className="text-center">Select</div>}
              <div>Code</div>
              <div className="col-span-1">Title</div>
              <div className="text-center">Owner</div>
              <div className="text-center">Status</div>
              <div className="text-center">Priority</div>
              <div className="text-center">Progress</div>
              <div className="text-center">Est. Hours</div>
              <div className="text-center">Inputs</div>
              <div className="text-center">Outputs</div>
              <div className="text-center">Actions</div>
            </div>
            <div className="space-y-1 mt-3">
              {filteredTasks.map((task) => {
                // Handle deliverable header rows and separators
                if ((task).isDeliverable) {
                  const deliverableInfo = (task).deliverableInfo || {};
                  const isUnassigned = deliverableInfo.status === "UNASSIGNED";
                  const isSeparator = task.id === "separator";
                  
                  if (isSeparator) {
                    return (
                      <div key={task.id} className="py-2 text-center text-gray-400 dark:text-gray-600">
                        {task.title}
                      </div>
                    );
                  }
                  
                  const statusColors = {
                    PLANNING: "bg-gray-50 dark:bg-gray-900/20 border-gray-300 dark:border-gray-700",
                    IN_PROGRESS: "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700",
                    REVIEW: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700",
                    COMPLETED: "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700",
                    CANCELLED: "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700",
                    UNASSIGNED: "bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-700"
                  };
                  
                  const bgColor = statusColors[deliverableInfo.status as keyof typeof statusColors] || statusColors.PLANNING;
                  
                  const deliverableProgress = isUnassigned ? 0 : calculateDeliverableProgress(deliverableInfo.id);
                  const isExpanded = isUnassigned || expandedDeliverables.has(deliverableInfo.id || '');
                  const owner = !isUnassigned && deliverableInfo.ownerId 
                    ? (state.teamMembers || []).find(member => member.id === deliverableInfo.ownerId) 
                    : null;

                  return (
                    <div
                      key={task.id}
                      className={`mt-4 first:mt-0 py-3 ${bgColor} border-2 rounded-lg font-medium ${isSelectionMode && !isUnassigned ? 'ring-2 ring-purple-400' : ''}`}
                    >
                      <div className="px-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {!isUnassigned && (
                              <button
                                onClick={() => toggleDeliverableExpansion(deliverableInfo.id)}
                                className="p-1 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded transition-colors"
                              >
                                <span className="text-lg">
                                  {isExpanded ? "🔽" : "▶️"}
                                </span>
                              </button>
                            )}
                            <span className="text-2xl">
                              {isUnassigned ? "⚠️" : "📦"}
                            </span>
                            <div>
                              <h3 className={`text-lg font-bold ${isUnassigned ? 'text-orange-900 dark:text-orange-100' : 'text-gray-900 dark:text-gray-100'}`}>
                                {task.title}
                              </h3>
                              {!isUnassigned && (
                                <div className="flex items-center space-x-3 mt-1">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">👤</span>
                                    <select
                                      value={deliverableInfo.ownerId || ""}
                                      onChange={(e) => {
                                        dispatch(updateDeliverable({
                                          deliverableId: deliverableInfo.id,
                                          ownerId: e.target.value || null,
                                          updatedAt: new Date().toISOString()
                                        }));
                                      }}
                                      className="bg-transparent border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-xs max-w-32"
                                    >
                                      <option value="">Unassigned</option>
                                      {(state.teamMembers || [])
                                        .filter(member => member.isActive)
                                        .map(member => (
                                          <option key={member.id} value={member.id}>
                                            {member.name}
                                          </option>
                                        ))
                                      }
                                    </select>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">📊</span>
                                    <select
                                      value={deliverableInfo.status}
                                      onChange={(e) => {
                                        dispatch(updateDeliverable({
                                          deliverableId: deliverableInfo.id,
                                          status: e.target.value,
                                          updatedAt: new Date().toISOString()
                                        }));
                                      }}
                                      className="bg-transparent border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-xs"
                                    >
                                      <option value="PLANNING">Planning</option>
                                      <option value="IN_PROGRESS">In Progress</option>
                                      <option value="REVIEW">Review</option>
                                      <option value="COMPLETED">Completed</option>
                                      <option value="CANCELLED">Cancelled</option>
                                    </select>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            {!isUnassigned && (
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Progress:</span>
                                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all"
                                    style={{ width: `${deliverableProgress}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[3rem]">
                                  {deliverableProgress}%
                                </span>
                              </div>
                            )}
                            {(task).taskCount !== undefined && (
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                isUnassigned 
                                  ? 'bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200'
                                  : 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
                              }`}>
                                {(task).taskCount} task{(task).taskCount !== 1 ? 's' : ''}
                              </span>
                            )}
                            {!isUnassigned && deliverableInfo.status && (
                              <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                                {deliverableInfo.status}
                              </span>
                            )}
                          </div>
                        </div>
                        {isSelectionMode && isUnassigned && (
                          <div className="mt-2 p-2 bg-orange-100 dark:bg-orange-900/30 rounded text-sm text-orange-800 dark:text-orange-200">
                            ℹ️ Select tasks below and click "Create Deliverable" to organize them
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }

                // Handle regular task rows
                return (
                  <div
                    key={task.id}
                    className={`py-2 rounded transition-colors ${
                      isSelectionMode 
                        ? selectedTaskIds.includes(task.id)
                          ? "bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/50"
                          : "hover:bg-blue-25 dark:hover:bg-blue-900/10 border border-transparent hover:border-blue-100 dark:hover:border-blue-800"
                        : "hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                    style={{ marginLeft: `${task.level * 24}px` }}
                  >
                  <div className="grid gap-2 items-center" style={{ gridTemplateColumns: isSelectionMode ? '2rem 8rem 1fr 6rem 5rem 5rem 6rem 5rem 5rem 5rem 8rem' : '8rem 1fr 6rem 5rem 5rem 6rem 5rem 5rem 5rem 8rem' }}>
                    {isSelectionMode && (
                      <div className="text-center">
                        <input
                          type="checkbox"
                          checked={selectedTaskIds.includes(task.id)}
                          onChange={() => handleTaskSelect(task.id)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    )}
                    <div className="font-mono text-sm text-gray-600 dark:text-gray-400 flex items-center">
                      {task.level > 0 && (
                        <span className="text-gray-400 mr-2">
                          {'└'.repeat(1)} 
                        </span>
                      )}
                      {tasks.some(t => t.parentTaskId === task.id) && (
                        <button
                          onClick={() => toggleTaskExpansion(task.id)}
                          className="mr-2 p-0.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                        >
                          <span className="text-sm">
                            {expandedTasks.has(task.id) ? "🔽" : "▶️"}
                          </span>
                        </button>
                      )}
                      <span>{task.code}</span>
                    </div>
                    <div className="overflow-hidden">
                      <input
                        type="text"
                        value={task.title}
                        onChange={(e) => {
                          dispatch(updateTask({
                            taskId: task.id,
                            title: e.target.value,
                            updatedAt: new Date().toISOString()
                          }));
                        }}
                        className="w-full bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 focus:bg-gray-50 dark:focus:bg-gray-700 rounded px-1 py-0.5 text-sm truncate"
                      />
                    </div>
                    <div className="text-center">
                      <select
                        value={task.ownerId || ""}
                        onChange={(e) => {
                          dispatch(updateTask({
                            taskId: task.id,
                            ownerId: e.target.value || null,
                            updatedAt: new Date().toISOString()
                          }));
                        }}
                        className="bg-transparent border-0 text-xs w-full"
                      >
                        <option value="">-</option>
                        {(state.teamMembers || [])
                          .filter(member => member.isActive)
                          .map(member => (
                            <option key={member.id} value={member.id}>
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="text-center">
                      <select
                        value={task.status}
                        onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value as TaskStatus)}
                        className="bg-transparent border-0 text-xs w-full"
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="text-center">
                      <select
                        value={task.priority}
                        onChange={(e) => {
                          dispatch(updateTask({
                            taskId: task.id,
                            priority: e.target.value as TaskPriority,
                            updatedAt: new Date().toISOString()
                          }));
                        }}
                        className="bg-transparent border-0 text-xs w-full"
                      >
                        {priorityOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={task.progress || 0}
                        onChange={(e) => handleUpdateTaskProgress(task.id, parseInt(e.target.value))}
                        className="w-full bg-transparent border-0 text-xs text-center"
                        placeholder="0"
                      />
                      <span className="text-xs text-gray-500">%</span>
                    </div>
                    <div className="text-center">
                      <input
                        type="number"
                        value={task.estimatedHours || ""}
                        onChange={(e) => {
                          const hours = parseInt(e.target.value) || null;
                          dispatch(updateTask({
                            taskId: task.id,
                            estimatedHours: hours,
                            updatedAt: new Date().toISOString()
                          }));
                        }}
                        className="w-full bg-transparent border-0 text-xs text-center"
                        placeholder="-"
                      />
                    </div>
                    <div className="text-center">
                      <button
                        onClick={() => handleAddTaskInput(task.id)}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 rounded px-1"
                        title="Add input"
                      >
                        📥{task.inputs?.length || 0}
                      </button>
                    </div>
                    <div className="text-center">
                      <button
                        onClick={() => handleAddTaskOutput(task.id)}
                        className="text-xs text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900 rounded px-1"
                        title="Add output"
                      >
                        📤{task.outputs?.length || 0}
                      </button>
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => handleEditTask(task)}
                        className="p-0.5 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 rounded"
                        aria-label="Edit"
                        title="Edit"
                      >
                        <span className="text-xs">✏️</span>
                      </button>
                      <select
                        value={task.deliverableId || ""}
                        onChange={(e) => {
                          dispatch(updateTask({
                            taskId: task.id,
                            deliverableId: e.target.value || null,
                            updatedAt: new Date().toISOString()
                          }));
                        }}
                        className="mx-1 bg-transparent border-0 text-xs max-w-16 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        title="Deliverable"
                      >
                        <option value="">-</option>
                        {(state.deliverables || []).map((d, i) => (
                          <option key={d.id} value={d.id}>
                            D{i+1}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-0.5 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                        aria-label="Delete"
                        title="Delete"
                      >
                        <span className="text-xs">🗑️</span>
                      </button>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <Button
                onClick={() => handleAddTask()}
                className="flex items-center space-x-2"
              >
                <span className="text-sm">➕</span>
                <span>Add Root Task</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {isSelectionMode && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">☑️</span>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                  Task Selection Mode
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Select tasks to create a new deliverable or assign to existing ones. Use dropdown in Actions column for individual task reassignment.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                {selectedTaskIds.length} of {tasks.length} selected
              </span>
            </div>
          </div>
        </div>
      )}

      {showTaskForm && (
        <TaskForm
          task={selectedTask}
          state={state}
          dispatch={dispatch}
          onClose={() => setShowTaskForm(false)}
        />
      )}

      {showInputForm && selectedTaskId && (
        <AddInputForm
          taskId={selectedTaskId}
          state={state}
          dispatch={dispatch}
          onClose={() => {
            setShowInputForm(false);
            setSelectedTaskId(null);
          }}
        />
      )}

      {showOutputForm && selectedTaskId && (
        <AddOutputForm
          taskId={selectedTaskId}
          dispatch={dispatch}
          onClose={() => {
            setShowOutputForm(false);
            setSelectedTaskId(null);
          }}
        />
      )}

      {showDeliverableForm && (
        <DeliverableCreationForm
          onSubmit={handleDeliverableSubmit}
          onClose={() => setShowDeliverableForm(false)}
          selectedTaskCount={selectedTaskIds.length}
          teamMembers={state.teamMembers || []}
        />
      )}
    </div>
  );
}

// Simple deliverable creation form
interface DeliverableCreationFormProps {
  onSubmit: (data: { title: string; description: string; timeline: string; ownerId: string }) => void;
  onClose: () => void;
  selectedTaskCount: number;
  teamMembers: any[];
}

function DeliverableCreationForm({ onSubmit, onClose, selectedTaskCount, teamMembers }: DeliverableCreationFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    timeline: "",
    ownerId: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Create Deliverable
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <span className="text-xl">✖</span>
          </button>
        </div>

        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-sm text-green-800 dark:text-green-200">
            📦 This deliverable will group {selectedTaskCount} selected task{selectedTaskCount !== 1 ? 's' : ''}.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            label="Deliverable Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter deliverable name"
            required
          />

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe what this deliverable encompasses"
            rows={3}
          />

          <TextInput
            label="Timeline"
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            placeholder="e.g., Q1 2024, 2 weeks"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Owner
            </label>
            <select
              value={formData.ownerId}
              onChange={(e) => setFormData({ ...formData, ownerId: e.target.value })}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">No owner assigned</option>
              {teamMembers.filter(member => member.isActive).map(member => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
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
              Create Deliverable
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}