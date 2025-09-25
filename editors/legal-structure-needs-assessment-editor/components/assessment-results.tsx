import React from "react";
import { Button } from "@powerhousedao/design-system";
import { Icon } from "@powerhousedao/design-system";
import type { LegalStructureAssessmentState } from "../../../document-models/legal-structure-needs-assessment/index.js";

interface AssessmentResultsProps {
  state: LegalStructureAssessmentState;
  dispatch: (action: any) => void;
  actions: any;
}

export function AssessmentResults({ state, dispatch, actions }: AssessmentResultsProps) {
  const { suitabilityScore } = state;

  const handleCompleteAssessment = () => {
    // Note: Schema is broken but operation exists, try to call it
    try {
      dispatch(actions.completeAssessment({}));
    } catch (error) {
      console.log("Complete assessment operation failed:", error);
      // Fallback: we could manually update the document state here if needed
    }
  };

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case "Highly Suitable":
        return "text-green-600 dark:text-green-400";
      case "Partially Suitable":
        return "text-yellow-600 dark:text-yellow-400";
      case "Not Ideal":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const getSuitabilityBg = (suitability: string) => {
    switch (suitability) {
      case "Highly Suitable":
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700";
      case "Partially Suitable":
        return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700";
      case "Not Ideal":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700";
      default:
        return "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-700";
    }
  };

  const getSuitabilityIcon = (suitability: string) => {
    switch (suitability) {
      case "Highly Suitable":
        return "CheckCircle";
      case "Partially Suitable":
        return "Exclamation";
      case "Not Ideal":
        return "CrossCircle";
      default:
        return "Clock";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Assessment Results
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Review your Swiss Association suitability assessment and recommendations
        </p>
      </div>

      {!state.assessmentCompleted && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Clock" className="text-blue-600 dark:text-blue-400" />
              <div>
                <h3 className="font-medium text-blue-900 dark:text-blue-100">
                  Assessment Not Complete
                </h3>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  Complete all sections and run the assessment to see your results.
                </p>
              </div>
            </div>
            <Button
              onClick={handleCompleteAssessment}
            >
              Complete Assessment
            </Button>
          </div>
        </div>
      )}

      {state.assessmentCompleted && (
        <>
          {/* Overall Suitability */}
          <div className={`rounded-lg border p-6 ${getSuitabilityBg(suitabilityScore.overallSuitability || "")}`}>
            <div className="flex items-center space-x-3 mb-4">
              <Icon 
                name={getSuitabilityIcon(suitabilityScore.overallSuitability || "")} 
                size="lg"
                className={getSuitabilityColor(suitabilityScore.overallSuitability || "")}
              />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Overall Suitability: {suitabilityScore.overallSuitability}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Decentralization</span>
                  {suitabilityScore.decentralizationMet ? (
                    <Icon name="CheckCircle" className="text-green-500" />
                  ) : (
                    <Icon name="Xmark" className="text-red-500" />
                  )}
                </div>
                <div className={`font-medium ${suitabilityScore.decentralizationMet ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                  {suitabilityScore.decentralizationMet ? "Met" : "Not Met"}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Non-Profit Criteria</span>
                  {suitabilityScore.nonProfitMet ? (
                    <Icon name="CheckCircle" className="text-green-500" />
                  ) : (
                    <Icon name="Xmark" className="text-red-500" />
                  )}
                </div>
                <div className={`font-medium ${suitabilityScore.nonProfitMet ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                  {suitabilityScore.nonProfitMet ? "Met" : "Not Met"}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Operational Needs</span>
                  {suitabilityScore.operationalNeedsMet ? (
                    <Icon name="CheckCircle" className="text-green-500" />
                  ) : (
                    <Icon name="Xmark" className="text-red-500" />
                  )}
                </div>
                <div className={`font-medium ${suitabilityScore.operationalNeedsMet ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                  {suitabilityScore.operationalNeedsMet ? "Met" : "Not Met"}
                </div>
              </div>
            </div>

            {suitabilityScore.requiresSeparateVehicle && (
              <div className="mb-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-600 rounded">
                <div className="flex items-center space-x-2">
                  <Icon name="Exclamation" size="sm" className="text-yellow-600 dark:text-yellow-400" />
                  <span className="text-yellow-800 dark:text-yellow-200 text-sm font-medium">
                    Separate Investment Vehicle Required
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Recommendations */}
          {suitabilityScore.recommendations && (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Recommendations
              </h3>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">
                  {suitabilityScore.recommendations}
                </p>
              </div>
            </div>
          )}

          {/* Additional Considerations */}
          {suitabilityScore.additionalConsiderations && (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Additional Considerations
              </h3>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">
                  {suitabilityScore.additionalConsiderations}
                </p>
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Assessment Summary
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Key Findings</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center space-x-2">
                    <Icon 
                      name={suitabilityScore.decentralizationMet ? "CheckCircle" : "Xmark"} 
                      size="xs"
                      className={suitabilityScore.decentralizationMet ? "text-green-500" : "text-red-500"}
                    />
                    <span>Decentralization criteria {suitabilityScore.decentralizationMet ? "satisfied" : "not satisfied"}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon 
                      name={suitabilityScore.nonProfitMet ? "CheckCircle" : "Xmark"} 
                      size="xs"
                      className={suitabilityScore.nonProfitMet ? "text-green-500" : "text-red-500"}
                    />
                    <span>Non-profit requirements {suitabilityScore.nonProfitMet ? "met" : "not met"}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size="xs" className="text-green-500" />
                    <span>Operational needs supported</span>
                  </li>
                  {suitabilityScore.requiresSeparateVehicle && (
                    <li className="flex items-center space-x-2">
                      <Icon name="Exclamation" size="xs" className="text-yellow-500" />
                      <span>Investment vehicle needed for fundraising</span>
                    </li>
                  )}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Assessment Details</h4>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <div>Completed: {new Date(state.assessmentDate || "").toLocaleDateString()}</div>
                  <div>Assessment ID: {state.organizationInfo.name || "Unnamed Organization"}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Button
                onClick={handleCompleteAssessment}
              >
                Refresh Assessment
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}