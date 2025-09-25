/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import {
  z,
  type SetDecentralizationCriteriaInput,
  type SetNonprofitPurposeInput,
  type SetNonprofitIndicatorsInput,
  type CalculateNonprofitScoreInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/strategic-goals/creators.js";
import type { LegalStructureNeedsAssessmentDocument } from "../../gen/types.js";

describe("StrategicGoals Operations", () => {
  let document: LegalStructureNeedsAssessmentDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle setDecentralizationCriteria operation", () => {
    const input: SetDecentralizationCriteriaInput = generateMock(
      z.SetDecentralizationCriteriaInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.setDecentralizationCriteria(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_DECENTRALIZATION_CRITERIA",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setNonprofitPurpose operation", () => {
    const input: SetNonprofitPurposeInput = generateMock(
      z.SetNonprofitPurposeInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.setNonprofitPurpose(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_NONPROFIT_PURPOSE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setNonprofitIndicators operation", () => {
    const input: SetNonprofitIndicatorsInput = generateMock(
      z.SetNonprofitIndicatorsInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.setNonprofitIndicators(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_NONPROFIT_INDICATORS",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle calculateNonprofitScore operation", () => {
    const input: CalculateNonprofitScoreInput = generateMock(
      z.CalculateNonprofitScoreInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.calculateNonprofitScore(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "CALCULATE_NONPROFIT_SCORE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
