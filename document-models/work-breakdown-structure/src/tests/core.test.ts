/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import {
  z,
  type CreateWbsInput,
  type UpdateWbsInfoInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/core/creators.js";
import type { WorkBreakdownStructureDocument } from "../../gen/types.js";

describe("Core Operations", () => {
  let document: WorkBreakdownStructureDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle createWbs operation", () => {
    const input: CreateWbsInput = generateMock(z.CreateWbsInputSchema());

    const updatedDocument = reducer(document, creators.createWbs(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("CREATE_WBS");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle updateWbsInfo operation", () => {
    const input: UpdateWbsInfoInput = generateMock(
      z.UpdateWbsInfoInputSchema(),
    );

    const updatedDocument = reducer(document, creators.updateWbsInfo(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_WBS_INFO",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
