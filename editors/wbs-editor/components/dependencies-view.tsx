import React, { useMemo, useState } from "react";
import { ObjectSetTable, type ColumnDef, type ColumnAlignment, Select } from "@powerhousedao/document-engineering";
import { Button } from "@powerhousedao/design-system";
import { Icon } from "@powerhousedao/design-system";
import { type WorkBreakdownStructureState } from "../../../document-models/work-breakdown-structure/gen/schema/types.js";
// TODO: Dependency actions not yet available in generated creators
// import { addDependency, deleteDependency } from "../../../document-models/work-breakdown-structure/gen/creators.js";

interface DependenciesViewProps {
  state: WorkBreakdownStructureState;
  dispatch: (action: any) => void;
}

export function DependenciesView({ state, dispatch }: DependenciesViewProps) {
  const [showDependencyForm, setShowDependencyForm] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "network" | "timeline">("network");

  const generateId = () => crypto.randomUUID();

  const handleCreateDependency = () => {
    setShowDependencyForm(true);
  };

  const handleDeleteDependency = (dependencyId: string) => {
    // TODO: Delete dependency action not yet available
    // dispatch(deleteDependency({ dependencyId }));
  };

  // Build dependencies from task input-output links
  const allDependencies = useMemo(() => {
    if (!state.tasks) return [];
    
    const dependencies: Array<{
      id: string;
      fromTaskId: string;
      fromTaskCode: string;
      fromTaskTitle: string;
      fromOutputTitle: string;
      toTaskId: string;
      toTaskCode: string;
      toTaskTitle: string;
      toInputTitle: string;
      dependencyType: string;
      lag: number;
    }> = [];

    // Find all task inputs that link to task outputs
    state.tasks.forEach(task => {
      (task.inputs || []).forEach(input => {
        if (input.linkedTaskOutputId) {
          // Find the source task and output
          const sourceTask = state.tasks?.find(t => 
            t.outputs?.some(output => output.id === input.linkedTaskOutputId)
          );
          const sourceOutput = sourceTask?.outputs?.find(output => 
            output.id === input.linkedTaskOutputId
          );
          
          if (sourceTask && sourceOutput) {
            dependencies.push({
              id: input.id,
              fromTaskId: sourceTask.id,
              fromTaskCode: sourceTask.code,
              fromTaskTitle: sourceTask.title,
              fromOutputTitle: sourceOutput.title,
              toTaskId: task.id,
              toTaskCode: task.code,
              toTaskTitle: task.title,
              toInputTitle: input.title,
              dependencyType: "FINISH_TO_START", // Default type for output-input links
              lag: 0
            });
          }
        }
      });
    });

    return dependencies;
  }, [state.tasks]);

  // Analyze dependency patterns
  const dependencyAnalysis = useMemo(() => {
    const taskStats = new Map();
    const blockedTasks = new Set();
    const blockingTasks = new Set();
    
    // Initialize task stats
    (state.tasks || []).forEach(task => {
      taskStats.set(task.id, {
        task,
        incomingCount: 0,
        outgoingCount: 0,
        isBlocked: false,
        isBlocking: false
      });
    });
    
    // Count dependencies
    allDependencies.forEach(dep => {
      const fromStats = taskStats.get(dep.fromTaskId);
      const toStats = taskStats.get(dep.toTaskId);
      
      if (fromStats) {
        fromStats.outgoingCount++;
        fromStats.isBlocking = true;
        blockingTasks.add(dep.fromTaskId);
      }
      
      if (toStats) {
        toStats.incomingCount++;
        toStats.isBlocked = true;
        blockedTasks.add(dep.toTaskId);
      }
    });
    
    return {
      taskStats,
      blockedTasks,
      blockingTasks,
      totalDependencies: allDependencies.length,
      tasksWithNoDependencies: (state.tasks || []).filter(t => 
        !blockedTasks.has(t.id) && !blockingTasks.has(t.id)
      ).length
    };
  }, [allDependencies, state.tasks]);

  const dependencyTypeOptions = [
    { label: "Finish to Start", value: "FINISH_TO_START" },
    { label: "Start to Start", value: "START_TO_START" },
    { label: "Finish to Finish", value: "FINISH_TO_FINISH" },
    { label: "Start to Finish", value: "START_TO_FINISH" }
  ];

  const getDependencyTypeLabel = (type: string) => {
    const option = dependencyTypeOptions.find(opt => opt.value === type);
    return option?.label || type;
  };

  const columns = useMemo<Array<ColumnDef<any>>>(
    () => [
      {
        field: "fromTaskCode",
        title: "Source Task",
        editable: false,
        align: "left" as ColumnAlignment,
        width: 200,
        renderCell: (value, row) => (
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100">{value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 truncate">{(row as any).fromTaskTitle}</div>
            <div className="text-xs text-green-600 dark:text-green-400">📤 {(row as any).fromOutputTitle}</div>
          </div>
        ),
      },
      {
        field: "toTaskCode", 
        title: "Dependent Task",
        editable: false,
        align: "left" as ColumnAlignment,
        width: 200,
        renderCell: (value, row) => (
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100">{value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 truncate">{(row as any).toTaskTitle}</div>
            <div className="text-xs text-blue-600 dark:text-blue-400">📥 {(row as any).toInputTitle}</div>
          </div>
        ),
      },
      {
        field: "dependencyType",
        title: "Type",
        editable: false,
        align: "center" as ColumnAlignment,
        width: 120,
        renderCell: (value) => (
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 rounded-full text-xs font-medium">
            Output → Input
          </span>
        ),
      },
      {
        field: "actions",
        title: "Actions",
        editable: false,
        align: "center" as ColumnAlignment,
        width: 80,
        renderCell: (_, row) => (
          <div className="flex items-center justify-center">
            <button
              onClick={() => {
                // Remove the link by updating the task input
                const inputId = (row as any).id;
                const taskId = (row as any).toTaskId;
                // TODO: Implement unlinking - would need to update the task input to remove linkedTaskOutputId
              }}
              className="p-1 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded"
              aria-label="Remove dependency link"
              title="Remove dependency link"
            >
              <span className="text-xs">🔗💥</span>
            </button>
          </div>
        ),
      },
    ],
    [dispatch]
  );

  // Network visualization component
  const NetworkView = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Source Tasks (No Dependencies) */}
        <div className="space-y-3">
          <h3 className="font-semibold text-green-700 dark:text-green-400 flex items-center">
            <span className="mr-2">🟢</span>
            Can Start Immediately ({(state.tasks || []).filter(t => !dependencyAnalysis.blockedTasks.has(t.id)).length})
          </h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {(state.tasks || [])
              .filter(t => !dependencyAnalysis.blockedTasks.has(t.id))
              .map(task => {
                const stats = dependencyAnalysis.taskStats.get(task.id);
                return (
                  <div key={task.id} className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded">
                    <div className="font-medium text-sm">{task.code}</div>
                    <div className="text-gray-700 dark:text-gray-300 text-sm truncate">{task.title}</div>
                    {stats?.outgoingCount > 0 && (
                      <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                        Feeds → {stats.outgoingCount} task{stats.outgoingCount !== 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>

        {/* Dependent Tasks */}
        <div className="space-y-3">
          <h3 className="font-semibold text-blue-700 dark:text-blue-400 flex items-center">
            <span className="mr-2">🔵</span>
            Need Prerequisites ({dependencyAnalysis.blockedTasks.size})
          </h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {Array.from(dependencyAnalysis.blockedTasks).map(taskId => {
              const task = (state.tasks || []).find(t => t.id === taskId);
              const stats = dependencyAnalysis.taskStats.get(taskId);
              if (!task) return null;
              
              return (
                <div key={taskId} className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded">
                  <div className="font-medium text-sm">{task.code}</div>
                  <div className="text-gray-700 dark:text-gray-300 text-sm truncate">{task.title}</div>
                  <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    ← Depends on {stats?.incomingCount} task{stats?.incomingCount !== 1 ? 's' : ''}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dependency Links */}
        <div className="space-y-3">
          <h3 className="font-semibold text-purple-700 dark:text-purple-400 flex items-center">
            <span className="mr-2">🔗</span>
            Active Links ({allDependencies.length})
          </h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {allDependencies.map(dep => (
              <div key={dep.id} className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded">
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <span className="font-medium text-green-700 dark:text-green-400">{dep.fromTaskCode}</span>
                    <span className="mx-2 text-purple-600 dark:text-purple-400">→</span>
                    <span className="font-medium text-blue-700 dark:text-blue-400">{dep.toTaskCode}</span>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    📤 {dep.fromOutputTitle} → 📥 {dep.toInputTitle}
                  </div>
                  <button
                    onClick={() => {
                      // TODO: Implement unlinking functionality
                    }}
                    className="text-xs text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 px-2 py-1 rounded"
                  >
                    🔗💥 Remove link
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Timeline view showing dependency flow
  const TimelineView = () => {
    const sortedTasks = [...(state.tasks || [])].sort((a, b) => {
      // Sort by dependency order: tasks with no dependencies first
      const aBlocked = dependencyAnalysis.blockedTasks.has(a.id);
      const bBlocked = dependencyAnalysis.blockedTasks.has(b.id);
      if (aBlocked !== bBlocked) return aBlocked ? 1 : -1;
      return a.code.localeCompare(b.code);
    });

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="space-y-4">
          {sortedTasks.map((task, index) => {
            const stats = dependencyAnalysis.taskStats.get(task.id);
            const dependencies = allDependencies.filter(d => d.toTaskId === task.id);
            
            return (
              <div key={task.id} className="relative">
                {/* Task Card */}
                <div className={`p-4 rounded-lg border-2 ${
                  stats?.isBlocked && stats?.isBlocking
                    ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700'
                    : stats?.isBlocked
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700'
                    : stats?.isBlocking
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
                    : 'bg-gray-50 dark:bg-gray-900/20 border-gray-300 dark:border-gray-700'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-sm font-bold">{task.code}</span>
                      <span className="font-medium">{task.title}</span>
                      <div className="flex items-center space-x-2">
                        {stats?.isBlocked && (
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs">
                            📥 {stats.incomingCount} input{stats.incomingCount !== 1 ? 's' : ''}
                          </span>
                        )}
                        {stats?.isBlocking && (
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs">
                            📤 {stats.outgoingCount} output{stats.outgoingCount !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        task.status === 'DONE' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' :
                        task.status === 'IN_PROGRESS' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' :
                        task.status === 'BLOCKED' ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' :
                        'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300'
                      }`}>
                        {task.status}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {task.progress || 0}%
                      </span>
                    </div>
                  </div>
                  
                  {/* Show dependencies for this task */}
                  {dependencies.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Depends on:</div>
                      <div className="space-y-1">
                        {dependencies.map(dep => (
                          <div key={dep.id} className="flex items-center text-xs text-gray-700 dark:text-gray-300">
                            <span className="font-mono">{dep.fromTaskCode}</span>
                            <span className="mx-2">→</span>
                            <span className="truncate">{dep.fromOutputTitle}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Connection lines to next task */}
                {index < sortedTasks.length - 1 && (
                  <div className="flex justify-center py-2">
                    <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Task Dependencies ({allDependencies.length})
          </h2>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {dependencyAnalysis.tasksWithNoDependencies} can start now • {dependencyAnalysis.blockedTasks.size} need prerequisites • {dependencyAnalysis.blockingTasks.size} feed other tasks
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode("network")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === "network"
                  ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
            >
              🕸️ Network
            </button>
            <button
              onClick={() => setViewMode("timeline")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === "timeline"
                  ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
            >
              📅 Timeline
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === "table"
                  ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
            >
              📋 Table
            </button>
          </div>
        </div>
      </div>

      {/* Explanation Panel */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-4">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">📚 Understanding Dependencies</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-green-600 dark:text-green-400">🟢</span>
              <span className="font-medium">Can Start Now</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">Tasks with no dependencies that can begin immediately</p>
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-blue-600 dark:text-blue-400">🔵</span>
              <span className="font-medium">Need Prerequisites</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">Tasks waiting for outputs from other tasks to start</p>
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-yellow-600 dark:text-yellow-400">🟡</span>
              <span className="font-medium">Critical Path</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">Tasks that both depend on others AND block others - key bottlenecks</p>
          </div>
        </div>
      </div>

      {allDependencies.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-gray-500 dark:text-gray-400 text-xl">🔗</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No dependencies yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Dependencies are created by linking task outputs to inputs. Go to the Tasks view and:
          </p>
          <div className="text-left text-sm text-gray-600 dark:text-gray-400 space-y-2 max-w-md mx-auto">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-xs">1</span>
              <span>Add outputs to tasks that produce deliverables</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs">2</span>
              <span>Add inputs to tasks and link them to outputs from other tasks</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-xs">3</span>
              <span>Dependencies will automatically appear here</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Dependency Analytics Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                    {(state.tasks || []).filter(t => !dependencyAnalysis.blockedTasks.has(t.id)).length}
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-500">Can Start Now</div>
                </div>
                <span className="text-2xl">🟢</span>
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                    {dependencyAnalysis.blockedTasks.size}
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-500">Need Prerequisites</div>
                </div>
                <span className="text-2xl">🔵</span>
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                    {allDependencies.length}
                  </div>
                  <div className="text-sm text-purple-600 dark:text-purple-500">Active Links</div>
                </div>
                <span className="text-2xl">🔗</span>
              </div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
                    {Array.from(dependencyAnalysis.taskStats.values()).filter(s => s.isBlocked && s.isBlocking).length}
                  </div>
                  <div className="text-sm text-yellow-600 dark:text-yellow-500">Critical Path</div>
                </div>
                <span className="text-2xl">🟡</span>
              </div>
            </div>
          </div>

          {/* View Mode Content */}
          {viewMode === "network" && <NetworkView />}
          {viewMode === "timeline" && <TimelineView />}
          {viewMode === "table" && (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <ObjectSetTable
                data={allDependencies}
                columns={columns}
                onAdd={handleCreateDependency}
                onDelete={(dep) => handleDeleteDependency((dep as any).id)}
              />
            </div>
          )}
        </>
      )}

    </div>
  );
}