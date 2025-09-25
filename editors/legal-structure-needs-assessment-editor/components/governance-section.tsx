import React from "react";
import { Textarea, Select } from "@powerhousedao/document-engineering";
import type { LegalStructureAssessmentState } from "../../../document-models/legal-structure-needs-assessment/index.js";
import { CheckboxGroup } from "./checkbox-group.js";

interface GovernanceSectionProps {
  state: LegalStructureAssessmentState;
  dispatch: (action: any) => void;
  actions: any;
}

export function GovernanceSection({ state, dispatch, actions }: GovernanceSectionProps) {
  const governance = state.governance;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Governance Framework
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Define your organization's governance structure and decision-making processes
        </p>
      </div>

      {/* Decision Making */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Decision Making Process
        </h2>
        
        <Textarea
          label="How are decisions made within your organization?"
          className="w-full"
          defaultValue={governance.decisionMaking || ""}
          onBlur={(e) => {
            if (e.target.value !== governance.decisionMaking) {
              dispatch(actions.setGovernanceFramework({
                decisionMaking: e.target.value,
                existingBylaws: governance.existingBylaws || false,
                bylawsDescription: governance.bylawsDescription,
                plansGovernanceTokens: governance.plansGovernanceTokens || false
              }));
            }
          }}
          placeholder="Describe your organization's decision-making process, voting mechanisms, consensus requirements, etc."
          rows={4}
        />
      </div>

      {/* Existing Bylaws */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Existing Governance Policies
        </h2>
        
        <div className="space-y-4">
          <CheckboxGroup
            options={[
              { key: "existingBylaws", label: "Are there existing bylaws or policies for governance?" }
            ]}
            values={{
              existingBylaws: governance.existingBylaws
            }}
            onChange={(values) => {
              dispatch(actions.setGovernanceFramework({
                decisionMaking: governance.decisionMaking || "",
                existingBylaws: values.existingBylaws || false,
                bylawsDescription: governance.bylawsDescription,
                plansGovernanceTokens: governance.plansGovernanceTokens || false
              }));
            }}
          />

          {governance.existingBylaws && (
            <Textarea
              label="Describe existing governance documents and policies"
              className="w-full"
              defaultValue={governance.bylawsDescription || ""}
              onBlur={(e) => {
                if (e.target.value !== governance.bylawsDescription) {
                  dispatch(actions.setGovernanceFramework({
                    decisionMaking: governance.decisionMaking || "",
                    existingBylaws: governance.existingBylaws,
                    bylawsDescription: e.target.value || null,
                    plansGovernanceTokens: governance.plansGovernanceTokens || false
                  }));
                }
              }}
              placeholder="Describe the existing bylaws, policies, or governance documents"
              rows={3}
            />
          )}
        </div>
      </div>

      {/* Governance Tokens */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Decentralized Governance
        </h2>
        
        <div className="space-y-4">
          <CheckboxGroup
            options={[
              { key: "plansGovernanceTokens", label: "Do you plan to issue governance tokens or enable decentralized decision-making?" }
            ]}
            values={{
              plansGovernanceTokens: governance.plansGovernanceTokens
            }}
            onChange={(values) => {
              dispatch(actions.setGovernanceFramework({
                decisionMaking: governance.decisionMaking || "",
                existingBylaws: governance.existingBylaws || false,
                bylawsDescription: governance.bylawsDescription,
                plansGovernanceTokens: values.plansGovernanceTokens || false
              }));
            }}
          />

          {governance.plansGovernanceTokens && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
              <p className="text-green-700 dark:text-green-300 text-sm">
                ✅ The Swiss Association can issue and distribute governance tokens. 
                This enables decentralized decision-making while maintaining legal compliance.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Governance Summary */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Governance Assessment Summary
        </h2>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Decision-making process defined</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              governance.decisionMaking 
                ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                : "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100"
            }`}>
              {governance.decisionMaking ? "Completed" : "Pending"}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Bylaws/policies documented</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              governance.existingBylaws !== null
                ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                : "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100"
            }`}>
              {governance.existingBylaws !== null ? 
                (governance.existingBylaws ? "Yes" : "No") : 
                "Pending"}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Governance tokens planned</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              governance.plansGovernanceTokens !== null
                ? governance.plansGovernanceTokens 
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100"
                : "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100"
            }`}>
              {governance.plansGovernanceTokens !== null ? 
                (governance.plansGovernanceTokens ? "Yes" : "No") : 
                "Pending"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}