// TODO: remove eslint-disable rules once refactor is done
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  type StateReducer,
  isDocumentAction,
  createReducer,
} from "document-model";
import { type LegalStructureNeedsAssessmentDocument, z } from "./types.js";

import { reducer as OrganizationReducer } from "../src/reducers/organization.js";
import { reducer as StrategicGoalsReducer } from "../src/reducers/strategic-goals.js";
import { reducer as OperationalNeedsReducer } from "../src/reducers/operational-needs.js";
import { reducer as CommercialIpReducer } from "../src/reducers/commercial-ip.js";
import { reducer as GovernanceReducer } from "../src/reducers/governance.js";
import { reducer as AssessmentReducer } from "../src/reducers/assessment.js";

const stateReducer: StateReducer<LegalStructureNeedsAssessmentDocument> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }

  switch (action.type) {
    case "SET_ORGANIZATION_NAME":
      z.SetOrganizationNameInputSchema().parse(action.input);
      OrganizationReducer.setOrganizationNameOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_MULTISIG_WALLET":
      z.AddMultisigWalletInputSchema().parse(action.input);
      OrganizationReducer.addMultisigWalletOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_EXISTING_ENTITY":
      z.AddExistingEntityInputSchema().parse(action.input);
      OrganizationReducer.addExistingEntityOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_CONTRIBUTOR_ENTITY":
      z.AddContributorEntityInputSchema().parse(action.input);
      OrganizationReducer.addContributorEntityOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_CONTRACT_ENGAGEMENT":
      z.AddContractEngagementInputSchema().parse(action.input);
      OrganizationReducer.addContractEngagementOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_FINANCIAL_TOOL":
      z.AddFinancialToolInputSchema().parse(action.input);
      OrganizationReducer.addFinancialToolOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_COMPLIANCE_INFO":
      z.SetComplianceInfoInputSchema().parse(action.input);
      OrganizationReducer.setComplianceInfoOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_DECENTRALIZATION_CRITERIA":
      z.SetDecentralizationCriteriaInputSchema().parse(action.input);
      StrategicGoalsReducer.setDecentralizationCriteriaOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_NONPROFIT_PURPOSE":
      z.SetNonprofitPurposeInputSchema().parse(action.input);
      StrategicGoalsReducer.setNonprofitPurposeOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_NONPROFIT_INDICATORS":
      z.SetNonprofitIndicatorsInputSchema().parse(action.input);
      StrategicGoalsReducer.setNonprofitIndicatorsOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "CALCULATE_NONPROFIT_SCORE":
      z.CalculateNonprofitScoreInputSchema().parse(action.input);
      StrategicGoalsReducer.calculateNonprofitScoreOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_OPERATIONAL_ACTIVITY":
      z.AddOperationalActivityInputSchema().parse(action.input);
      OperationalNeedsReducer.addOperationalActivityOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_PAYMENT_REQUIREMENT":
      z.AddPaymentRequirementInputSchema().parse(action.input);
      OperationalNeedsReducer.addPaymentRequirementOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_CONTRIBUTOR_JURISDICTIONS":
      z.SetContributorJurisdictionsInputSchema().parse(action.input);
      OperationalNeedsReducer.setContributorJurisdictionsOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_FINANCIAL_INFRASTRUCTURE":
      z.SetFinancialInfrastructureInputSchema().parse(action.input);
      OperationalNeedsReducer.setFinancialInfrastructureOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_FINANCIAL_METRICS":
      z.SetFinancialMetricsInputSchema().parse(action.input);
      OperationalNeedsReducer.setFinancialMetricsOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_COMMERCIAL_ACTIVITY":
      z.AddCommercialActivityInputSchema().parse(action.input);
      CommercialIpReducer.addCommercialActivityOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_IP_ASSET":
      z.AddIpAssetInputSchema().parse(action.input);
      CommercialIpReducer.addIpAssetOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_IP_MANAGEMENT":
      z.SetIpManagementInputSchema().parse(action.input);
      CommercialIpReducer.setIpManagementOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_FUNDRAISING_ACTIVITY":
      z.AddFundraisingActivityInputSchema().parse(action.input);
      CommercialIpReducer.addFundraisingActivityOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "SET_GOVERNANCE_FRAMEWORK":
      z.SetGovernanceFrameworkInputSchema().parse(action.input);
      GovernanceReducer.setGovernanceFrameworkOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "CALCULATE_SUITABILITY":
      z.CalculateSuitabilityInputSchema().parse(action.input);
      AssessmentReducer.calculateSuitabilityOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "GENERATE_RECOMMENDATIONS":
      z.GenerateRecommendationsInputSchema().parse(action.input);
      AssessmentReducer.generateRecommendationsOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "COMPLETE_ASSESSMENT":
      z.CompleteAssessmentInputSchema().parse(action.input);
      AssessmentReducer.completeAssessmentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    default:
      return state;
  }
};

export const reducer =
  createReducer<LegalStructureNeedsAssessmentDocument>(stateReducer);
