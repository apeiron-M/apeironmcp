import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
"""
Subgraph definition for LegalStructureNeedsAssessment (jetstream/legal-structure-assessment)

"""
type MultisigWallet {
    id: OID!
    chain: String
    ownershipStructure: String
}

type LegalEntity {
    id: OID!
    entityType: String
    jurisdiction: String
    purpose: String
}

type ContractEngagement {
    id: OID!
    nature: String
    description: String
}

type FinancialTool {
    id: OID!
    toolType: String
    description: String
}

type OrganizationInfo {
    name: String
    multisigWallets: [MultisigWallet!]!
    existingEntities: [LegalEntity!]!
    contributorEntities: [LegalEntity!]!
    contracts: [ContractEngagement!]!
    financialTools: [FinancialTool!]!
    regulatoryConcerns: String
    licenses: String
    complianceConcerns: String
}

type DecentralizationCriteria {
    isDAO: Boolean
    isNetwork: Boolean
    worksInDecentralized: Boolean
    aspiresDecentralization: Boolean
    qualifiesAsDecentralized: Boolean
}

type NonProfitPurpose {
    primaryPurpose: String
    otherPurpose: String
}

type NonProfitIndicators {
    reinvestsProfits: Boolean
    benefitsPublic: Boolean
    revenueIsSecondary: Boolean
    distributeProfits: Boolean
    membershipBenefits: Boolean
    commercialDominates: Boolean
    nonProfitScore: Float
    commercialScore: Float
    overallAssessment: String
}

type StrategicGoals {
    decentralizationCriteria: DecentralizationCriteria!
    nonProfitPurpose: NonProfitPurpose!
    nonProfitIndicators: NonProfitIndicators!
}

type PaymentRequirement {
    id: OID!
    paymentType: String
    currency: String
    description: String
}

type OperationalActivity {
    id: OID!
    activityType: String
    description: String
}

type OperationalNeeds {
    activities: [OperationalActivity!]!
    paymentRequirements: [PaymentRequirement!]!
    contributorJurisdictions: [String!]!
    needsAttestationTool: Boolean
    financialInfrastructure: [String!]!
    requiresRedundancy: Boolean
    monthlyRevenue: String
    monthlyExpenses: String
}

type CommercialActivity {
    id: OID!
    activityType: String
    description: String
}

type SalesRevenue {
    commercialActivities: [CommercialActivity!]!
}

type IPAsset {
    id: OID!
    assetType: String
    description: String
}

type IPManagement {
    ipAssets: [IPAsset!]!
    contributorsAssignIP: Boolean
    futureIPAssignment: Boolean
    licensingPlans: String
}

type FundraisingActivity {
    id: OID!
    activityType: String
    description: String
}

type Fundraising {
    activities: [FundraisingActivity!]!
    requiresInvestmentVehicle: Boolean
}

type GovernanceFramework {
    decisionMaking: String
    existingBylaws: Boolean
    bylawsDescription: String
    plansGovernanceTokens: Boolean
}

type SuitabilityScore {
    decentralizationMet: Boolean
    nonProfitMet: Boolean
    operationalNeedsMet: Boolean
    overallSuitability: String
    recommendations: String
    requiresSeparateVehicle: Boolean
    additionalConsiderations: String
}

type LegalStructureAssessmentState {
    organizationInfo: OrganizationInfo!
    strategicGoals: StrategicGoals!
    operationalNeeds: OperationalNeeds!
    salesRevenue: SalesRevenue!
    ipManagement: IPManagement!
    fundraising: Fundraising!
    governance: GovernanceFramework!
    suitabilityScore: SuitabilityScore!
    assessmentCompleted: Boolean!
    assessmentDate: DateTime
} 

"""
Queries: LegalStructureNeedsAssessment
"""

type LegalStructureNeedsAssessmentQueries {
    getDocument(docId: PHID!, driveId: PHID): LegalStructureNeedsAssessment
    getDocuments(driveId: String!): [LegalStructureNeedsAssessment!]
}

