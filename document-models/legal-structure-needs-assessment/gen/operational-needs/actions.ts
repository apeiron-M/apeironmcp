import { type Action } from "document-model";
import type {
  AddOperationalActivityInput,
  AddPaymentRequirementInput,
  SetContributorJurisdictionsInput,
  SetFinancialInfrastructureInput,
  SetFinancialMetricsInput,
} from "../types.js";

export type AddOperationalActivityAction = Action & {
  type: "ADD_OPERATIONAL_ACTIVITY";
  input: AddOperationalActivityInput;
};
export type AddPaymentRequirementAction = Action & {
  type: "ADD_PAYMENT_REQUIREMENT";
  input: AddPaymentRequirementInput;
};
export type SetContributorJurisdictionsAction = Action & {
  type: "SET_CONTRIBUTOR_JURISDICTIONS";
  input: SetContributorJurisdictionsInput;
};
export type SetFinancialInfrastructureAction = Action & {
  type: "SET_FINANCIAL_INFRASTRUCTURE";
  input: SetFinancialInfrastructureInput;
};
export type SetFinancialMetricsAction = Action & {
  type: "SET_FINANCIAL_METRICS";
  input: SetFinancialMetricsInput;
};

export type LegalStructureNeedsAssessmentOperationalNeedsAction =
  | AddOperationalActivityAction
  | AddPaymentRequirementAction
  | SetContributorJurisdictionsAction
  | SetFinancialInfrastructureAction
  | SetFinancialMetricsAction;
