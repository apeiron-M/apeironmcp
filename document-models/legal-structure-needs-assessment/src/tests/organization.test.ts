/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import {
  z,
  type SetOrganizationNameInput,
  type AddMultisigWalletInput,
  type AddExistingEntityInput,
  type AddContributorEntityInput,
  type AddContractEngagementInput,
  type AddFinancialToolInput,
  type SetComplianceInfoInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/organization/creators.js";
import type { LegalStructureNeedsAssessmentDocument } from "../../gen/types.js";

describe("Organization Operations", () => {
  let document: LegalStructureNeedsAssessmentDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle setOrganizationName operation", () => {
    const input: SetOrganizationNameInput = generateMock(
      z.SetOrganizationNameInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.setOrganizationName(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_ORGANIZATION_NAME",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle addMultisigWallet operation", () => {
    const input: AddMultisigWalletInput = generateMock(
      z.AddMultisigWalletInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.addMultisigWallet(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_MULTISIG_WALLET",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle addExistingEntity operation", () => {
    const input: AddExistingEntityInput = generateMock(
      z.AddExistingEntityInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.addExistingEntity(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_EXISTING_ENTITY",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle addContributorEntity operation", () => {
    const input: AddContributorEntityInput = generateMock(
      z.AddContributorEntityInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.addContributorEntity(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_CONTRIBUTOR_ENTITY",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle addContractEngagement operation", () => {
    const input: AddContractEngagementInput = generateMock(
      z.AddContractEngagementInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.addContractEngagement(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_CONTRACT_ENGAGEMENT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle addFinancialTool operation", () => {
    const input: AddFinancialToolInput = generateMock(
      z.AddFinancialToolInputSchema(),
    );

    const updatedDocument = reducer(document, creators.addFinancialTool(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_FINANCIAL_TOOL",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setComplianceInfo operation", () => {
    const input: SetComplianceInfoInput = generateMock(
      z.SetComplianceInfoInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.setComplianceInfo(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_COMPLIANCE_INFO",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
