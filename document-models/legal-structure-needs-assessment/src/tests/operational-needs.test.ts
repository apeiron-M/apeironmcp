/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import {
  z,
  type AddOperationalActivityInput,
  type AddPaymentRequirementInput,
  type SetContributorJurisdictionsInput,
  type SetFinancialInfrastructureInput,
  type SetFinancialMetricsInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/operational-needs/creators.js";
import type { LegalStructureNeedsAssessmentDocument } from "../../gen/types.js";

describe("OperationalNeeds Operations", () => {
  let document: LegalStructureNeedsAssessmentDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle addOperationalActivity operation", () => {
    const input: AddOperationalActivityInput = generateMock(
      z.AddOperationalActivityInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.addOperationalActivity(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_OPERATIONAL_ACTIVITY",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle addPaymentRequirement operation", () => {
    const input: AddPaymentRequirementInput = generateMock(
      z.AddPaymentRequirementInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.addPaymentRequirement(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_PAYMENT_REQUIREMENT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setContributorJurisdictions operation", () => {
    const input: SetContributorJurisdictionsInput = generateMock(
      z.SetContributorJurisdictionsInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.setContributorJurisdictions(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_CONTRIBUTOR_JURISDICTIONS",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setFinancialInfrastructure operation", () => {
    const input: SetFinancialInfrastructureInput = generateMock(
      z.SetFinancialInfrastructureInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.setFinancialInfrastructure(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_FINANCIAL_INFRASTRUCTURE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setFinancialMetrics operation", () => {
    const input: SetFinancialMetricsInput = generateMock(
      z.SetFinancialMetricsInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.setFinancialMetrics(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_FINANCIAL_METRICS",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
