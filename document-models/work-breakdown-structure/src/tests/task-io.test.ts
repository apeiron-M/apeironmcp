/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import {
  z,
  type AddTaskInputInput,
  type AddTaskOutputInput,
  type RemoveTaskInputInput,
  type RemoveTaskOutputInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/task-io/creators.js";
import type { WorkBreakdownStructureDocument } from "../../gen/types.js";

describe("TaskIo Operations", () => {
  let document: WorkBreakdownStructureDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle addTaskInput operation", () => {
    const input: AddTaskInputInput = generateMock(z.AddTaskInputInputSchema());

    const updatedDocument = reducer(document, creators.addTaskInput(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_TASK_INPUT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle addTaskOutput operation", () => {
    const input: AddTaskOutputInput = generateMock(
      z.AddTaskOutputInputSchema(),
    );

    const updatedDocument = reducer(document, creators.addTaskOutput(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_TASK_OUTPUT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle removeTaskInput operation", () => {
    const input: RemoveTaskInputInput = generateMock(
      z.RemoveTaskInputInputSchema(),
    );

    const updatedDocument = reducer(document, creators.removeTaskInput(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_TASK_INPUT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle removeTaskOutput operation", () => {
    const input: RemoveTaskOutputInput = generateMock(
      z.RemoveTaskOutputInputSchema(),
    );

    const updatedDocument = reducer(document, creators.removeTaskOutput(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_TASK_OUTPUT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
