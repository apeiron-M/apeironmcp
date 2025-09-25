import React from "react";
import { Select, TextInput, Textarea } from "@powerhousedao/document-engineering";
import { Button } from "@powerhousedao/design-system";
import type { LegalStructureAssessmentState } from "../../../document-models/legal-structure-needs-assessment/index.js";
import { CheckboxGroup } from "./checkbox-group.js";
import { ScoreCard } from "./score-card.js";

interface StrategicGoalsSectionProps {
  state: LegalStructureAssessmentState;
  dispatch: (action: any) => void;
  actions: any;
}

export function StrategicGoalsSection({ state, dispatch, actions }: StrategicGoalsSectionProps) {
  const decentralizationCriteria = state.strategicGoals.decentralizationCriteria;
  const nonProfitPurpose = state.strategicGoals.nonProfitPurpose;
  const indicators = state.strategicGoals.nonProfitIndicators;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Strategic Goals
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Evaluate your organization's decentralization and non-profit characteristics
        </p>
      </div>

      {/* Decentralization Criteria */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Decentralization Criteria
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Would you describe your project as any of the following? (Select all that apply)
        </p>
        
        <CheckboxGroup
          options={[
            { key: "isDAO", label: "A DAO, or a project that intends to bootstrap a DAO" },
            { key: "isNetwork", label: "A network or a project that intends to bootstrap a network organization" },
            { key: "worksInDecentralized", label: "A project that primarily works in a decentralized ecosystem or has a DAO as the primary funding source" },
            { key: "aspiresDecentralization", label: "A project that aspires to decentralize operations or governance" }
          ]}
          values={{
            isDAO: decentralizationCriteria.isDAO,
            isNetwork: decentralizationCriteria.isNetwork,
            worksInDecentralized: decentralizationCriteria.worksInDecentralized,
            aspiresDecentralization: decentralizationCriteria.aspiresDecentralization
          }}
          onChange={(values) => {
            dispatch(actions.setDecentralizationCriteria(values));
          }}
        />

        {decentralizationCriteria.qualifiesAsDecentralized && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
            <p className="text-green-700 dark:text-green-300 text-sm">
              ✓ Swiss association as a general-purpose multisig legal wrapper is a suitable instrument.
            </p>
          </div>
        )}
      </div>

      {/* Non-Profit Purpose */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Non-For-Profit Purpose
        </h2>
        
        <div className="space-y-4">
          <Select
            label="Primary Purpose (Select the option that best matches your goals)"
            options={[
              { label: "Select primary purpose...", value: "" },
              { label: "Promoting charitable, cultural, educational, or scientific activities", value: "charitable_cultural_educational_scientific" },
              { label: "Providing services or goods for community benefit without distributing profits to shareholders", value: "community_benefit" },
              { label: "Developing Open Source Software (OSS) or any other public good", value: "open_source_public_good" },
              { label: "Other", value: "other" }
            ]}
            value={nonProfitPurpose.primaryPurpose || ""}
            onChange={(value) => {
              dispatch(actions.setNonprofitPurpose({
                primaryPurpose: value,
                otherPurpose: nonProfitPurpose.otherPurpose
              }));
            }}
          />

          {nonProfitPurpose.primaryPurpose === "other" && (
            <TextInput
              label="Please describe your primary purpose"
              className="w-full"
              defaultValue={nonProfitPurpose.otherPurpose || ""}
              onBlur={(e) => {
                if (e.target.value !== nonProfitPurpose.otherPurpose) {
                  dispatch(actions.setNonprofitPurpose({
                    primaryPurpose: nonProfitPurpose.primaryPurpose,
                    otherPurpose: e.target.value || null
                  }));
                }
              }}
              placeholder="Describe your organization's primary purpose"
            />
          )}
        </div>
      </div>

      {/* Non-Profit Indicators */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Non-Profit vs Commercial Assessment
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Which characteristics apply to your organization?
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              Non-Profit Indicators (Positive Factors)
            </h3>
            <CheckboxGroup
              options={[
                { key: "reinvestsProfits", label: "Profits, if any, will be entirely reinvested into the mission" },
                { key: "benefitsPublic", label: "The purpose primarily benefits the public" },
                { key: "revenueIsSecondary", label: "Any generated revenue supports the primary purpose and is secondary" }
              ]}
              values={{
                reinvestsProfits: indicators.reinvestsProfits,
                benefitsPublic: indicators.benefitsPublic,
                revenueIsSecondary: indicators.revenueIsSecondary
              }}
              onChange={(values) => {
                dispatch(actions.setNonprofitIndicators({
                  ...values,
                  distributeProfits: indicators.distributeProfits,
                  membershipBenefits: indicators.membershipBenefits,
                  commercialDominates: indicators.commercialDominates
                }));
              }}
            />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              Commercial Indicators (Negative Factors)
            </h3>
            <CheckboxGroup
              options={[
                { key: "distributeProfits", label: "The organization aims to distribute profits to members or stakeholders" },
                { key: "membershipBenefits", label: "Membership fees, services, or activities primarily benefit members" },
                { key: "commercialDominates", label: "Commercial activities dominate over charitable or public-interest work" }
              ]}
              values={{
                distributeProfits: indicators.distributeProfits,
                membershipBenefits: indicators.membershipBenefits,
                commercialDominates: indicators.commercialDominates
              }}
              onChange={(values) => {
                dispatch(actions.setNonprofitIndicators({
                  reinvestsProfits: indicators.reinvestsProfits,
                  benefitsPublic: indicators.benefitsPublic,
                  revenueIsSecondary: indicators.revenueIsSecondary,
                  ...values
                }));
              }}
            />
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => {
                // Note: Schema is broken but operation exists, so try to call it with empty input
                try {
                  dispatch(actions.calculateNonprofitScore({}));
                } catch (error) {
                  console.log("Calculate non-profit score operation failed:", error);
                }
              }}
            >
              Calculate Score
            </Button>
          </div>

          {indicators.overallAssessment && (
            <ScoreCard
              nonProfitScore={indicators.nonProfitScore || 0}
              commercialScore={indicators.commercialScore || 0}
              assessment={indicators.overallAssessment}
            />
          )}
        </div>
      </div>
    </div>
  );
}