import type { LegalStructureNeedsAssessmentGovernanceOperations } from "../../gen/governance/operations.js";

export const reducer: LegalStructureNeedsAssessmentGovernanceOperations = {
    setGovernanceFrameworkOperation(state, action, dispatch) {
        state.governance.decisionMaking = action.input.decisionMaking;
        state.governance.existingBylaws = action.input.existingBylaws;
        state.governance.bylawsDescription = action.input.bylawsDescription || null;
        state.governance.plansGovernanceTokens = action.input.plansGovernanceTokens;
    }
};
