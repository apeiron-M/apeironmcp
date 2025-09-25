import type { PHDocument, BaseStateFromDocument } from "document-model";
import type { LegalStructureNeedsAssessmentState } from "./schema/types.js";
import type { LegalStructureNeedsAssessmentAction } from "./actions.js";

export { z } from "./schema/index.js";
export type * from "./schema/types.js";
type LegalStructureNeedsAssessmentLocalState = Record<PropertyKey, never>;
export type ExtendedLegalStructureNeedsAssessmentState =
  BaseStateFromDocument<LegalStructureNeedsAssessmentDocument>;
export type LegalStructureNeedsAssessmentDocument = PHDocument<
  LegalStructureNeedsAssessmentState,
  LegalStructureNeedsAssessmentLocalState
>;
export type {
  LegalStructureNeedsAssessmentState,
  LegalStructureNeedsAssessmentLocalState,
  LegalStructureNeedsAssessmentAction,
};