type Query {
    LegalStructureNeedsAssessment: LegalStructureNeedsAssessmentQueries
}

"""
Mutations: LegalStructureNeedsAssessment
"""
type Mutation {

    LegalStructureNeedsAssessment_createDocument(name:String!, driveId:String): String

    LegalStructureNeedsAssessment_setOrganizationName(driveId:String, docId:PHID, input:LegalStructureNeedsAssessment_SetOrganizationNameInput): Int
    LegalStructureNeedsAssessment_addMultisigWallet(driveId:String, docId:PHID, input:LegalStructureNeedsAssessment_AddMultisigWalletInput): Int
    LegalStructureNeedsAssessment_addExistingEntity(driveId:String, docId:PHID, input:LegalStructureNeedsAssessment_AddExistingEntityInput): Int
    LegalStructureNeedsAssessment_addContributorEntity(driveId:String, docId:PHID, input:LegalStructureNeedsAssessment_AddContributorEntityInput): Int
    LegalStructureNeedsAssessment_addContractEngagement(driveId:String, docId:PHID, input:LegalStructureNeedsAssessment_AddContractEngagementInput): Int
    LegalStructureNeedsAssessment_addFinancialTool(driveId:String, docId:PHID, input:LegalStructureNeedsAssessment_AddFinancialToolInput): Int
    LegalStructureNeedsAssessment_setComplianceInfo(driveId:String, docId:PHID, input:LegalStructureNeedsAssessment_SetComplianceInfoInput): Int
    LegalStructureNeedsAssessment_setDecentralizationCriteria(driveId:String, docId:PHID, input:LegalStructureNeedsAssessment_SetDecentralizationCriteriaInput): Int
    LegalStructureNeedsAssessment_setNonprofitPurpose(driveId:String, docId:PHID, input:LegalStructureNeedsAssessment_SetNonprofitPurposeInput): Int
    LegalStructureNeedsAssessment_setNonprofitIndicators(driveId:String, docId:PHID, input:LegalStructureNeedsAssessment_SetNonprofitIndicatorsInput): Int
    LegalStructureNeedsAssessment_calculateNonprofitScore(driveId:String, docId:PHID, input:LegalStructureNeedsAssessment_CalculateNonprofitScoreInput): Int
    LegalStructureNeedsAssessment_addOperationalActivity(driveId:String, docId:PHID, input:LegalStructureNeedsAssessment_AddOperationalActivityInput): Int
    LegalStructureNeedsAssessment_addPaymentRequirement(driveId:String, docId:PHID, input:LegalStructureNeedsAssessment_AddPaymentRequirementInput): Int
    LegalStructureNeedsAssessment_setContributorJurisdictions(driveId:String, docId:PHID, input:LegalStructureNeedsAssessment_SetContributorJurisdictionsInput): Int
    LegalStructureNeedsAssessment_setFinancialInfrastructure(driveId:String, docId:PHID, input:LegalStructureNeedsAssessment_SetFinancialInfrastructureInput): Int
    LegalStructureNeedsAssessment_setFinancialMetrics(driveId:String, docId:PHID, input:LegalStructureNeedsAssessment_SetFinancialMetricsInput): Int
    LegalStructureNeedsAssessment_addCommercialActivity(driveId:String, docId:PHID, input:LegalStructureNeedsAssessment_AddCommercialActivityInput): Int
    LegalStructureNeedsAssessment_addIpAsset(driveId:String, docId:PHID, input:LegalStructureNeedsAssessment_AddIpAssetInput): Int
    LegalStructureNeedsAssessment_setIpManagement(driveId:String, docId:PHID, input:LegalStructureNeedsAssessment_SetIpManagementInput): Int
    LegalStructureNeedsAssessment_addFundraisingActivity(driveId:String, docId:PHID, input:LegalStructureNeedsAssessment_AddFundraisingActivityInput): Int
    LegalStructureNeedsAssessment_setGovernanceFramework(driveId:String, docId:PHID, input:LegalStructureNeedsAssessment_SetGovernanceFrameworkInput): Int
    LegalStructureNeedsAssessment_calculateSuitability(driveId:String, docId:PHID, input:LegalStructureNeedsAssessment_CalculateSuitabilityInput): Int
    LegalStructureNeedsAssessment_generateRecommendations(driveId:String, docId:PHID, input:LegalStructureNeedsAssessment_GenerateRecommendationsInput): Int
    LegalStructureNeedsAssessment_completeAssessment(driveId:String, docId:PHID, input:LegalStructureNeedsAssessment_CompleteAssessmentInput): Int
}

