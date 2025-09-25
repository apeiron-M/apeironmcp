export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Amount: {
    input: { unit?: string; value?: number };
    output: { unit?: string; value?: number };
  };
  Amount_Crypto: {
    input: { unit: string; value: string };
    output: { unit: string; value: string };
  };
  Amount_Currency: {
    input: { unit: string; value: string };
    output: { unit: string; value: string };
  };
  Amount_Fiat: {
    input: { unit: string; value: number };
    output: { unit: string; value: number };
  };
  Amount_Money: { input: number; output: number };
  Amount_Percentage: { input: number; output: number };
  Amount_Tokens: { input: number; output: number };
  Currency: { input: string; output: string };
  Date: { input: string; output: string };
  DateTime: { input: string; output: string };
  EmailAddress: { input: string; output: string };
  EthereumAddress: { input: string; output: string };
  OID: { input: string; output: string };
  OLabel: { input: string; output: string };
  PHID: { input: string; output: string };
  URL: { input: string; output: string };
  Upload: { input: File; output: File };
};

export type AddCommercialActivityInput = {
  activityType: Scalars["String"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
};

export type AddContractEngagementInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  nature: Scalars["String"]["input"];
};

export type AddContributorEntityInput = {
  entityType: Scalars["String"]["input"];
  id: Scalars["OID"]["input"];
  jurisdiction: Scalars["String"]["input"];
  purpose?: InputMaybe<Scalars["String"]["input"]>;
};

export type AddExistingEntityInput = {
  entityType: Scalars["String"]["input"];
  id: Scalars["OID"]["input"];
  jurisdiction: Scalars["String"]["input"];
  purpose?: InputMaybe<Scalars["String"]["input"]>;
};

export type AddFinancialToolInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  toolType: Scalars["String"]["input"];
};

