import { createAction } from "document-model";
import {
  z,
  type AddOperationalActivityInput,
  type AddPaymentRequirementInput,
  type SetContributorJurisdictionsInput,
  type SetFinancialInfrastructureInput,
  type SetFinancialMetricsInput,
} from "../types.js";
import {
  type AddOperationalActivityAction,
  type AddPaymentRequirementAction,
  type SetContributorJurisdictionsAction,
  type SetFinancialInfrastructureAction,
  type SetFinancialMetricsAction,
} from "./actions.js";

export const addOperationalActivity = (input: AddOperationalActivityInput) =>
  createAction<AddOperationalActivityAction>(
    "ADD_OPERATIONAL_ACTIVITY",
    { ...input },
    undefined,
    z.AddOperationalActivityInputSchema,
    "global",
  );

export const addPaymentRequirement = (input: AddPaymentRequirementInput) =>
  createAction<AddPaymentRequirementAction>(
    "ADD_PAYMENT_REQUIREMENT",
    { ...input },
    undefined,
    z.AddPaymentRequirementInputSchema,
    "global",
  );

export const setContributorJurisdictions = (
  input: SetContributorJurisdictionsInput,
) =>
  createAction<SetContributorJurisdictionsAction>(
    "SET_CONTRIBUTOR_JURISDICTIONS",
    { ...input },
    undefined,
    z.SetContributorJurisdictionsInputSchema,
    "global",
  );

export const setFinancialInfrastructure = (
  input: SetFinancialInfrastructureInput,
) =>
  createAction<SetFinancialInfrastructureAction>(
    "SET_FINANCIAL_INFRASTRUCTURE",
    { ...input },
    undefined,
    z.SetFinancialInfrastructureInputSchema,
    "global",
  );

export const setFinancialMetrics = (input: SetFinancialMetricsInput) =>
  createAction<SetFinancialMetricsAction>(
    "SET_FINANCIAL_METRICS",
    { ...input },
    undefined,
    z.SetFinancialMetricsInputSchema,
    "global",
  );
