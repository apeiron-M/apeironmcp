import type { LegalStructureNeedsAssessmentOrganizationOperations } from "../../gen/organization/operations.js";

export const reducer: LegalStructureNeedsAssessmentOrganizationOperations = {
    setOrganizationNameOperation(state, action, dispatch) {
        state.organizationInfo.name = action.input.name;
    },
    addMultisigWalletOperation(state, action, dispatch) {
        state.organizationInfo.multisigWallets.push({
            id: action.input.id,
            chain: action.input.chain || null,
            ownershipStructure: action.input.ownershipStructure || null
        });
    },
    addExistingEntityOperation(state, action, dispatch) {
        state.organizationInfo.existingEntities.push({
            id: action.input.id,
            entityType: action.input.entityType,
            jurisdiction: action.input.jurisdiction,
            purpose: action.input.purpose || null
        });
    },
    addContributorEntityOperation(state, action, dispatch) {
        state.organizationInfo.contributorEntities.push({
            id: action.input.id,
            entityType: action.input.entityType,
            jurisdiction: action.input.jurisdiction,
            purpose: action.input.purpose || null
        });
    },
    addContractEngagementOperation(state, action, dispatch) {
        state.organizationInfo.contracts.push({
            id: action.input.id,
            nature: action.input.nature,
            description: action.input.description || null
        });
    },
    addFinancialToolOperation(state, action, dispatch) {
        state.organizationInfo.financialTools.push({
            id: action.input.id,
            toolType: action.input.toolType,
            description: action.input.description || null
        });
    },
    setComplianceInfoOperation(state, action, dispatch) {
        state.organizationInfo.regulatoryConcerns = action.input.regulatoryConcerns || null;
        state.organizationInfo.licenses = action.input.licenses || null;
        state.organizationInfo.complianceConcerns = action.input.complianceConcerns || null;
    }
};