export type AddFundraisingActivityInput = {
  activityType: Scalars["String"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
};

export type AddIpAssetInput = {
  assetType: Scalars["String"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
};

export type AddMultisigWalletInput = {
  chain?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  ownershipStructure?: InputMaybe<Scalars["String"]["input"]>;
};

export type AddOperationalActivityInput = {
  activityType: Scalars["String"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
};

export type AddPaymentRequirementInput = {
  currency: Scalars["String"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  paymentType: Scalars["String"]["input"];
};

export type CommercialActivity = {
  activityType: Maybe<Scalars["String"]["output"]>;
  description: Maybe<Scalars["String"]["output"]>;
  id: Scalars["OID"]["output"];
};

export type ContractEngagement = {
  description: Maybe<Scalars["String"]["output"]>;
  id: Scalars["OID"]["output"];
  nature: Maybe<Scalars["String"]["output"]>;
};

export type DecentralizationCriteria = {
  aspiresDecentralization: Maybe<Scalars["Boolean"]["output"]>;
  isDAO: Maybe<Scalars["Boolean"]["output"]>;
  isNetwork: Maybe<Scalars["Boolean"]["output"]>;
  qualifiesAsDecentralized: Maybe<Scalars["Boolean"]["output"]>;
  worksInDecentralized: Maybe<Scalars["Boolean"]["output"]>;
};

export type FinancialTool = {
  description: Maybe<Scalars["String"]["output"]>;
  id: Scalars["OID"]["output"];
  toolType: Maybe<Scalars["String"]["output"]>;
};

export type Fundraising = {
  activities: Array<FundraisingActivity>;
  requiresInvestmentVehicle: Maybe<Scalars["Boolean"]["output"]>;
};

export type FundraisingActivity = {
  activityType: Maybe<Scalars["String"]["output"]>;
  description: Maybe<Scalars["String"]["output"]>;
  id: Scalars["OID"]["output"];
};

export type GovernanceFramework = {
  bylawsDescription: Maybe<Scalars["String"]["output"]>;
  decisionMaking: Maybe<Scalars["String"]["output"]>;
  existingBylaws: Maybe<Scalars["Boolean"]["output"]>;
  plansGovernanceTokens: Maybe<Scalars["Boolean"]["output"]>;
};

export type IpAsset = {
  assetType: Maybe<Scalars["String"]["output"]>;
  description: Maybe<Scalars["String"]["output"]>;
  id: Scalars["OID"]["output"];
};

export type IpManagement = {
  contributorsAssignIP: Maybe<Scalars["Boolean"]["output"]>;
  futureIPAssignment: Maybe<Scalars["Boolean"]["output"]>;
  ipAssets: Array<IpAsset>;
  licensingPlans: Maybe<Scalars["String"]["output"]>;
};

export type LegalEntity = {
  entityType: Maybe<Scalars["String"]["output"]>;
  id: Scalars["OID"]["output"];
  jurisdiction: Maybe<Scalars["String"]["output"]>;
  purpose: Maybe<Scalars["String"]["output"]>;
};

export type LegalStructureAssessmentState = {
  assessmentCompleted: Scalars["Boolean"]["output"];
  assessmentDate: Maybe<Scalars["DateTime"]["output"]>;
  fundraising: Fundraising;
  governance: GovernanceFramework;
  ipManagement: IpManagement;
  operationalNeeds: OperationalNeeds;
  organizationInfo: OrganizationInfo;
  salesRevenue: SalesRevenue;
  strategicGoals: StrategicGoals;
  suitabilityScore: SuitabilityScore;
};

export type MultisigWallet = {
  chain: Maybe<Scalars["String"]["output"]>;
  id: Scalars["OID"]["output"];
  ownershipStructure: Maybe<Scalars["String"]["output"]>;
};

export type NonProfitIndicators = {
  benefitsPublic: Maybe<Scalars["Boolean"]["output"]>;
  commercialDominates: Maybe<Scalars["Boolean"]["output"]>;
  commercialScore: Maybe<Scalars["Float"]["output"]>;
  distributeProfits: Maybe<Scalars["Boolean"]["output"]>;
  membershipBenefits: Maybe<Scalars["Boolean"]["output"]>;
  nonProfitScore: Maybe<Scalars["Float"]["output"]>;
  overallAssessment: Maybe<Scalars["String"]["output"]>;
  reinvestsProfits: Maybe<Scalars["Boolean"]["output"]>;
  revenueIsSecondary: Maybe<Scalars["Boolean"]["output"]>;
};

export type NonProfitPurpose = {
  otherPurpose: Maybe<Scalars["String"]["output"]>;
  primaryPurpose: Maybe<Scalars["String"]["output"]>;
};

export type OperationalActivity = {
  activityType: Maybe<Scalars["String"]["output"]>;
  description: Maybe<Scalars["String"]["output"]>;
  id: Scalars["OID"]["output"];
};

export type OperationalNeeds = {
  activities: Array<OperationalActivity>;
  contributorJurisdictions: Array<Scalars["String"]["output"]>;
  financialInfrastructure: Array<Scalars["String"]["output"]>;
  monthlyExpenses: Maybe<Scalars["String"]["output"]>;
  monthlyRevenue: Maybe<Scalars["String"]["output"]>;
  needsAttestationTool: Maybe<Scalars["Boolean"]["output"]>;
  paymentRequirements: Array<PaymentRequirement>;
  requiresRedundancy: Maybe<Scalars["Boolean"]["output"]>;
};

export type OrganizationInfo = {
  complianceConcerns: Maybe<Scalars["String"]["output"]>;
  contracts: Array<ContractEngagement>;
  contributorEntities: Array<LegalEntity>;
  existingEntities: Array<LegalEntity>;
  financialTools: Array<FinancialTool>;
  licenses: Maybe<Scalars["String"]["output"]>;
  multisigWallets: Array<MultisigWallet>;
  name: Maybe<Scalars["String"]["output"]>;
  regulatoryConcerns: Maybe<Scalars["String"]["output"]>;
};

export type PaymentRequirement = {
  currency: Maybe<Scalars["String"]["output"]>;
  description: Maybe<Scalars["String"]["output"]>;
  id: Scalars["OID"]["output"];
  paymentType: Maybe<Scalars["String"]["output"]>;
};

export type SalesRevenue = {
  commercialActivities: Array<CommercialActivity>;
};

export type SetComplianceInfoInput = {
  complianceConcerns?: InputMaybe<Scalars["String"]["input"]>;
  licenses?: InputMaybe<Scalars["String"]["input"]>;
  regulatoryConcerns?: InputMaybe<Scalars["String"]["input"]>;
};

export type SetContributorJurisdictionsInput = {
  jurisdictions: Array<Scalars["String"]["input"]>;
};

export type SetDecentralizationCriteriaInput = {
  aspiresDecentralization?: InputMaybe<Scalars["Boolean"]["input"]>;
  isDAO?: InputMaybe<Scalars["Boolean"]["input"]>;
  isNetwork?: InputMaybe<Scalars["Boolean"]["input"]>;
  worksInDecentralized?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type SetFinancialInfrastructureInput = {
  infrastructure: Array<Scalars["String"]["input"]>;
  needsAttestationTool: Scalars["Boolean"]["input"];
  requiresRedundancy: Scalars["Boolean"]["input"];
};

export type SetFinancialMetricsInput = {
  monthlyExpenses?: InputMaybe<Scalars["String"]["input"]>;
  monthlyRevenue?: InputMaybe<Scalars["String"]["input"]>;
};

export type SetGovernanceFrameworkInput = {
  bylawsDescription?: InputMaybe<Scalars["String"]["input"]>;
  decisionMaking: Scalars["String"]["input"];
  existingBylaws: Scalars["Boolean"]["input"];
  plansGovernanceTokens: Scalars["Boolean"]["input"];
};

export type SetIpManagementInput = {
  contributorsAssignIP: Scalars["Boolean"]["input"];
  futureIPAssignment: Scalars["Boolean"]["input"];
  licensingPlans?: InputMaybe<Scalars["String"]["input"]>;
};

export type SetNonprofitIndicatorsInput = {
  benefitsPublic?: InputMaybe<Scalars["Boolean"]["input"]>;
  commercialDominates?: InputMaybe<Scalars["Boolean"]["input"]>;
  distributeProfits?: InputMaybe<Scalars["Boolean"]["input"]>;
  membershipBenefits?: InputMaybe<Scalars["Boolean"]["input"]>;
  reinvestsProfits?: InputMaybe<Scalars["Boolean"]["input"]>;
  revenueIsSecondary?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type SetNonprofitPurposeInput = {
  otherPurpose?: InputMaybe<Scalars["String"]["input"]>;
  primaryPurpose: Scalars["String"]["input"];
};

export type SetOrganizationNameInput = {
  name: Scalars["String"]["input"];
};

export type StrategicGoals = {
  decentralizationCriteria: DecentralizationCriteria;
  nonProfitIndicators: NonProfitIndicators;
  nonProfitPurpose: NonProfitPurpose;
};

export type SuitabilityScore = {
  additionalConsiderations: Maybe<Scalars["String"]["output"]>;
  decentralizationMet: Maybe<Scalars["Boolean"]["output"]>;
  nonProfitMet: Maybe<Scalars["Boolean"]["output"]>;
  operationalNeedsMet: Maybe<Scalars["Boolean"]["output"]>;
  overallSuitability: Maybe<Scalars["String"]["output"]>;
  recommendations: Maybe<Scalars["String"]["output"]>;
  requiresSeparateVehicle: Maybe<Scalars["Boolean"]["output"]>;
};
