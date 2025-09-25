import type { LegalStructureNeedsAssessmentStrategicGoalsOperations } from "../../gen/strategic-goals/operations.js";

export const reducer: LegalStructureNeedsAssessmentStrategicGoalsOperations = {
    setDecentralizationCriteriaOperation(state, action, dispatch) {
        const criteria = state.strategicGoals.decentralizationCriteria;
        if (action.input.isDAO !== undefined && action.input.isDAO !== null) {
            criteria.isDAO = action.input.isDAO;
        }
        if (action.input.isNetwork !== undefined && action.input.isNetwork !== null) {
            criteria.isNetwork = action.input.isNetwork;
        }
        if (action.input.worksInDecentralized !== undefined && action.input.worksInDecentralized !== null) {
            criteria.worksInDecentralized = action.input.worksInDecentralized;
        }
        if (action.input.aspiresDecentralization !== undefined && action.input.aspiresDecentralization !== null) {
            criteria.aspiresDecentralization = action.input.aspiresDecentralization;
        }
        
        // Calculate if qualifies as decentralized
        criteria.qualifiesAsDecentralized = 
            criteria.isDAO || 
            criteria.isNetwork || 
            criteria.worksInDecentralized || 
            criteria.aspiresDecentralization || 
            false;
    },
    setNonprofitPurposeOperation(state, action, dispatch) {
        state.strategicGoals.nonProfitPurpose.primaryPurpose = action.input.primaryPurpose;
        state.strategicGoals.nonProfitPurpose.otherPurpose = action.input.otherPurpose || null;
    },
    setNonprofitIndicatorsOperation(state, action, dispatch) {
        const indicators = state.strategicGoals.nonProfitIndicators;
        
        if (action.input.reinvestsProfits !== undefined && action.input.reinvestsProfits !== null) {
            indicators.reinvestsProfits = action.input.reinvestsProfits;
        }
        if (action.input.benefitsPublic !== undefined && action.input.benefitsPublic !== null) {
            indicators.benefitsPublic = action.input.benefitsPublic;
        }
        if (action.input.revenueIsSecondary !== undefined && action.input.revenueIsSecondary !== null) {
            indicators.revenueIsSecondary = action.input.revenueIsSecondary;
        }
        if (action.input.distributeProfits !== undefined && action.input.distributeProfits !== null) {
            indicators.distributeProfits = action.input.distributeProfits;
        }
        if (action.input.membershipBenefits !== undefined && action.input.membershipBenefits !== null) {
            indicators.membershipBenefits = action.input.membershipBenefits;
        }
        if (action.input.commercialDominates !== undefined && action.input.commercialDominates !== null) {
            indicators.commercialDominates = action.input.commercialDominates;
        }
    },
    calculateNonprofitScoreOperation(state, action, dispatch) {
        const indicators = state.strategicGoals.nonProfitIndicators;
        let nonProfitScore = 0;
        let commercialScore = 0;
        
        // Calculate non-profit score (positive factors)
        if (indicators.reinvestsProfits) nonProfitScore += 20;
        if (indicators.benefitsPublic) nonProfitScore += 20;
        if (indicators.revenueIsSecondary) nonProfitScore += 20;
        
        // Calculate commercial score (negative factors)
        if (indicators.distributeProfits) commercialScore += 20;
        if (indicators.membershipBenefits) commercialScore += 20;
        if (indicators.commercialDominates) commercialScore += 20;
        
        indicators.nonProfitScore = nonProfitScore;
        indicators.commercialScore = commercialScore;
        
        const netScore = nonProfitScore - commercialScore;
        
        if (netScore >= 40) {
            indicators.overallAssessment = "Likely non-profit (80-100% positive)";
        } else if (netScore >= 10) {
            indicators.overallAssessment = "May qualify as non-profit (50-80% positive)";
        } else {
            indicators.overallAssessment = "Likely commercial (<50% positive)";
        }
    }
};
