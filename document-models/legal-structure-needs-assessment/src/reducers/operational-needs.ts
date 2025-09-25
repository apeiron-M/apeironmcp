import type { LegalStructureNeedsAssessmentOperationalNeedsOperations } from "../../gen/operational-needs/operations.js";

export const reducer: LegalStructureNeedsAssessmentOperationalNeedsOperations = {
    addOperationalActivityOperation(state, action, dispatch) {
        state.operationalNeeds.activities.push({
            id: action.input.id,
            activityType: action.input.activityType,
            description: action.input.description || null
        });
    },
    addPaymentRequirementOperation(state, action, dispatch) {
        state.operationalNeeds.paymentRequirements.push({
            id: action.input.id,
            paymentType: action.input.paymentType,
            currency: action.input.currency,
            description: action.input.description || null
        });
    },
    setContributorJurisdictionsOperation(state, action, dispatch) {
        state.operationalNeeds.contributorJurisdictions = action.input.jurisdictions;
    },
    setFinancialInfrastructureOperation(state, action, dispatch) {
        state.operationalNeeds.financialInfrastructure = action.input.infrastructure;
        state.operationalNeeds.requiresRedundancy = action.input.requiresRedundancy;
        state.operationalNeeds.needsAttestationTool = action.input.needsAttestationTool;
    },
    setFinancialMetricsOperation(state, action, dispatch) {
        state.operationalNeeds.monthlyRevenue = action.input.monthlyRevenue || null;
        state.operationalNeeds.monthlyExpenses = action.input.monthlyExpenses || null;
    }
};
