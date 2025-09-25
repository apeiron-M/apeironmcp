import type { LegalStructureNeedsAssessmentOrganizationAction } from "./organization/actions.js";
import type { LegalStructureNeedsAssessmentStrategicGoalsAction } from "./strategic-goals/actions.js";
import type { LegalStructureNeedsAssessmentOperationalNeedsAction } from "./operational-needs/actions.js";
import type { LegalStructureNeedsAssessmentCommercialIpAction } from "./commercial-ip/actions.js";
import type { LegalStructureNeedsAssessmentGovernanceAction } from "./governance/actions.js";
import type { LegalStructureNeedsAssessmentAssessmentAction } from "./assessment/actions.js";

export * from "./organization/actions.js";
export * from "./strategic-goals/actions.js";
export * from "./operational-needs/actions.js";
export * from "./commercial-ip/actions.js";
export * from "./governance/actions.js";
export * from "./assessment/actions.js";

export type LegalStructureNeedsAssessmentAction =
  | LegalStructureNeedsAssessmentOrganizationAction
  | LegalStructureNeedsAssessmentStrategicGoalsAction
  | LegalStructureNeedsAssessmentOperationalNeedsAction
  | LegalStructureNeedsAssessmentCommercialIpAction
  | LegalStructureNeedsAssessmentGovernanceAction
  | LegalStructureNeedsAssessmentAssessmentAction;
