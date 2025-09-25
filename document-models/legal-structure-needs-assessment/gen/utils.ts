import {
  type DocumentModelUtils,
  baseCreateDocument,
  baseSaveToFile,
  baseSaveToFileHandle,
  baseLoadFromFile,
  baseLoadFromInput,
  defaultBaseState,
  generateId,
} from "document-model";
import {
  type LegalStructureNeedsAssessmentDocument,
  type LegalStructureNeedsAssessmentState,
  type LegalStructureNeedsAssessmentLocalState,
} from "./types.js";
import { reducer } from "./reducer.js";

export const initialGlobalState: LegalStructureNeedsAssessmentState = {
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
export const initialLocalState: LegalStructureNeedsAssessmentLocalState = {};

const utils: DocumentModelUtils<LegalStructureNeedsAssessmentDocument> = {
  fileExtension: "lsna",
  createState(state) {
    return {
      ...defaultBaseState(),
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createDocument(state) {
    const document = baseCreateDocument(utils.createState, state);

    document.header.documentType = "jetstream/legal-structure-assessment";

    // for backwards compatibility, but this is NOT a valid signed document id
    document.header.id = generateId();

    return document;
  },
  saveToFile(document, path, name) {
    return baseSaveToFile(document, path, "lsna", name);
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromFile(path) {
    return baseLoadFromFile(path, reducer);
  },
  loadFromInput(input) {
    return baseLoadFromInput(input, reducer);
  },
};

export const createDocument = utils.createDocument;
export const createState = utils.createState;
export const saveToFile = utils.saveToFile;
export const saveToFileHandle = utils.saveToFileHandle;
export const loadFromFile = utils.loadFromFile;
export const loadFromInput = utils.loadFromInput;

export default utils;
