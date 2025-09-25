/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import {
  z,
  type CalculateSuitabilityInput,
  type GenerateRecommendationsInput,
  type CompleteAssessmentInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/assessment/creators.js";
import type { LegalStructureNeedsAssessmentDocument } from "../../gen/types.js";

describe("Assessment Operations", () => {
  let document: LegalStructureNeedsAssessmentDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle calculateSuitability operation", () => {
    const input: CalculateSuitabilityInput = generateMock(
      z.CalculateSuitabilityInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.calculateSuitability(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "CALCULATE_SUITABILITY",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle generateRecommendations operation", () => {
    const input: GenerateRecommendationsInput = generateMock(
      z.GenerateRecommendationsInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.generateRecommendations(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "GENERATE_RECOMMENDATIONS",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle completeAssessment operation", () => {
    const input: CompleteAssessmentInput = generateMock(
      z.CompleteAssessmentInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.completeAssessment(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "COMPLETE_ASSESSMENT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
