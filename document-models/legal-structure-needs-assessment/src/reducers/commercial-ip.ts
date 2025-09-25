import type { LegalStructureNeedsAssessmentCommercialIpOperations } from "../../gen/commercial-ip/operations.js";

export const reducer: LegalStructureNeedsAssessmentCommercialIpOperations = {
    addCommercialActivityOperation(state, action, dispatch) {
        state.salesRevenue.commercialActivities.push({
            id: action.input.id,
            activityType: action.input.activityType,
            description: action.input.description || null
        });
    },
    addIpAssetOperation(state, action, dispatch) {
        state.ipManagement.ipAssets.push({
            id: action.input.id,
            assetType: action.input.assetType,
            description: action.input.description || null
        });
    },
    setIpManagementOperation(state, action, dispatch) {
        state.ipManagement.contributorsAssignIP = action.input.contributorsAssignIP;
        state.ipManagement.futureIPAssignment = action.input.futureIPAssignment;
        state.ipManagement.licensingPlans = action.input.licensingPlans || null;
    },
    addFundraisingActivityOperation(state, action, dispatch) {
        state.fundraising.activities.push({
            id: action.input.id,
            activityType: action.input.activityType,
            description: action.input.description || null
        });
        
        // Check if investment vehicle is required based on activity type
        const investmentTypes = ['equity', 'tokens', 'ico', 'saft', 'safe', 'warrants'];
        if (investmentTypes.some(type => 
            action.input.activityType.toLowerCase().includes(type)
        )) {
            state.fundraising.requiresInvestmentVehicle = true;
        }
    }
};
