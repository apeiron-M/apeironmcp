import type { DocumentModelState } from "document-model";

export const documentModel: DocumentModelState = {
  author: {
    name: "Powerhouse",
    website: "https://www.powerhouse.inc/",
  },
  description:
    "A document model for creating and managing work breakdown structures with task inputs and outputs for deliverables",
  extension: "wbs",
  id: "work-breakdown-structure",
  name: "Work Breakdown Structure",
  specifications: [
    {
      changeLog: [],
      modules: [
        {
          description: "Core WBS operations",
          id: "core-module",
          name: "core",
          operations: [
            {
              description:
                "Create a new work breakdown structure for a deliverable",
              errors: [],
              examples: [],
              id: "create-wbs-op",
              name: "CREATE_WBS",
              reducer:
                "const newWBS = {\n  id: action.input.id,\n  title: action.input.title,\n  description: action.input.description || null,\n  deliverables: [],\n  tasks: [],\n  teamMembers: [],\n  createdAt: action.input.createdAt,\n  updatedAt: null\n};\n\nObject.assign(state, newWBS);",
              schema:
                "input CreateWbsInput {\n  id: OID!\n  title: String!\n  description: String\n  createdAt: DateTime!\n}",
              scope: "global",
              template:
                "Create a new work breakdown structure for a deliverable",
            },
            {
              description: "Update basic WBS and deliverable information",
              errors: [],
              examples: [],
              id: "update-wbs-info-op",
              name: "UPDATE_WBS_INFO",
              reducer:
                "if (action.input.title !== undefined) {\n  state.title = action.input.title;\n}\nif (action.input.description !== undefined) {\n  state.description = action.input.description;\n}\nstate.updatedAt = action.input.updatedAt;",
              schema:
                "input UpdateWbsInfoInput {\n  title: String\n  description: String\n  updatedAt: DateTime!\n}",
              scope: "global",
              template: "Update basic WBS and deliverable information",
            },
          ],
        },
        {
          description: "Task management operations",
          id: "tasks-module",
          name: "tasks",
          operations: [
            {
              description: "Create a new task with inputs and outputs",
              errors: [],
              examples: [],
              id: "create-task-op",
              name: "CREATE_TASK",
              reducer:
                "const newTask = {\n  id: action.input.id,\n  deliverableId: action.input.deliverableId || null,\n  parentTaskId: action.input.parentTaskId || null,\n  ownerId: action.input.ownerId || null,\n  code: action.input.code,\n  title: action.input.title,\n  summary: action.input.summary || null,\n  description: action.input.description || null,\n  status: action.input.status,\n  priority: action.input.priority,\n  progress: 0,\n  estimatedHours: action.input.estimatedHours || null,\n  actualHours: null,\n  startDate: action.input.startDate || null,\n  dueDate: action.input.dueDate || null,\n  inputs: [],\n  outputs: [],\n  createdAt: action.input.createdAt,\n  updatedAt: null\n};\n\nstate.tasks.push(newTask);\nstate.updatedAt = action.input.createdAt;",
              schema:
                "input CreateTaskInput {\n  id: OID!\n  deliverableId: OID\n  parentTaskId: OID\n  ownerId: OID\n  code: String!\n  title: String!\n  summary: String\n  description: String\n  status: TaskStatus!\n  priority: TaskPriority!\n  estimatedHours: Int\n  startDate: DateTime\n  dueDate: DateTime\n  createdAt: DateTime!\n}",
              scope: "global",
              template: "Create a new task with inputs and outputs",
            },
            {
              description: "Update task information",
              errors: [
                {
                  code: "TASK_NOT_FOUND",
                  description: "Task with the specified ID was not found",
                  id: "task-not-found-update",
                  name: "TaskNotFoundError",
                  template: "",
                },
              ],
              examples: [],
              id: "update-task-op",
              name: "UPDATE_TASK",
              reducer:
                'const taskIndex = state.tasks.findIndex(task => task.id === action.input.taskId);\n\nif (taskIndex === -1) {\n  throw new TaskNotFoundError(`Task with ID ${action.input.taskId} not found`);\n}\n\nconst task = state.tasks[taskIndex];\n\nif (action.input.deliverableId !== undefined) task.deliverableId = action.input.deliverableId;\nif (action.input.ownerId !== undefined) task.ownerId = action.input.ownerId;\nif (action.input.code !== undefined) task.code = action.input.code || "";\nif (action.input.title !== undefined) task.title = action.input.title || "";\nif (action.input.summary !== undefined) task.summary = action.input.summary;\nif (action.input.description !== undefined) task.description = action.input.description;\nif (action.input.status !== undefined && action.input.status !== null) task.status = action.input.status;\nif (action.input.priority !== undefined && action.input.priority !== null) task.priority = action.input.priority;\nif (action.input.progress !== undefined) task.progress = action.input.progress;\nif (action.input.estimatedHours !== undefined) task.estimatedHours = action.input.estimatedHours;\nif (action.input.actualHours !== undefined) task.actualHours = action.input.actualHours;\nif (action.input.startDate !== undefined) task.startDate = action.input.startDate;\nif (action.input.dueDate !== undefined) task.dueDate = action.input.dueDate;\n\ntask.updatedAt = action.input.updatedAt;\nstate.updatedAt = action.input.updatedAt;',
              schema:
                "input UpdateTaskInput {\n  taskId: OID!\n  deliverableId: OID\n  ownerId: OID\n  code: String\n  title: String\n  summary: String\n  description: String\n  status: TaskStatus\n  priority: TaskPriority\n  progress: Int\n  estimatedHours: Int\n  actualHours: Int\n  startDate: DateTime\n  dueDate: DateTime\n  updatedAt: DateTime!\n}",
              scope: "global",
              template: "Update task information",
            },
            {
              description:
                "Move task to different parent or make it a root task",
              errors: [
                {
                  code: "TASK_NOT_FOUND",
                  description: "Task with the specified ID was not found",
                  id: "task-not-found-move",
                  name: "TaskNotFoundError",
                  template: "",
                },
                {
                  code: "PARENT_TASK_NOT_FOUND",
                  description:
                    "Parent task with the specified ID was not found",
                  id: "parent-task-not-found",
                  name: "ParentTaskNotFoundError",
                  template: "",
                },
                {
                  code: "CIRCULAR_DEPENDENCY",
                  description: "Cannot make a task its own descendant",
                  id: "circular-dependency",
                  name: "CircularDependencyError",
                  template: "",
                },
              ],
              examples: [],
              id: "move-task-op",
              name: "MOVE_TASK",
              reducer:
                "const taskIndex = state.tasks.findIndex(task => task.id === action.input.taskId);\n\nif (taskIndex === -1) {\n  throw new TaskNotFoundError(`Task with ID ${action.input.taskId} not found`);\n}\n\n// Check if new parent exists (if specified)\nif (action.input.newParentTaskId) {\n  const parentExists = state.tasks.some(task => task.id === action.input.newParentTaskId);\n  if (!parentExists) {\n    throw new ParentTaskNotFoundError(`Parent task with ID ${action.input.newParentTaskId} not found`);\n  }\n  \n  // Check for circular dependency (task cannot be ancestor of new parent)\n  const isCircular = (parentId, targetId) => {\n    if (parentId === targetId) return true;\n    const parent = state.tasks.find(t => t.id === parentId);\n    return parent && parent.parentTaskId && isCircular(parent.parentTaskId, targetId);\n  };\n  \n  if (isCircular(action.input.newParentTaskId, action.input.taskId)) {\n    throw new CircularDependencyError('Cannot create circular dependency in task hierarchy');\n  }\n}\n\nstate.tasks[taskIndex].parentTaskId = action.input.newParentTaskId || null;\nstate.tasks[taskIndex].updatedAt = action.input.updatedAt;\nstate.updatedAt = action.input.updatedAt;",
              schema:
                "input MoveTaskInput {\n  taskId: OID!\n  newParentTaskId: OID\n  updatedAt: DateTime!\n}",
              scope: "global",
              template: "Move task to different parent",
            },
            {
              description: "Delete a task and all its subtasks",
              errors: [
                {
                  code: "TASK_NOT_FOUND",
                  description: "Task with the specified ID was not found",
                  id: "task-not-found-delete",
                  name: "TaskNotFoundError",
                  template: "",
                },
              ],
              examples: [],
              id: "delete-task-op",
              name: "DELETE_TASK",
              reducer:
                "const taskIndex = state.tasks.findIndex(task => task.id === action.input.taskId);\n\nif (taskIndex === -1) {\n  throw new TaskNotFoundError(`Task with ID ${action.input.taskId} not found`);\n}\n\n// Recursively collect all descendant task IDs\nconst getDescendantIds = (parentId) => {\n  const children = state.tasks.filter(task => task.parentTaskId === parentId);\n  let descendants = children.map(child => child.id);\n  children.forEach(child => {\n    descendants = descendants.concat(getDescendantIds(child.id));\n  });\n  return descendants;\n};\n\nconst taskId = action.input.taskId;\nconst descendantIds = getDescendantIds(taskId);\nconst allIdsToDelete = [taskId, ...descendantIds];\n\n// Remove all tasks (parent and descendants)\nstate.tasks = state.tasks.filter(task => !allIdsToDelete.includes(task.id));\nstate.updatedAt = action.input.updatedAt;",
              schema:
                "input DeleteTaskInput {\n  taskId: OID!\n  updatedAt: DateTime!\n}",
              scope: "global",
              template: "Delete task and subtasks",
            },
          ],
        },
        {
          description: "Task input and output management",
          id: "task-io-module",
          name: "taskIO",
          operations: [
            {
              description: "Add an input/dependency to a task",
              errors: [
                {
                  code: "TASK_NOT_FOUND",
                  description: "Task with the specified ID was not found",
                  id: "task-not-found-add-input",
                  name: "TaskNotFoundError",
                  template: "",
                },
              ],
              examples: [],
              id: "add-task-input-op",
              name: "ADD_TASK_INPUT",
              reducer:
                "const taskIndex = state.tasks.findIndex(task => task.id === action.input.taskId);\n\nif (taskIndex === -1) {\n  throw new TaskNotFoundError(`Task with ID ${action.input.taskId} not found`);\n}\n\nconst newInput = {\n  id: action.input.id,\n  title: action.input.title,\n  description: action.input.description || null,\n  type: action.input.type,\n  isRequired: action.input.isRequired || false,\n  linkedTaskOutputId: action.input.linkedTaskOutputId || null,\n  createdAt: action.input.createdAt\n};\n\nstate.tasks[taskIndex].inputs.push(newInput);\nstate.updatedAt = action.input.createdAt;",
              schema:
                "input AddTaskInputInput {\n  taskId: OID!\n  id: OID!\n  title: String!\n  description: String\n  type: TaskDataType!\n  isRequired: Boolean\n  linkedTaskOutputId: OID\n  createdAt: DateTime!\n}",
              scope: "global",
              template: "Add input/dependency to task",
            },
            {
              description: "Add an output/result to a task",
              errors: [
                {
                  code: "TASK_NOT_FOUND",
                  description: "Task with the specified ID was not found",
                  id: "task-not-found-add-output",
                  name: "TaskNotFoundError",
                  template: "",
                },
              ],
              examples: [],
              id: "add-task-output-op",
              name: "ADD_TASK_OUTPUT",
              reducer:
                "const taskIndex = state.tasks.findIndex(task => task.id === action.input.taskId);\n\nif (taskIndex === -1) {\n  throw new TaskNotFoundError(`Task with ID ${action.input.taskId} not found`);\n}\n\nconst newOutput = {\n  id: action.input.id,\n  title: action.input.title,\n  description: action.input.description || null,\n  type: action.input.type,\n  deliveryFormat: action.input.deliveryFormat || null,\n  createdAt: action.input.createdAt\n};\n\nstate.tasks[taskIndex].outputs.push(newOutput);\nstate.updatedAt = action.input.createdAt;",
              schema:
                "input AddTaskOutputInput {\n  taskId: OID!\n  id: OID!\n  title: String!\n  description: String\n  type: TaskDataType!\n  deliveryFormat: String\n  createdAt: DateTime!\n}",
              scope: "global",
              template: "Add output/result to task",
            },
            {
              description: "Remove an input from a task",
              errors: [
                {
                  code: "TASK_NOT_FOUND",
                  description: "Task with the specified ID was not found",
                  id: "task-not-found-remove-input",
                  name: "TaskNotFoundError",
                  template: "",
                },
                {
                  code: "INPUT_NOT_FOUND",
                  description: "Input with the specified ID was not found",
                  id: "input-not-found",
                  name: "InputNotFoundError",
                  template: "",
                },
              ],
              examples: [],
              id: "remove-task-input-op",
              name: "REMOVE_TASK_INPUT",
              reducer:
                "const taskIndex = state.tasks.findIndex(task => task.id === action.input.taskId);\n\nif (taskIndex === -1) {\n  throw new TaskNotFoundError(`Task with ID ${action.input.taskId} not found`);\n}\n\nconst task = state.tasks[taskIndex];\nconst inputIndex = task.inputs.findIndex(input => input.id === action.input.inputId);\n\nif (inputIndex === -1) {\n  throw new InputNotFoundError(`Input with ID ${action.input.inputId} not found`);\n}\n\ntask.inputs.splice(inputIndex, 1);\nstate.updatedAt = action.input.updatedAt;",
              schema:
                "input RemoveTaskInputInput {\n  taskId: OID!\n  inputId: OID!\n  updatedAt: DateTime!\n}",
              scope: "global",
              template: "Remove input from task",
            },
            {
              description: "Remove an output from a task",
              errors: [
                {
                  code: "TASK_NOT_FOUND",
                  description: "Task with the specified ID was not found",
                  id: "task-not-found-remove-output",
                  name: "TaskNotFoundError",
                  template: "",
                },
                {
                  code: "OUTPUT_NOT_FOUND",
                  description: "Output with the specified ID was not found",
                  id: "output-not-found",
                  name: "OutputNotFoundError",
                  template: "",
                },
              ],
              examples: [],
              id: "remove-task-output-op",
              name: "REMOVE_TASK_OUTPUT",
              reducer:
                "const taskIndex = state.tasks.findIndex(task => task.id === action.input.taskId);\n\nif (taskIndex === -1) {\n  throw new TaskNotFoundError(`Task with ID ${action.input.taskId} not found`);\n}\n\nconst task = state.tasks[taskIndex];\nconst outputIndex = task.outputs.findIndex(output => output.id === action.input.outputId);\n\nif (outputIndex === -1) {\n  throw new OutputNotFoundError(`Output with ID ${action.input.outputId} not found`);\n}\n\ntask.outputs.splice(outputIndex, 1);\nstate.updatedAt = action.input.updatedAt;",
              schema:
                "input RemoveTaskOutputInput {\n  taskId: OID!\n  outputId: OID!\n  updatedAt: DateTime!\n}",
              scope: "global",
              template: "Remove output from task",
            },
          ],
        },
        {
          description: "Team member management operations",
          id: "team-module",
          name: "team",
          operations: [
            {
              description: "Add a new team member to the WBS",
              errors: [],
              examples: [],
              id: "add-team-member-op",
              name: "ADD_TEAM_MEMBER",
              reducer:
                "const newMember = {\n  id: action.input.id,\n  name: action.input.name,\n  email: action.input.email || null,\n  role: action.input.role || null,\n  avatar: action.input.avatar || null,\n  isActive: true,\n  joinedAt: action.input.joinedAt\n};\n\nstate.teamMembers.push(newMember);\nstate.updatedAt = action.input.joinedAt;",
              schema:
                "input AddTeamMemberInput {\n  id: OID!\n  name: String!\n  email: String\n  role: String\n  avatar: String\n  joinedAt: DateTime!\n}",
              scope: "global",
              template: "Add a new team member",
            },
            {
              description: "Update team member information",
              errors: [
                {
                  code: "MEMBER_NOT_FOUND",
                  description:
                    "Team member with the specified ID was not found",
                  id: "member-not-found-update",
                  name: "MemberNotFoundError",
                  template: "",
                },
              ],
              examples: [],
              id: "update-team-member-op",
              name: "UPDATE_TEAM_MEMBER",
              reducer:
                'const memberIndex = state.teamMembers.findIndex(member => member.id === action.input.memberId);\n\nif (memberIndex === -1) {\n  throw new MemberNotFoundError(`Team member with ID ${action.input.memberId} not found`);\n}\n\nconst member = state.teamMembers[memberIndex];\n\nif (action.input.name !== undefined) member.name = action.input.name || "";\nif (action.input.email !== undefined) member.email = action.input.email;\nif (action.input.role !== undefined) member.role = action.input.role;\nif (action.input.avatar !== undefined) member.avatar = action.input.avatar;\nif (action.input.isActive !== undefined) member.isActive = action.input.isActive;\n\nstate.updatedAt = action.input.updatedAt;',
              schema:
                "input UpdateTeamMemberInput {\n  memberId: OID!\n  name: String\n  email: String\n  role: String\n  avatar: String\n  isActive: Boolean\n  updatedAt: DateTime!\n}",
              scope: "global",
              template: "Update team member information",
            },
            {
              description: "Remove a team member from the WBS",
              errors: [
                {
                  code: "MEMBER_NOT_FOUND",
                  description:
                    "Team member with the specified ID was not found",
                  id: "member-not-found-remove",
                  name: "MemberNotFoundError",
                  template: "",
                },
              ],
              examples: [],
              id: "remove-team-member-op",
              name: "REMOVE_TEAM_MEMBER",
              reducer:
                "const memberIndex = state.teamMembers.findIndex(member => member.id === action.input.memberId);\n\nif (memberIndex === -1) {\n  throw new MemberNotFoundError(`Team member with ID ${action.input.memberId} not found`);\n}\n\nstate.teamMembers.splice(memberIndex, 1);\nstate.updatedAt = action.input.updatedAt;",
              schema:
                "input RemoveTeamMemberInput {\n  memberId: OID!\n  updatedAt: DateTime!\n}",
              scope: "global",
              template: "Remove team member",
            },
          ],
        },
        {
          description: "Deliverable management operations",
          id: "deliverables-module",
          name: "deliverables",
          operations: [
            {
              description: "Create a new deliverable to group tasks",
              errors: [],
              examples: [],
              id: "create-deliverable-op",
              name: "CREATE_DELIVERABLE",
              reducer:
                "const newDeliverable = {\n  id: action.input.id,\n  title: action.input.title,\n  description: action.input.description || null,\n  timeline: action.input.timeline || null,\n  status: action.input.status,\n  createdAt: action.input.createdAt,\n  updatedAt: null\n};\n\nstate.deliverables.push(newDeliverable);\nstate.updatedAt = action.input.createdAt;",
              schema:
                "input CreateDeliverableInput {\n  id: OID!\n  title: String!\n  description: String\n  timeline: String\n  status: DeliverableStatus!\n  createdAt: DateTime!\n}",
              scope: "global",
              template: "Create a new deliverable",
            },
            {
              description: "Update deliverable information",
              errors: [
                {
                  code: "DELIVERABLE_NOT_FOUND",
                  description:
                    "Deliverable with the specified ID was not found",
                  id: "deliverable-not-found",
                  name: "DeliverableNotFoundError",
                  template: "",
                },
              ],
              examples: [],
              id: "update-deliverable-op",
              name: "UPDATE_DELIVERABLE",
              reducer:
                "const deliverableIndex = state.deliverables.findIndex(deliverable => deliverable.id === action.input.deliverableId);\n\nif (deliverableIndex === -1) {\n  throw new DeliverableNotFoundError(`Deliverable with ID ${action.input.deliverableId} not found`);\n}\n\nconst deliverable = state.deliverables[deliverableIndex];\n\nif (action.input.title !== undefined) deliverable.title = action.input.title;\nif (action.input.description !== undefined) deliverable.description = action.input.description;\nif (action.input.timeline !== undefined) deliverable.timeline = action.input.timeline;\nif (action.input.status !== undefined && action.input.status !== null) deliverable.status = action.input.status;\n\ndeliverable.updatedAt = action.input.updatedAt;\nstate.updatedAt = action.input.updatedAt;",
              schema:
                "input UpdateDeliverableInput {\n  deliverableId: OID!\n  title: String\n  description: String\n  timeline: String\n  status: DeliverableStatus\n  updatedAt: DateTime!\n}",
              scope: "global",
              template: "Update deliverable information",
            },
            {
              description: "Delete a deliverable and unassign its tasks",
              errors: [
                {
                  code: "DELIVERABLE_NOT_FOUND",
                  description:
                    "Deliverable with the specified ID was not found",
                  id: "deliverable-not-found-delete",
                  name: "DeliverableNotFoundError",
                  template: "",
                },
              ],
              examples: [],
              id: "delete-deliverable-op",
              name: "DELETE_DELIVERABLE",
              reducer:
                "const deliverableIndex = state.deliverables.findIndex(deliverable => deliverable.id === action.input.deliverableId);\n\nif (deliverableIndex === -1) {\n  throw new DeliverableNotFoundError(`Deliverable with ID ${action.input.deliverableId} not found`);\n}\n\n// Unassign all tasks from this deliverable\nstate.tasks.forEach(task => {\n  if (task.deliverableId === action.input.deliverableId) {\n    task.deliverableId = null;\n  }\n});\n\n// Remove the deliverable\nstate.deliverables.splice(deliverableIndex, 1);\nstate.updatedAt = action.input.updatedAt;",
              schema:
                "input DeleteDeliverableInput {\n  deliverableId: OID!\n  updatedAt: DateTime!\n}",
              scope: "global",
              template: "Delete deliverable",
            },
            {
              description: "Assign tasks to a deliverable",
              errors: [
                {
                  code: "DELIVERABLE_NOT_FOUND",
                  description:
                    "Deliverable with the specified ID was not found",
                  id: "deliverable-not-found-assign",
                  name: "DeliverableNotFoundError",
                  template: "",
                },
                {
                  code: "TASK_NOT_FOUND",
                  description:
                    "One or more tasks with the specified IDs were not found",
                  id: "task-not-found-assign",
                  name: "TaskNotFoundError",
                  template: "",
                },
              ],
              examples: [],
              id: "assign-tasks-to-deliverable-op",
              name: "ASSIGN_TASKS_TO_DELIVERABLE",
              reducer:
                "const deliverableExists = state.deliverables.some(deliverable => deliverable.id === action.input.deliverableId);\n\nif (!deliverableExists) {\n  throw new DeliverableNotFoundError(`Deliverable with ID ${action.input.deliverableId} not found`);\n}\n\n// Verify all tasks exist\nfor (const taskId of action.input.taskIds) {\n  const taskExists = state.tasks.some(task => task.id === taskId);\n  if (!taskExists) {\n    throw new TaskNotFoundError(`Task with ID ${taskId} not found`);\n  }\n}\n\n// Assign tasks to deliverable\nstate.tasks.forEach(task => {\n  if (action.input.taskIds.includes(task.id)) {\n    task.deliverableId = action.input.deliverableId;\n    task.updatedAt = action.input.updatedAt;\n  }\n});\n\nstate.updatedAt = action.input.updatedAt;",
              schema:
                "input AssignTasksToDeliverableInput {\n  deliverableId: OID!\n  taskIds: [OID!]!\n  updatedAt: DateTime!\n}",
              scope: "global",
              template: "Assign tasks to deliverable",
            },
          ],
        },
      ],
      state: {
        global: {
          examples: [],
          initialValue:
            '"{\\n  \\"id\\": \\"\\",\\n  \\"title\\": \\"\\",\\n  \\"description\\": \\"\\",\\n  \\"deliverables\\": [],\\n  \\"tasks\\": [],\\n  \\"teamMembers\\": [],\\n  \\"createdAt\\": \\"\\",\\n  \\"updatedAt\\": null\\n}"',
          schema:
            "type TaskInput {\n  id: OID!\n  title: String!\n  description: String\n  type: TaskDataType!\n  isRequired: Boolean!\n  linkedTaskOutputId: OID\n  createdAt: DateTime!\n}\n\ntype TaskOutput {\n  id: OID!\n  title: String!\n  description: String\n  type: TaskDataType!\n  deliveryFormat: String\n  createdAt: DateTime!\n}\n\ntype WbsTask {\n  id: OID!\n  deliverableId: OID\n  parentTaskId: OID\n  ownerId: OID\n  code: String!\n  title: String!\n  summary: String\n  description: String\n  status: TaskStatus!\n  priority: TaskPriority!\n  progress: Int\n  estimatedHours: Int\n  actualHours: Int\n  startDate: DateTime\n  dueDate: DateTime\n  inputs: [TaskInput!]!\n  outputs: [TaskOutput!]!\n  createdAt: DateTime!\n  updatedAt: DateTime\n}\n\ntype TeamMember {\n  id: OID!\n  name: String!\n  email: String\n  role: String\n  avatar: String\n  isActive: Boolean!\n  joinedAt: DateTime!\n}\n\nenum TaskStatus {\n  SCOPING\n  TODO\n  IN_PROGRESS\n  REVIEW\n  DONE\n  BLOCKED\n  CANCELLED\n}\n\nenum TaskPriority {\n  LOW\n  MEDIUM\n  HIGH\n  STRETCH\n  CRITICAL\n}\n\nenum TaskDataType {\n  DOCUMENT\n  DATA\n  CODE\n  DESIGN\n  APPROVAL\n  FEEDBACK\n  RESOURCE\n  DELIVERABLE\n}\n\ntype Deliverable {\n  id: OID!\n  title: String!\n  description: String\n  timeline: String\n  status: DeliverableStatus!\n  createdAt: DateTime!\n  updatedAt: DateTime\n}\n\nenum DeliverableStatus {\n  PLANNING\n  IN_PROGRESS\n  REVIEW\n  COMPLETED\n  CANCELLED\n}\n\ntype WorkBreakdownStructureState {\n  id: OID!\n  title: String\n  description: String\n  deliverables: [Deliverable!]!\n  tasks: [WbsTask!]!\n  teamMembers: [TeamMember!]!\n  createdAt: DateTime!\n  updatedAt: DateTime\n}",
        },
        local: {
          examples: [],
          initialValue: '"{}"',
          schema: "",
        },
      },
      version: 1,
    },
  ],
};
