import { z } from "zod";
import type {
  AddCommercialActivityInput,
  AddContractEngagementInput,
  AddContributorEntityInput,
  AddExistingEntityInput,
  AddFinancialToolInput,
  AddFundraisingActivityInput,
  AddIpAssetInput,
  AddMultisigWalletInput,
  AddOperationalActivityInput,
  AddPaymentRequirementInput,
  CommercialActivity,
  ContractEngagement,
  DecentralizationCriteria,
  FinancialTool,
  Fundraising,
  FundraisingActivity,
  GovernanceFramework,
  IpAsset,
  IpManagement,
  LegalEntity,
  LegalStructureAssessmentState,
  MultisigWallet,
  NonProfitIndicators,
  NonProfitPurpose,
  OperationalActivity,
  OperationalNeeds,
  OrganizationInfo,
  PaymentRequirement,
  SalesRevenue,
  SetComplianceInfoInput,
  SetContributorJurisdictionsInput,
  SetDecentralizationCriteriaInput,
  SetFinancialInfrastructureInput,
  SetFinancialMetricsInput,
  SetGovernanceFrameworkInput,
  SetIpManagementInput,
  SetNonprofitIndicatorsInput,
  SetNonprofitPurposeInput,
  SetOrganizationNameInput,
  StrategicGoals,
  SuitabilityScore,
} from "./types.js";

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny =>
  v !== undefined && v !== null;

export const definedNonNullAnySchema = z
  .any()
  .refine((v) => isDefinedNonNullAny(v));

export function AddCommercialActivityInputSchema(): z.ZodObject<
  Properties<AddCommercialActivityInput>
> {
  return z.object({
    activityType: z.string(),
    description: z.string().nullish(),
    id: z.string(),
  });
}

export function AddContractEngagementInputSchema(): z.ZodObject<
  Properties<AddContractEngagementInput>
> {
  return z.object({
    description: z.string().nullish(),
    id: z.string(),
    nature: z.string(),
  });
}

export function AddContributorEntityInputSchema(): z.ZodObject<
  Properties<AddContributorEntityInput>
> {
  return z.object({
    entityType: z.string(),
    id: z.string(),
    jurisdiction: z.string(),
    purpose: z.string().nullish(),
  });
}

export function AddExistingEntityInputSchema(): z.ZodObject<
  Properties<AddExistingEntityInput>
> {
  return z.object({
    entityType: z.string(),
    id: z.string(),
    jurisdiction: z.string(),
    purpose: z.string().nullish(),
  });
}

export function AddFinancialToolInputSchema(): z.ZodObject<
  Properties<AddFinancialToolInput>
> {
  return z.object({
    description: z.string().nullish(),
    id: z.string(),
    toolType: z.string(),
  });
}

export function AddFundraisingActivityInputSchema(): z.ZodObject<
  Properties<AddFundraisingActivityInput>
> {
  return z.object({
    activityType: z.string(),
    description: z.string().nullish(),
    id: z.string(),
  });
}

export function AddIpAssetInputSchema(): z.ZodObject<
  Properties<AddIpAssetInput>
> {
  return z.object({
    assetType: z.string(),
    description: z.string().nullish(),
    id: z.string(),
  });
}

export function AddMultisigWalletInputSchema(): z.ZodObject<
  Properties<AddMultisigWalletInput>
> {
  return z.object({
    chain: z.string().nullish(),
    id: z.string(),
    ownershipStructure: z.string().nullish(),
  });
}

export function AddOperationalActivityInputSchema(): z.ZodObject<
  Properties<AddOperationalActivityInput>
> {
  return z.object({
    activityType: z.string(),
    description: z.string().nullish(),
    id: z.string(),
  });
}

export function AddPaymentRequirementInputSchema(): z.ZodObject<
  Properties<AddPaymentRequirementInput>
> {
  return z.object({
    currency: z.string(),
    description: z.string().nullish(),
    id: z.string(),
    paymentType: z.string(),
  });
}

export function CommercialActivitySchema(): z.ZodObject<
  Properties<CommercialActivity>
> {
  return z.object({
    __typename: z.literal("CommercialActivity").optional(),
    activityType: z.string().nullable(),
    description: z.string().nullable(),
    id: z.string(),
  });
}

export function ContractEngagementSchema(): z.ZodObject<
  Properties<ContractEngagement>
> {
  return z.object({
    __typename: z.literal("ContractEngagement").optional(),
    description: z.string().nullable(),
    id: z.string(),
    nature: z.string().nullable(),
  });
}

export function DecentralizationCriteriaSchema(): z.ZodObject<
  Properties<DecentralizationCriteria>
> {
  return z.object({
    __typename: z.literal("DecentralizationCriteria").optional(),
    aspiresDecentralization: z.boolean().nullable(),
    isDAO: z.boolean().nullable(),
    isNetwork: z.boolean().nullable(),
    qualifiesAsDecentralized: z.boolean().nullable(),
    worksInDecentralized: z.boolean().nullable(),
  });
}

