/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import {
  z,
  type CreateDeliverableInput,
  type UpdateDeliverableInput,
  type DeleteDeliverableInput,
  type AssignTasksToDeliverableInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/deliverables/creators.js";
import type { WorkBreakdownStructureDocument } from "../../gen/types.js";

describe("Deliverables Operations", () => {
  let document: WorkBreakdownStructureDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle createDeliverable operation", () => {
    const input: CreateDeliverableInput = generateMock(
      z.CreateDeliverableInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.createDeliverable(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "CREATE_DELIVERABLE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle updateDeliverable operation", () => {
    const input: UpdateDeliverableInput = generateMock(
      z.UpdateDeliverableInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.updateDeliverable(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_DELIVERABLE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle deleteDeliverable operation", () => {
    const input: DeleteDeliverableInput = generateMock(
      z.DeleteDeliverableInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.deleteDeliverable(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "DELETE_DELIVERABLE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle assignTasksToDeliverable operation", () => {
    const input: AssignTasksToDeliverableInput = generateMock(
      z.AssignTasksToDeliverableInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.assignTasksToDeliverable(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ASSIGN_TASKS_TO_DELIVERABLE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
