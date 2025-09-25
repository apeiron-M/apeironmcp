/**
 * Factory methods for creating LegalStructureNeedsAssessmentDocument instances
 */

import {
  createBaseState,
  defaultBaseState,
  type PHAuthState,
  type PHDocumentState,
  type PHBaseState,
} from "document-model";
import type {
  LegalStructureNeedsAssessmentDocument,
  LegalStructureNeedsAssessmentLocalState,
  LegalStructureNeedsAssessmentState,
} from "./gen/types.js";
import { createDocument } from "./gen/utils.js";

export function defaultGlobalState(): LegalStructureNeedsAssessmentState {
  return {
    organizationInfo: {
      name: null,
      multisigWallets: [],
      existingEntities: [],
      contributorEntities: [],
      contracts: [],
      financialTools: [],
      regulatoryConcerns: null,
      licenses: null,
      complianceConcerns: null,
    },
    strategicGoals: {
      decentralizationCriteria: {
        isDAO: null,
        isNetwork: null,
        worksInDecentralized: null,
        aspiresDecentralization: null,
        qualifiesAsDecentralized: null,
      },
      nonProfitPurpose: {
        primaryPurpose: null,
        otherPurpose: null,
      },
      nonProfitIndicators: {
        reinvestsProfits: null,
        benefitsPublic: null,
        revenueIsSecondary: null,
        distributeProfits: null,
        membershipBenefits: null,
        commercialDominates: null,
        nonProfitScore: 0,
        commercialScore: 0,
        overallAssessment: null,
      },
    },
    operationalNeeds: {
      activities: [],
      paymentRequirements: [],
      contributorJurisdictions: [],
      needsAttestationTool: null,
      financialInfrastructure: [],
      requiresRedundancy: null,
      monthlyRevenue: null,
      monthlyExpenses: null,
    },
    salesRevenue: {
      commercialActivities: [],
    },
    ipManagement: {
      ipAssets: [],
      contributorsAssignIP: null,
      futureIPAssignment: null,
      licensingPlans: null,
    },
    fundraising: {
      activities: [],
      requiresInvestmentVehicle: false,
    },
    governance: {
      decisionMaking: null,
      existingBylaws: null,
      bylawsDescription: null,
      plansGovernanceTokens: null,
    },
    suitabilityScore: {
      decentralizationMet: false,
      nonProfitMet: false,
      operationalNeedsMet: false,
      overallSuitability: null,
      recommendations: null,
      requiresSeparateVehicle: false,
      additionalConsiderations: null,
    },
    assessmentCompleted: false,
    assessmentDate: null,
  };
}

export function defaultLocalState(): LegalStructureNeedsAssessmentLocalState {
  return {};
}

export function defaultPHState(): LegalStructureNeedsAssessmentPHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<LegalStructureNeedsAssessmentState>,
): LegalStructureNeedsAssessmentState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  } as LegalStructureNeedsAssessmentState;
}

export function createLocalState(
  state?: Partial<LegalStructureNeedsAssessmentLocalState>,
): LegalStructureNeedsAssessmentLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as LegalStructureNeedsAssessmentLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<LegalStructureNeedsAssessmentState>,
  localState?: Partial<LegalStructureNeedsAssessmentLocalState>,
): LegalStructureNeedsAssessmentPHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

export type LegalStructureNeedsAssessmentPHState = PHBaseState & {
  global: LegalStructureNeedsAssessmentState;
  local: LegalStructureNeedsAssessmentLocalState;
};

/**
 * Creates a LegalStructureNeedsAssessmentDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createLegalStructureNeedsAssessmentDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<LegalStructureNeedsAssessmentState>;
    local?: Partial<LegalStructureNeedsAssessmentLocalState>;
  }>,
): LegalStructureNeedsAssessmentDocument {
  const document = createDocument(
    state
      ? createState(
          createBaseState(state.auth, state.document),
          state.global,
          state.local,
        )
      : undefined,
  );

  return document;
}
