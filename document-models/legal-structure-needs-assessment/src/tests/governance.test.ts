/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import { z, type SetGovernanceFrameworkInput } from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/governance/creators.js";
import type { LegalStructureNeedsAssessmentDocument } from "../../gen/types.js";

describe("Governance Operations", () => {
  let document: LegalStructureNeedsAssessmentDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle setGovernanceFramework operation", () => {
    const input: SetGovernanceFrameworkInput = generateMock(
      z.SetGovernanceFrameworkInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.setGovernanceFramework(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_GOVERNANCE_FRAMEWORK",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
