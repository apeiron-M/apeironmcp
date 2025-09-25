/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import {
  z,
  type AddTeamMemberInput,
  type UpdateTeamMemberInput,
  type RemoveTeamMemberInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/team/creators.js";
import type { WorkBreakdownStructureDocument } from "../../gen/types.js";

describe("Team Operations", () => {
  let document: WorkBreakdownStructureDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle addTeamMember operation", () => {
    const input: AddTeamMemberInput = generateMock(
      z.AddTeamMemberInputSchema(),
    );

    const updatedDocument = reducer(document, creators.addTeamMember(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_TEAM_MEMBER",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle updateTeamMember operation", () => {
    const input: UpdateTeamMemberInput = generateMock(
      z.UpdateTeamMemberInputSchema(),
    );

    const updatedDocument = reducer(document, creators.updateTeamMember(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_TEAM_MEMBER",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle removeTeamMember operation", () => {
    const input: RemoveTeamMemberInput = generateMock(
      z.RemoveTeamMemberInputSchema(),
    );

    const updatedDocument = reducer(document, creators.removeTeamMember(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_TEAM_MEMBER",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
