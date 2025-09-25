import { type Subgraph } from "@powerhousedao/reactor-api";
import { addFile } from "document-drive";
import {
  actions,
  type SetOrganizationNameInput,
  type AddMultisigWalletInput,
  type AddExistingEntityInput,
  type AddContributorEntityInput,
  type AddContractEngagementInput,
  type AddFinancialToolInput,
  type SetComplianceInfoInput,
  type SetDecentralizationCriteriaInput,
  type SetNonprofitPurposeInput,
  type SetNonprofitIndicatorsInput,
  type CalculateNonprofitScoreInput,
  type AddOperationalActivityInput,
  type AddPaymentRequirementInput,
  type SetContributorJurisdictionsInput,
  type SetFinancialInfrastructureInput,
  type SetFinancialMetricsInput,
  type AddCommercialActivityInput,
  type AddIpAssetInput,
  type SetIpManagementInput,
  type AddFundraisingActivityInput,
  type SetGovernanceFrameworkInput,
  type CalculateSuitabilityInput,
  type GenerateRecommendationsInput,
  type CompleteAssessmentInput,
} from "../../document-models/legal-structure-needs-assessment/index.js";
import { setName } from "document-model";

export const getResolvers = (subgraph: Subgraph) => {
  const reactor = subgraph.reactor;

  return {
    Query: {
      LegalStructureNeedsAssessment: async () => {
        return {
          getDocument: async (args: { docId: string; driveId: string }) => {
            const { docId, driveId } = args;

            if (!docId) {
              throw new Error("Document id is required");
            }

            if (driveId) {
              const docIds = await reactor.getDocuments(driveId);
              if (!docIds.includes(docId)) {
                throw new Error(
                  `Document with id ${docId} is not part of ${driveId}`,
                );
              }
            }

            const doc = await reactor.getDocument(docId);
            return {
              driveId: driveId,
              ...doc,
              ...doc.header,
              state: doc.state.global,
              stateJSON: doc.state.global,
              revision: doc.header?.revision?.global ?? 0,
            };
          },
          getDocuments: async (args: { driveId: string }) => {
            const { driveId } = args;
            const docsIds = await reactor.getDocuments(driveId);
            const docs = await Promise.all(
              docsIds.map(async (docId) => {
                const doc = await reactor.getDocument(docId);
                return {
                  driveId: driveId,
                  ...doc,
                  ...doc.header,
                  state: doc.state.global,
                  stateJSON: doc.state.global,
                  revision: doc.header?.revision?.global ?? 0,
                };
              }),
            );

            return docs.filter(
              (doc) =>
                doc.header.documentType ===
                "jetstream/legal-structure-assessment",
            );
          },
        };
      },
    },
    Mutation: {
      LegalStructureNeedsAssessment_createDocument: async (
        _: unknown,
        args: { name: string; driveId?: string },
      ) => {
        const { driveId, name } = args;
        const document = await reactor.addDocument(
          "jetstream/legal-structure-assessment",
        );

        if (driveId) {
          await reactor.addAction(
            driveId,
            addFile({
              name,
              id: document.header.id,
              documentType: "jetstream/legal-structure-assessment",
            }),
          );
        }

        if (name) {
          await reactor.addAction(document.header.id, setName(name));
        }

        return document.header.id;
      },

      LegalStructureNeedsAssessment_setOrganizationName: async (
        _: unknown,
        args: { docId: string; input: SetOrganizationNameInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setOrganizationName(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to setOrganizationName",
          );
        }

        return true;
      },

      LegalStructureNeedsAssessment_addMultisigWallet: async (
        _: unknown,
        args: { docId: string; input: AddMultisigWalletInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addMultisigWallet(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to addMultisigWallet",
          );
        }

        return true;
      },

      LegalStructureNeedsAssessment_addExistingEntity: async (
        _: unknown,
        args: { docId: string; input: AddExistingEntityInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addExistingEntity(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to addExistingEntity",
          );
        }

        return true;
      },

      LegalStructureNeedsAssessment_addContributorEntity: async (
        _: unknown,
        args: { docId: string; input: AddContributorEntityInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addContributorEntity(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to addContributorEntity",
          );
        }

        return true;
      },

      LegalStructureNeedsAssessment_addContractEngagement: async (
        _: unknown,
        args: { docId: string; input: AddContractEngagementInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addContractEngagement(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to addContractEngagement",
          );
        }

        return true;
      },

      LegalStructureNeedsAssessment_addFinancialTool: async (
        _: unknown,
        args: { docId: string; input: AddFinancialToolInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addFinancialTool(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to addFinancialTool",
          );
        }

        return true;
      },

      LegalStructureNeedsAssessment_setComplianceInfo: async (
        _: unknown,
        args: { docId: string; input: SetComplianceInfoInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setComplianceInfo(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to setComplianceInfo",
          );
        }

        return true;
      },

      LegalStructureNeedsAssessment_setDecentralizationCriteria: async (
        _: unknown,
        args: { docId: string; input: SetDecentralizationCriteriaInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setDecentralizationCriteria(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to setDecentralizationCriteria",
          );
        }

        return true;
      },

      LegalStructureNeedsAssessment_setNonprofitPurpose: async (
        _: unknown,
        args: { docId: string; input: SetNonprofitPurposeInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setNonprofitPurpose(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to setNonprofitPurpose",
          );
        }

        return true;
      },

      LegalStructureNeedsAssessment_setNonprofitIndicators: async (
        _: unknown,
        args: { docId: string; input: SetNonprofitIndicatorsInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setNonprofitIndicators(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to setNonprofitIndicators",
          );
        }

        return true;
      },

      LegalStructureNeedsAssessment_calculateNonprofitScore: async (
        _: unknown,
        args: { docId: string; input: CalculateNonprofitScoreInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.calculateNonprofitScore(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to calculateNonprofitScore",
          );
        }

        return true;
      },

      LegalStructureNeedsAssessment_addOperationalActivity: async (
        _: unknown,
        args: { docId: string; input: AddOperationalActivityInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addOperationalActivity(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to addOperationalActivity",
          );
        }

        return true;
      },

      LegalStructureNeedsAssessment_addPaymentRequirement: async (
        _: unknown,
        args: { docId: string; input: AddPaymentRequirementInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addPaymentRequirement(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to addPaymentRequirement",
          );
        }

        return true;
      },

      LegalStructureNeedsAssessment_setContributorJurisdictions: async (
        _: unknown,
        args: { docId: string; input: SetContributorJurisdictionsInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setContributorJurisdictions(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to setContributorJurisdictions",
          );
        }

        return true;
      },

      LegalStructureNeedsAssessment_setFinancialInfrastructure: async (
        _: unknown,
        args: { docId: string; input: SetFinancialInfrastructureInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setFinancialInfrastructure(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to setFinancialInfrastructure",
          );
        }

        return true;
      },

      LegalStructureNeedsAssessment_setFinancialMetrics: async (
        _: unknown,
        args: { docId: string; input: SetFinancialMetricsInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setFinancialMetrics(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to setFinancialMetrics",
          );
        }

        return true;
      },

      LegalStructureNeedsAssessment_addCommercialActivity: async (
        _: unknown,
        args: { docId: string; input: AddCommercialActivityInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addCommercialActivity(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to addCommercialActivity",
          );
        }

        return true;
      },

      LegalStructureNeedsAssessment_addIpAsset: async (
        _: unknown,
        args: { docId: string; input: AddIpAssetInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addIpAsset(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to addIpAsset");
        }

        return true;
      },

      LegalStructureNeedsAssessment_setIpManagement: async (
        _: unknown,
        args: { docId: string; input: SetIpManagementInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setIpManagement(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to setIpManagement");
        }

        return true;
      },

      LegalStructureNeedsAssessment_addFundraisingActivity: async (
        _: unknown,
        args: { docId: string; input: AddFundraisingActivityInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addFundraisingActivity(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to addFundraisingActivity",
          );
        }

        return true;
      },

      LegalStructureNeedsAssessment_setGovernanceFramework: async (
        _: unknown,
        args: { docId: string; input: SetGovernanceFrameworkInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setGovernanceFramework(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to setGovernanceFramework",
          );
        }

        return true;
      },

      LegalStructureNeedsAssessment_calculateSuitability: async (
        _: unknown,
        args: { docId: string; input: CalculateSuitabilityInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.calculateSuitability(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to calculateSuitability",
          );
        }

        return true;
      },

      LegalStructureNeedsAssessment_generateRecommendations: async (
        _: unknown,
        args: { docId: string; input: GenerateRecommendationsInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.generateRecommendations(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to generateRecommendations",
          );
        }

        return true;
      },

      LegalStructureNeedsAssessment_completeAssessment: async (
        _: unknown,
        args: { docId: string; input: CompleteAssessmentInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.completeAssessment(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to completeAssessment",
          );
        }

        return true;
      },
    },
  };
};
