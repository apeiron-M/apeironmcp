import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Subgraph definition for WorkBreakdownStructure (work-breakdown-structure)
  """
  type TaskInput {
    id: OID!
    title: String!
    description: String
    type: TaskDataType!
    isRequired: Boolean!
    createdAt: DateTime!
  }

  type TaskOutput {
    id: OID!
    title: String!
    description: String
    type: TaskDataType!
    deliveryFormat: String
    createdAt: DateTime!
  }

  type WbsTask {
    id: OID!
    parentTaskId: OID
    code: String!
    title: String!
    summary: String
    description: String
    status: TaskStatus!
    priority: TaskPriority!
    progress: Int
    estimatedHours: Int
    actualHours: Int
    startDate: DateTime
    dueDate: DateTime
    inputs: [TaskInput!]!
    outputs: [TaskOutput!]!
    createdAt: DateTime!
    updatedAt: DateTime
  }

  type TeamMember {
    id: OID!
    name: String!
    email: String
    role: String
    avatar: String
    isActive: Boolean!
    joinedAt: DateTime!
  }

  enum TaskStatus {
    SCOPING
    TODO
    IN_PROGRESS
    REVIEW
    DONE
    BLOCKED
    CANCELLED
  }

  enum TaskPriority {
    LOW
    MEDIUM
    HIGH
    STRETCH
    CRITICAL
  }

  enum TaskDataType {
    DOCUMENT
    DATA
    CODE
    DESIGN
    APPROVAL
    FEEDBACK
    RESOURCE
    DELIVERABLE
  }

  type WorkBreakdownStructureState {
    id: OID!
    title: String
    description: String
    budget: Float
    timeline: String
    deliverableDescription: String
    tasks: [WbsTask!]!
    teamMembers: [TeamMember!]!
    createdAt: DateTime!
    updatedAt: DateTime
  }

  """
  Queries: WorkBreakdownStructure
  """
  type WorkBreakdownStructureQueries {
    getDocument(docId: PHID!, driveId: PHID): WorkBreakdownStructure
    getDocuments(driveId: String!): [WorkBreakdownStructure!]
  }

  type Query {
    WorkBreakdownStructure: WorkBreakdownStructureQueries
  }

  """
  Mutations: WorkBreakdownStructure
  """
  type Mutation {
    WorkBreakdownStructure_createDocument(
      name: String!
      driveId: String
    ): String

    WorkBreakdownStructure_createWbs(
      driveId: String
      docId: PHID
      input: WorkBreakdownStructure_CreateWbsInput
    ): Int
    WorkBreakdownStructure_updateWbsInfo(
      driveId: String
      docId: PHID
      input: WorkBreakdownStructure_UpdateWbsInfoInput
    ): Int
    WorkBreakdownStructure_createTask(
      driveId: String
      docId: PHID
      input: WorkBreakdownStructure_CreateTaskInput
    ): Int
    WorkBreakdownStructure_updateTask(
      driveId: String
      docId: PHID
      input: WorkBreakdownStructure_UpdateTaskInput
    ): Int
    WorkBreakdownStructure_moveTask(
      driveId: String
      docId: PHID
      input: WorkBreakdownStructure_MoveTaskInput
    ): Int
    WorkBreakdownStructure_deleteTask(
      driveId: String
      docId: PHID
      input: WorkBreakdownStructure_DeleteTaskInput
    ): Int
    WorkBreakdownStructure_addTaskInput(
      driveId: String
      docId: PHID
      input: WorkBreakdownStructure_AddTaskInputInput
    ): Int
    WorkBreakdownStructure_addTaskOutput(
      driveId: String
      docId: PHID
      input: WorkBreakdownStructure_AddTaskOutputInput
    ): Int
    WorkBreakdownStructure_removeTaskInput(
      driveId: String
      docId: PHID
      input: WorkBreakdownStructure_RemoveTaskInputInput
    ): Int
    WorkBreakdownStructure_removeTaskOutput(
      driveId: String
      docId: PHID
      input: WorkBreakdownStructure_RemoveTaskOutputInput
    ): Int
  }

  """
  Module: Core
  """
  input WorkBreakdownStructure_CreateWbsInput {
    id: OID!
    title: String!
    description: String
    budget: Float
    timeline: String
    deliverableDescription: String
    createdAt: DateTime!
  }
  input WorkBreakdownStructure_UpdateWbsInfoInput {
    title: String
    description: String
    budget: Float
    timeline: String
    deliverableDescription: String
    updatedAt: DateTime!
  }

  """
  Module: Tasks
  """
  input WorkBreakdownStructure_CreateTaskInput {
    id: OID!
    parentTaskId: OID
    code: String!
    title: String!
    summary: String
    description: String
    status: TaskStatus!
    priority: TaskPriority!
    estimatedHours: Int
    startDate: DateTime
    dueDate: DateTime
    createdAt: DateTime!
  }
  input WorkBreakdownStructure_UpdateTaskInput {
    taskId: OID!
    code: String
    title: String
    summary: String
    description: String
    status: TaskStatus
    priority: TaskPriority
    progress: Int
    estimatedHours: Int
    actualHours: Int
    startDate: DateTime
    dueDate: DateTime
    updatedAt: DateTime!
  }
  input WorkBreakdownStructure_MoveTaskInput {
    taskId: OID!
    newParentTaskId: OID
    updatedAt: DateTime!
  }
  input WorkBreakdownStructure_DeleteTaskInput {
    taskId: OID!
    updatedAt: DateTime!
  }

  """
  Module: TaskIo
  """
  input WorkBreakdownStructure_AddTaskInputInput {
    taskId: OID!
    id: OID!
    title: String!
    description: String
    type: TaskDataType!
    isRequired: Boolean
    createdAt: DateTime!
  }
  input WorkBreakdownStructure_AddTaskOutputInput {
    taskId: OID!
    id: OID!
    title: String!
    description: String
    type: TaskDataType!
    deliveryFormat: String
    createdAt: DateTime!
  }
  input WorkBreakdownStructure_RemoveTaskInputInput {
    taskId: OID!
    inputId: OID!
    updatedAt: DateTime!
  }
  input WorkBreakdownStructure_RemoveTaskOutputInput {
    taskId: OID!
    outputId: OID!
    updatedAt: DateTime!
  }
`;
