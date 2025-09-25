import { type Subgraph } from "@powerhousedao/reactor-api";
import { addFile } from "document-drive";
import {
  actions,
  type CreateWbsInput,
  type UpdateWbsInfoInput,
  type CreateTaskInput,
  type UpdateTaskInput,
  type MoveTaskInput,
  type DeleteTaskInput,
  type AddTaskInputInput,
  type AddTaskOutputInput,
  type RemoveTaskInputInput,
  type RemoveTaskOutputInput,
} from "../../document-models/work-breakdown-structure/index.js";
import { setName } from "document-model";

export const getResolvers = (subgraph: Subgraph) => {
  const reactor = subgraph.reactor;

  return {
    Query: {
      WorkBreakdownStructure: async () => {
        return {
          getDocument: async (args: { docId: string; driveId: string }) => {
            const { docId, driveId } = args;

            if (!docId) {
              throw new Error("Document id is required");
            }

            if (driveId) {
              const docIds = await reactor.getDocuments(driveId);
              if (!docIds.includes(docId)) {
                throw new Error(
                  `Document with id ${docId} is not part of ${driveId}`,
                );
              }
            }

            const doc = await reactor.getDocument(docId);
            return {
              driveId: driveId,
              ...doc,
              ...doc.header,
              state: doc.state.global,
              stateJSON: doc.state.global,
              revision: doc.header?.revision?.global ?? 0,
            };
          },
          getDocuments: async (args: { driveId: string }) => {
            const { driveId } = args;
            const docsIds = await reactor.getDocuments(driveId);
            const docs = await Promise.all(
              docsIds.map(async (docId) => {
                const doc = await reactor.getDocument(docId);
                return {
                  driveId: driveId,
                  ...doc,
                  ...doc.header,
                  state: doc.state.global,
                  stateJSON: doc.state.global,
                  revision: doc.header?.revision?.global ?? 0,
                };
              }),
            );

            return docs.filter(
              (doc) => doc.header.documentType === "work-breakdown-structure",
            );
          },
        };
      },
    },
    Mutation: {
      WorkBreakdownStructure_createDocument: async (
        _: unknown,
        args: { name: string; driveId?: string },
      ) => {
        const { driveId, name } = args;
        const document = await reactor.addDocument("work-breakdown-structure");

        if (driveId) {
          await reactor.addAction(
            driveId,
            addFile({
              name,
              id: document.header.id,
              documentType: "work-breakdown-structure",
            }),
          );
        }

        if (name) {
          await reactor.addAction(document.header.id, setName(name));
        }

        return document.header.id;
      },

      WorkBreakdownStructure_createWbs: async (
        _: unknown,
        args: { docId: string; input: CreateWbsInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(docId, actions.createWbs(input));

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to createWbs");
        }

        return true;
      },

      WorkBreakdownStructure_updateWbsInfo: async (
        _: unknown,
        args: { docId: string; input: UpdateWbsInfoInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.updateWbsInfo(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to updateWbsInfo");
        }

        return true;
      },

      WorkBreakdownStructure_createTask: async (
        _: unknown,
        args: { docId: string; input: CreateTaskInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.createTask(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to createTask");
        }

        return true;
      },

      WorkBreakdownStructure_updateTask: async (
        _: unknown,
        args: { docId: string; input: UpdateTaskInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.updateTask(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to updateTask");
        }

        return true;
      },

      WorkBreakdownStructure_moveTask: async (
        _: unknown,
        args: { docId: string; input: MoveTaskInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(docId, actions.moveTask(input));

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to moveTask");
        }

        return true;
      },

      WorkBreakdownStructure_deleteTask: async (
        _: unknown,
        args: { docId: string; input: DeleteTaskInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.deleteTask(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to deleteTask");
        }

        return true;
      },

      WorkBreakdownStructure_addTaskInput: async (
        _: unknown,
        args: { docId: string; input: AddTaskInputInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addTaskInput(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to addTaskInput");
        }

        return true;
      },

      WorkBreakdownStructure_addTaskOutput: async (
        _: unknown,
        args: { docId: string; input: AddTaskOutputInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addTaskOutput(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to addTaskOutput");
        }

        return true;
      },

      WorkBreakdownStructure_removeTaskInput: async (
        _: unknown,
        args: { docId: string; input: RemoveTaskInputInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.removeTaskInput(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to removeTaskInput");
        }

        return true;
      },

      WorkBreakdownStructure_removeTaskOutput: async (
        _: unknown,
        args: { docId: string; input: RemoveTaskOutputInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.removeTaskOutput(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to removeTaskOutput",
          );
        }

        return true;
      },
    },
  };
};