"""
Module: Organization
"""
input LegalStructureNeedsAssessment_SetOrganizationNameInput {
    name: String!
}
input LegalStructureNeedsAssessment_AddMultisigWalletInput {
    id: OID!
    chain: String
    ownershipStructure: String
}
input LegalStructureNeedsAssessment_AddExistingEntityInput {
    id: OID!
    entityType: String!
    jurisdiction: String!
    purpose: String
}
input LegalStructureNeedsAssessment_AddContributorEntityInput {
    id: OID!
    entityType: String!
    jurisdiction: String!
    purpose: String
}
input LegalStructureNeedsAssessment_AddContractEngagementInput {
    id: OID!
    nature: String!
    description: String
}
input LegalStructureNeedsAssessment_AddFinancialToolInput {
    id: OID!
    toolType: String!
    description: String
}
input LegalStructureNeedsAssessment_SetComplianceInfoInput {
    regulatoryConcerns: String
    licenses: String
    complianceConcerns: String
}

"""
Module: StrategicGoals
"""
input LegalStructureNeedsAssessment_SetDecentralizationCriteriaInput {
    isDAO: Boolean
    isNetwork: Boolean
    worksInDecentralized: Boolean
    aspiresDecentralization: Boolean
}
input LegalStructureNeedsAssessment_SetNonprofitPurposeInput {
    primaryPurpose: String!
    otherPurpose: String
}
input LegalStructureNeedsAssessment_SetNonprofitIndicatorsInput {
    reinvestsProfits: Boolean
    benefitsPublic: Boolean
    revenueIsSecondary: Boolean
    distributeProfits: Boolean
    membershipBenefits: Boolean
    commercialDominates: Boolean
}


"""
Module: OperationalNeeds
"""
input LegalStructureNeedsAssessment_AddOperationalActivityInput {
    id: OID!
    activityType: String!
    description: String
}
input LegalStructureNeedsAssessment_AddPaymentRequirementInput {
    id: OID!
    paymentType: String!
    currency: String!
    description: String
}
input LegalStructureNeedsAssessment_SetContributorJurisdictionsInput {
    jurisdictions: [String!]!
}
input LegalStructureNeedsAssessment_SetFinancialInfrastructureInput {
    infrastructure: [String!]!
    requiresRedundancy: Boolean!
    needsAttestationTool: Boolean!
}
input LegalStructureNeedsAssessment_SetFinancialMetricsInput {
    monthlyRevenue: String
    monthlyExpenses: String
}

"""
Module: CommercialIp
"""
input LegalStructureNeedsAssessment_AddCommercialActivityInput {
    id: OID!
    activityType: String!
    description: String
}
input LegalStructureNeedsAssessment_AddIPAssetInput {
    id: OID!
    assetType: String!
    description: String
}
input LegalStructureNeedsAssessment_SetIPManagementInput {
    contributorsAssignIP: Boolean!
    futureIPAssignment: Boolean!
    licensingPlans: String
}
input LegalStructureNeedsAssessment_AddFundraisingActivityInput {
    id: OID!
    activityType: String!
    description: String
}

"""
Module: Governance
"""
input LegalStructureNeedsAssessment_SetGovernanceFrameworkInput {
    decisionMaking: String!
    existingBylaws: Boolean!
    bylawsDescription: String
    plansGovernanceTokens: Boolean!
}

"""
Module: Assessment
"""




`;
