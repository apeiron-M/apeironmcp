import type { LegalStructureNeedsAssessmentAssessmentOperations } from "../../gen/assessment/operations.js";

export const reducer: LegalStructureNeedsAssessmentAssessmentOperations = {
    calculateSuitabilityOperation(state, action, dispatch) {
        const score = state.suitabilityScore;
        
        // Check decentralization criteria
        score.decentralizationMet = state.strategicGoals.decentralizationCriteria.qualifiesAsDecentralized || false;
        
        // Check non-profit criteria
        const netScore = state.strategicGoals.nonProfitIndicators.nonProfitScore - 
                        state.strategicGoals.nonProfitIndicators.commercialScore;
        score.nonProfitMet = netScore >= 10;
        
        // Check operational needs (Swiss Association can handle all these)
        score.operationalNeedsMet = true;
        
        // Check if separate vehicle needed for fundraising
        score.requiresSeparateVehicle = state.fundraising.requiresInvestmentVehicle;
        
        // Determine overall suitability
        if (score.decentralizationMet && score.nonProfitMet && !score.requiresSeparateVehicle) {
            score.overallSuitability = "Highly Suitable";
        } else if (score.decentralizationMet && score.nonProfitMet && score.requiresSeparateVehicle) {
            score.overallSuitability = "Partially Suitable";
        } else if (!score.decentralizationMet || !score.nonProfitMet) {
            score.overallSuitability = "Not Ideal";
        } else {
            score.overallSuitability = "Requires Further Analysis";
        }
    },
    generateRecommendationsOperation(state, action, dispatch) {
        const score = state.suitabilityScore;
        const recommendations = [];
        
        if (!score.decentralizationMet) {
            recommendations.push("Consider restructuring to align with decentralization goals or explore traditional legal structures.");
        }
        
        if (!score.nonProfitMet) {
            recommendations.push("Refine organizational purpose and activities to meet non-profit criteria or consider for-profit structures.");
        }
        
        if (score.requiresSeparateVehicle) {
            recommendations.push("A separate investment vehicle will be needed for equity or token fundraising activities.");
        }
        
        if (state.operationalNeeds.financialInfrastructure.length > 3) {
            recommendations.push("Consider consolidating financial infrastructure for operational efficiency.");
        }
        
        if (state.governance.plansGovernanceTokens) {
            recommendations.push("Swiss Associations can issue governance tokens - ensure proper legal framework.");
        }
        
        score.recommendations = recommendations.join(" ");
        
        // Add additional considerations
        const considerations = [];
        if (state.ipManagement.ipAssets.length > 0) {
            considerations.push("IP management is suitable through Swiss Association with licensing considerations.");
        }
        if (state.operationalNeeds.contributorJurisdictions.length > 5) {
            considerations.push("Multiple jurisdictions present - ensure compliance with local labor laws.");
        }
        
        score.additionalConsiderations = considerations.join(" ");
    },
    completeAssessmentOperation(state, action, dispatch) {
        // Calculate suitability inline
        const score = state.suitabilityScore;
        
        // Check decentralization criteria
        score.decentralizationMet = state.strategicGoals.decentralizationCriteria.qualifiesAsDecentralized || false;
        
        // Check non-profit criteria
        const netScore = state.strategicGoals.nonProfitIndicators.nonProfitScore - 
                        state.strategicGoals.nonProfitIndicators.commercialScore;
        score.nonProfitMet = netScore >= 10;
        score.operationalNeedsMet = true;
        score.requiresSeparateVehicle = state.fundraising.requiresInvestmentVehicle;
        
        // Determine overall suitability
        if (score.decentralizationMet && score.nonProfitMet && !score.requiresSeparateVehicle) {
            score.overallSuitability = "Highly Suitable";
        } else if (score.decentralizationMet && score.nonProfitMet && score.requiresSeparateVehicle) {
            score.overallSuitability = "Partially Suitable";
        } else if (!score.decentralizationMet || !score.nonProfitMet) {
            score.overallSuitability = "Not Ideal";
        } else {
            score.overallSuitability = "Requires Further Analysis";
        }
        
        // Generate recommendations inline
        const recommendations = [];
        
        if (!score.decentralizationMet) {
            recommendations.push("Consider restructuring to align with decentralization goals or explore traditional legal structures.");
        }
        
        if (!score.nonProfitMet) {
            recommendations.push("Refine organizational purpose and activities to meet non-profit criteria or consider for-profit structures.");
        }
        
        if (score.requiresSeparateVehicle) {
            recommendations.push("A separate investment vehicle will be needed for equity or token fundraising activities.");
        }
        
        if (state.operationalNeeds.financialInfrastructure.length > 3) {
            recommendations.push("Consider consolidating financial infrastructure for operational efficiency.");
        }
        
        if (state.governance.plansGovernanceTokens) {
            recommendations.push("Swiss Associations can issue governance tokens - ensure proper legal framework.");
        }
        
        score.recommendations = recommendations.join(" ");
        
        // Add additional considerations
        const considerations = [];
        if (state.ipManagement.ipAssets.length > 0) {
            considerations.push("IP management is suitable through Swiss Association with licensing considerations.");
        }
        if (state.operationalNeeds.contributorJurisdictions.length > 5) {
            considerations.push("Multiple jurisdictions present - ensure compliance with local labor laws.");
        }
        
        score.additionalConsiderations = considerations.join(" ");
        
        // Mark assessment as complete
        state.assessmentCompleted = true;
        state.assessmentDate = new Date().toISOString();
    }
};
