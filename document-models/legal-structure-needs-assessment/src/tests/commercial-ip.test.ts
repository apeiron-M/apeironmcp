/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import {
  z,
  type AddCommercialActivityInput,
  type AddIpAssetInput,
  type SetIpManagementInput,
  type AddFundraisingActivityInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/commercial-ip/creators.js";
import type { LegalStructureNeedsAssessmentDocument } from "../../gen/types.js";

describe("CommercialIp Operations", () => {
  let document: LegalStructureNeedsAssessmentDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle addCommercialActivity operation", () => {
    const input: AddCommercialActivityInput = generateMock(
      z.AddCommercialActivityInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.addCommercialActivity(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_COMMERCIAL_ACTIVITY",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle addIpAsset operation", () => {
    const input: AddIpAssetInput = generateMock(z.AddIpAssetInputSchema());

    const updatedDocument = reducer(document, creators.addIpAsset(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_IP_ASSET",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setIpManagement operation", () => {
    const input: SetIpManagementInput = generateMock(
      z.SetIpManagementInputSchema(),
    );

    const updatedDocument = reducer(document, creators.setIpManagement(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_IP_MANAGEMENT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle addFundraisingActivity operation", () => {
    const input: AddFundraisingActivityInput = generateMock(
      z.AddFundraisingActivityInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.addFundraisingActivity(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_FUNDRAISING_ACTIVITY",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
