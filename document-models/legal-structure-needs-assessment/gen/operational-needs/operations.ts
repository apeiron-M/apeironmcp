import { type SignalDispatch } from "document-model";
import {
  type AddOperationalActivityAction,
  type AddPaymentRequirementAction,
  type SetContributorJurisdictionsAction,
  type SetFinancialInfrastructureAction,
  type SetFinancialMetricsAction,
} from "./actions.js";
import { type LegalStructureNeedsAssessmentState } from "../types.js";

export interface LegalStructureNeedsAssessmentOperationalNeedsOperations {
  addOperationalActivityOperation: (
    state: LegalStructureNeedsAssessmentState,
    action: AddOperationalActivityAction,
    dispatch?: SignalDispatch,
  ) => void;
  addPaymentRequirementOperation: (
    state: LegalStructureNeedsAssessmentState,
    action: AddPaymentRequirementAction,
    dispatch?: SignalDispatch,
  ) => void;
  setContributorJurisdictionsOperation: (
    state: LegalStructureNeedsAssessmentState,
    action: SetContributorJurisdictionsAction,
    dispatch?: SignalDispatch,
  ) => void;
  setFinancialInfrastructureOperation: (
    state: LegalStructureNeedsAssessmentState,
    action: SetFinancialInfrastructureAction,
    dispatch?: SignalDispatch,
  ) => void;
  setFinancialMetricsOperation: (
    state: LegalStructureNeedsAssessmentState,
    action: SetFinancialMetricsAction,
    dispatch?: SignalDispatch,
  ) => void;
}