export function FinancialToolSchema(): z.ZodObject<Properties<FinancialTool>> {
  return z.object({
    __typename: z.literal("FinancialTool").optional(),
    description: z.string().nullable(),
    id: z.string(),
    toolType: z.string().nullable(),
  });
}

export function FundraisingSchema(): z.ZodObject<Properties<Fundraising>> {
  return z.object({
    __typename: z.literal("Fundraising").optional(),
    activities: z.array(FundraisingActivitySchema()),
    requiresInvestmentVehicle: z.boolean().nullable(),
  });
}

export function FundraisingActivitySchema(): z.ZodObject<
  Properties<FundraisingActivity>
> {
  return z.object({
    __typename: z.literal("FundraisingActivity").optional(),
    activityType: z.string().nullable(),
    description: z.string().nullable(),
    id: z.string(),
  });
}

export function GovernanceFrameworkSchema(): z.ZodObject<
  Properties<GovernanceFramework>
> {
  return z.object({
    __typename: z.literal("GovernanceFramework").optional(),
    bylawsDescription: z.string().nullable(),
    decisionMaking: z.string().nullable(),
    existingBylaws: z.boolean().nullable(),
    plansGovernanceTokens: z.boolean().nullable(),
  });
}

export function IpAssetSchema(): z.ZodObject<Properties<IpAsset>> {
  return z.object({
    __typename: z.literal("IPAsset").optional(),
    assetType: z.string().nullable(),
    description: z.string().nullable(),
    id: z.string(),
  });
}

export function IpManagementSchema(): z.ZodObject<Properties<IpManagement>> {
  return z.object({
    __typename: z.literal("IPManagement").optional(),
    contributorsAssignIP: z.boolean().nullable(),
    futureIPAssignment: z.boolean().nullable(),
    ipAssets: z.array(IpAssetSchema()),
    licensingPlans: z.string().nullable(),
  });
}

export function LegalEntitySchema(): z.ZodObject<Properties<LegalEntity>> {
  return z.object({
    __typename: z.literal("LegalEntity").optional(),
    entityType: z.string().nullable(),
    id: z.string(),
    jurisdiction: z.string().nullable(),
    purpose: z.string().nullable(),
  });
}

export function LegalStructureAssessmentStateSchema(): z.ZodObject<
  Properties<LegalStructureAssessmentState>
> {
  return z.object({
    __typename: z.literal("LegalStructureAssessmentState").optional(),
    assessmentCompleted: z.boolean(),
    assessmentDate: z.string().datetime().nullable(),
    fundraising: FundraisingSchema(),
    governance: GovernanceFrameworkSchema(),
    ipManagement: IpManagementSchema(),
    operationalNeeds: OperationalNeedsSchema(),
    organizationInfo: OrganizationInfoSchema(),
    salesRevenue: SalesRevenueSchema(),
    strategicGoals: StrategicGoalsSchema(),
    suitabilityScore: SuitabilityScoreSchema(),
  });
}

export function MultisigWalletSchema(): z.ZodObject<
  Properties<MultisigWallet>
> {
  return z.object({
    __typename: z.literal("MultisigWallet").optional(),
    chain: z.string().nullable(),
    id: z.string(),
    ownershipStructure: z.string().nullable(),
  });
}

export function NonProfitIndicatorsSchema(): z.ZodObject<
  Properties<NonProfitIndicators>
> {
  return z.object({
    __typename: z.literal("NonProfitIndicators").optional(),
    benefitsPublic: z.boolean().nullable(),
    commercialDominates: z.boolean().nullable(),
    commercialScore: z.number().nullable(),
    distributeProfits: z.boolean().nullable(),
    membershipBenefits: z.boolean().nullable(),
    nonProfitScore: z.number().nullable(),
    overallAssessment: z.string().nullable(),
    reinvestsProfits: z.boolean().nullable(),
    revenueIsSecondary: z.boolean().nullable(),
  });
}

export function NonProfitPurposeSchema(): z.ZodObject<
  Properties<NonProfitPurpose>
> {
  return z.object({
    __typename: z.literal("NonProfitPurpose").optional(),
    otherPurpose: z.string().nullable(),
    primaryPurpose: z.string().nullable(),
  });
}

export function OperationalActivitySchema(): z.ZodObject<
  Properties<OperationalActivity>
> {
  return z.object({
    __typename: z.literal("OperationalActivity").optional(),
    activityType: z.string().nullable(),
    description: z.string().nullable(),
    id: z.string(),
  });
}

export function OperationalNeedsSchema(): z.ZodObject<
  Properties<OperationalNeeds>
> {
  return z.object({
    __typename: z.literal("OperationalNeeds").optional(),
    activities: z.array(OperationalActivitySchema()),
    contributorJurisdictions: z.array(z.string()),
    financialInfrastructure: z.array(z.string()),
    monthlyExpenses: z.string().nullable(),
    monthlyRevenue: z.string().nullable(),
    needsAttestationTool: z.boolean().nullable(),
    paymentRequirements: z.array(PaymentRequirementSchema()),
    requiresRedundancy: z.boolean().nullable(),
  });
}

export function OrganizationInfoSchema(): z.ZodObject<
  Properties<OrganizationInfo>
