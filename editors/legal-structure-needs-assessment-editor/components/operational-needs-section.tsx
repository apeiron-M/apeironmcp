import React from "react";
import { TextInput, Select } from "@powerhousedao/document-engineering";
import { Button } from "@powerhousedao/design-system";
import type { LegalStructureAssessmentState } from "../../../document-models/legal-structure-needs-assessment/index.js";
// Use crypto.randomUUID for ID generation
const generateId = () => crypto.randomUUID();
import { CheckboxGroup } from "./checkbox-group.js";
import { TagInput } from "./tag-input.js";

interface OperationalNeedsSectionProps {
  state: LegalStructureAssessmentState;
  dispatch: (action: any) => void;
  actions: any;
}

export function OperationalNeedsSection({ state, dispatch, actions }: OperationalNeedsSectionProps) {
  const operationalNeeds = state.operationalNeeds;

  const financialInfrastructureOptions = [
    "Bank account",
    "Offramp", 
    "Payment Channels",
    "Credit / Debit Card"
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Operational Needs
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Define your organization's operational requirements and infrastructure needs
        </p>
      </div>

      {/* Operational Activities */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Required Operational Activities
        </h2>
        
        <div className="space-y-4">
          <CheckboxGroup
            options={[
              { key: "procurement", label: "Sign contracts with contributors" },
              { key: "freelance", label: "Freelance / contractor agreements" },
              { key: "employment", label: "Employment agreements" },
              { key: "pay_contributors", label: "Pay contributors" },
              { key: "supplier_payments", label: "Engage and pay supplier fees and service providers' subscriptions" },
              { key: "receive_invoices", label: "Receive invoices from contributors" }
            ]}
            values={{
              procurement: operationalNeeds.activities.some(a => a.activityType === "procurement"),
              freelance: operationalNeeds.activities.some(a => a.activityType === "freelance"),
              employment: operationalNeeds.activities.some(a => a.activityType === "employment"),
              pay_contributors: operationalNeeds.activities.some(a => a.activityType === "pay_contributors"),
              supplier_payments: operationalNeeds.activities.some(a => a.activityType === "supplier_payments"),
              receive_invoices: operationalNeeds.activities.some(a => a.activityType === "receive_invoices")
            }}
            onChange={(values) => {
              // Handle add/remove activities based on checkbox state
              Object.entries(values).forEach(([key, selected]) => {
                const existingActivity = operationalNeeds.activities.find(a => a.activityType === key);
                
                if (selected && !existingActivity) {
                  // Add new activity when checked
                  dispatch(actions.addOperationalActivity({
                    id: generateId(),
                    activityType: key,
                    description: ""
                  }));
                } else if (!selected && existingActivity) {
                  // Remove activity when unchecked
                  dispatch(actions.deleteOperationalActivity({
                    id: existingActivity.id
                  }));
                }
              });
            }}
          />
        </div>
      </div>

      {/* Payment Requirements */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Payment Types & Currencies
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Payment Types</h3>
            <CheckboxGroup
              options={[
                { key: "contractor_fee", label: "Contractor fee" },
                { key: "salary", label: "Salary (employment)" },
                { key: "bonus", label: "Bonus payment" }
              ]}
              values={{
                contractor_fee: operationalNeeds.paymentRequirements.some(p => p.paymentType === "contractor_fee"),
                salary: operationalNeeds.paymentRequirements.some(p => p.paymentType === "salary"),
                bonus: operationalNeeds.paymentRequirements.some(p => p.paymentType === "bonus")
              }}
              onChange={(values) => {
                Object.entries(values).forEach(([key, selected]) => {
                  const existingRequirement = operationalNeeds.paymentRequirements.find(p => p.paymentType === key);
                  
                  if (selected && !existingRequirement) {
                    dispatch(actions.addPaymentRequirement({
                      id: generateId(),
                      paymentType: key,
                      currency: "fiat",
                      description: ""
                    }));
                  } else if (!selected && existingRequirement) {
                    dispatch(actions.deletePaymentRequirement({
                      id: existingRequirement.id
                    }));
                  }
                });
              }}
            />
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Payment Currencies</h3>
            <CheckboxGroup
              options={[
                { key: "fiat", label: "Fiat" },
                { key: "crypto", label: "Crypto" }
              ]}
              values={{
                fiat: operationalNeeds.paymentRequirements.some(p => p.currency === "fiat"),
                crypto: operationalNeeds.paymentRequirements.some(p => p.currency === "crypto")
              }}
              onChange={(values) => {
                Object.entries(values).forEach(([currency, selected]) => {
                  const existingRequirement = operationalNeeds.paymentRequirements.find(p => p.currency === currency);
                  
                  if (selected && !existingRequirement) {
                    dispatch(actions.addPaymentRequirement({
                      id: generateId(),
                      paymentType: "payment",
                      currency: currency,
                      description: ""
                    }));
                  } else if (!selected && existingRequirement) {
                    dispatch(actions.deletePaymentRequirement({
                      id: existingRequirement.id
                    }));
                  }
                });
              }}
            />
          </div>
        </div>
      </div>

      {/* Contributors & Jurisdictions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Team & Contributors
        </h2>
        
        <TagInput
          label="Contributor Jurisdictions"
          values={operationalNeeds.contributorJurisdictions}
          onChange={(jurisdictions) => {
            dispatch(actions.setContributorJurisdictions({ jurisdictions }));
          }}
          placeholder="Enter jurisdictions where your team and contributors are located"
          className="w-full"
        />
      </div>

      {/* Financial Infrastructure */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Financial Infrastructure
        </h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Required Financial Tools</h3>
            <CheckboxGroup
              options={financialInfrastructureOptions.map(option => ({
                key: option.toLowerCase().replace(/\s+/g, '_').replace(/\//g, '_'),
                label: option
              }))}
              values={Object.fromEntries(
                financialInfrastructureOptions.map(option => [
                  option.toLowerCase().replace(/\s+/g, '_').replace(/\//g, '_'),
                  operationalNeeds.financialInfrastructure.includes(option)
                ])
              )}
              onChange={(values) => {
                const selected = Object.entries(values)
                  .filter(([_, isSelected]) => isSelected)
                  .map(([key, _]) => {
                    return financialInfrastructureOptions.find(option => 
                      option.toLowerCase().replace(/\s+/g, '_').replace(/\//g, '_') === key
                    ) || key;
                  });
                  
                dispatch(actions.setFinancialInfrastructure({
                  infrastructure: selected,
                  requiresRedundancy: operationalNeeds.requiresRedundancy || false,
                  needsAttestationTool: operationalNeeds.needsAttestationTool || false
                }));
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Additional Requirements</h3>
              <CheckboxGroup
                options={[
                  { key: "redundancy", label: "Require redundancy in payment provider" },
                  { key: "attestation", label: "Need tool to attest work delivery/value (e.g. POWt)" }
                ]}
                values={{
                  redundancy: operationalNeeds.requiresRedundancy,
                  attestation: operationalNeeds.needsAttestationTool
                }}
                onChange={(values) => {
                  dispatch(actions.setFinancialInfrastructure({
                    infrastructure: operationalNeeds.financialInfrastructure,
                    requiresRedundancy: values.redundancy || false,
                    needsAttestationTool: values.attestation || false
                  }));
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Financial Metrics
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Monthly Revenue (approximate)"
            className="w-full"
            defaultValue={operationalNeeds.monthlyRevenue || ""}
            onBlur={(e) => {
              if (e.target.value !== operationalNeeds.monthlyRevenue) {
                dispatch(actions.setFinancialMetrics({
                  monthlyRevenue: e.target.value || null,
                  monthlyExpenses: operationalNeeds.monthlyExpenses
                }));
              }
            }}
            placeholder="e.g. $10,000"
          />

          <TextInput
            label="Monthly Expenses (approximate)"
            className="w-full"
            defaultValue={operationalNeeds.monthlyExpenses || ""}
            onBlur={(e) => {
              if (e.target.value !== operationalNeeds.monthlyExpenses) {
                dispatch(actions.setFinancialMetrics({
                  monthlyRevenue: operationalNeeds.monthlyRevenue,
                  monthlyExpenses: e.target.value || null
                }));
              }
            }}
            placeholder="e.g. $8,000"
          />
        </div>
      </div>
    </div>
  );
}