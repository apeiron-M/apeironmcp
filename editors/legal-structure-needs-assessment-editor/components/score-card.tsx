import React from "react";
import { Icon } from "@powerhousedao/design-system";

interface ScoreCardProps {
  nonProfitScore: number;
  commercialScore: number;
  assessment: string;
}

export function ScoreCard({ nonProfitScore, commercialScore, assessment }: ScoreCardProps) {
  const netScore = nonProfitScore - commercialScore;
  
  const getScoreColor = (score: number) => {
    if (score >= 40) return "text-green-600 dark:text-green-400";
    if (score >= 10) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 40) return "CheckCircle";
    if (score >= 10) return "Exclamation";
    return "CrossCircle";
  };

  const getBgColor = (score: number) => {
    if (score >= 40) return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700";
    if (score >= 10) return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700";
    return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700";
  };

  return (
    <div className={`p-6 rounded-lg border ${getBgColor(netScore)}`}>
      <div className="flex items-center space-x-3 mb-4">
        <Icon 
          name={getScoreIcon(netScore)} 
          size="lg" 
          className={getScoreColor(netScore)}
        />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Assessment Results
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {nonProfitScore}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Non-Profit Score
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            -{commercialScore}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Commercial Score
          </div>
        </div>
        
        <div className="text-center">
          <div className={`text-2xl font-bold ${getScoreColor(netScore)}`}>
            {netScore >= 0 ? '+' : ''}{netScore}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Net Score
          </div>
        </div>
      </div>

      <div className={`text-center font-medium ${getScoreColor(netScore)}`}>
        {assessment}
      </div>

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <p className="mb-2">
          <strong>Scoring Guide:</strong>
        </p>
        <ul className="space-y-1 text-xs">
          <li>• <span className="text-green-600 dark:text-green-400">80-100% Positive:</span> Likely classified as non-profit under Swiss law</li>
          <li>• <span className="text-yellow-600 dark:text-yellow-400">50-80% Positive:</span> May qualify but should refine statutes or operational alignment</li>
          <li>• <span className="text-red-600 dark:text-red-400">&lt;50% Positive:</span> Likely considered commercial, adjustments needed</li>
        </ul>
      </div>
    </div>
  );
}