> {
  return z.object({
    __typename: z.literal("OrganizationInfo").optional(),
    complianceConcerns: z.string().nullable(),
    contracts: z.array(ContractEngagementSchema()),
    contributorEntities: z.array(LegalEntitySchema()),
    existingEntities: z.array(LegalEntitySchema()),
    financialTools: z.array(FinancialToolSchema()),
    licenses: z.string().nullable(),
    multisigWallets: z.array(MultisigWalletSchema()),
    name: z.string().nullable(),
    regulatoryConcerns: z.string().nullable(),
  });
}

export function PaymentRequirementSchema(): z.ZodObject<
  Properties<PaymentRequirement>
> {
  return z.object({
    __typename: z.literal("PaymentRequirement").optional(),
    currency: z.string().nullable(),
    description: z.string().nullable(),
    id: z.string(),
    paymentType: z.string().nullable(),
  });
}

export function SalesRevenueSchema(): z.ZodObject<Properties<SalesRevenue>> {
  return z.object({
    __typename: z.literal("SalesRevenue").optional(),
    commercialActivities: z.array(CommercialActivitySchema()),
  });
}

export function SetComplianceInfoInputSchema(): z.ZodObject<
  Properties<SetComplianceInfoInput>
> {
  return z.object({
    complianceConcerns: z.string().nullish(),
    licenses: z.string().nullish(),
    regulatoryConcerns: z.string().nullish(),
  });
}

export function SetContributorJurisdictionsInputSchema(): z.ZodObject<
  Properties<SetContributorJurisdictionsInput>
> {
  return z.object({
    jurisdictions: z.array(z.string()),
  });
}

export function SetDecentralizationCriteriaInputSchema(): z.ZodObject<
  Properties<SetDecentralizationCriteriaInput>
> {
  return z.object({
    aspiresDecentralization: z.boolean().nullish(),
    isDAO: z.boolean().nullish(),
    isNetwork: z.boolean().nullish(),
    worksInDecentralized: z.boolean().nullish(),
  });
}

export function SetFinancialInfrastructureInputSchema(): z.ZodObject<
  Properties<SetFinancialInfrastructureInput>
> {
  return z.object({
    infrastructure: z.array(z.string()),
    needsAttestationTool: z.boolean(),
    requiresRedundancy: z.boolean(),
  });
}

export function SetFinancialMetricsInputSchema(): z.ZodObject<
  Properties<SetFinancialMetricsInput>
> {
  return z.object({
    monthlyExpenses: z.string().nullish(),
    monthlyRevenue: z.string().nullish(),
  });
}

export function SetGovernanceFrameworkInputSchema(): z.ZodObject<
  Properties<SetGovernanceFrameworkInput>
> {
  return z.object({
    bylawsDescription: z.string().nullish(),
    decisionMaking: z.string(),
    existingBylaws: z.boolean(),
    plansGovernanceTokens: z.boolean(),
  });
}

export function SetIpManagementInputSchema(): z.ZodObject<
  Properties<SetIpManagementInput>
> {
  return z.object({
    contributorsAssignIP: z.boolean(),
    futureIPAssignment: z.boolean(),
    licensingPlans: z.string().nullish(),
  });
}

export function SetNonprofitIndicatorsInputSchema(): z.ZodObject<
  Properties<SetNonprofitIndicatorsInput>
> {
  return z.object({
    benefitsPublic: z.boolean().nullish(),
    commercialDominates: z.boolean().nullish(),
    distributeProfits: z.boolean().nullish(),
    membershipBenefits: z.boolean().nullish(),
    reinvestsProfits: z.boolean().nullish(),
    revenueIsSecondary: z.boolean().nullish(),
  });
}

export function SetNonprofitPurposeInputSchema(): z.ZodObject<
  Properties<SetNonprofitPurposeInput>
> {
  return z.object({
    otherPurpose: z.string().nullish(),
    primaryPurpose: z.string(),
  });
}

export function SetOrganizationNameInputSchema(): z.ZodObject<
  Properties<SetOrganizationNameInput>
> {
  return z.object({
    name: z.string(),
  });
}

export function StrategicGoalsSchema(): z.ZodObject<
  Properties<StrategicGoals>
> {
  return z.object({
    __typename: z.literal("StrategicGoals").optional(),
    decentralizationCriteria: DecentralizationCriteriaSchema(),
    nonProfitIndicators: NonProfitIndicatorsSchema(),
    nonProfitPurpose: NonProfitPurposeSchema(),
  });
}

export function SuitabilityScoreSchema(): z.ZodObject<
  Properties<SuitabilityScore>
> {
  return z.object({
    __typename: z.literal("SuitabilityScore").optional(),
    additionalConsiderations: z.string().nullable(),
    decentralizationMet: z.boolean().nullable(),
    nonProfitMet: z.boolean().nullable(),
    operationalNeedsMet: z.boolean().nullable(),
    overallSuitability: z.string().nullable(),
    recommendations: z.string().nullable(),
    requiresSeparateVehicle: z.boolean().nullable(),
  });
}
