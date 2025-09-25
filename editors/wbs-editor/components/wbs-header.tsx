import React from "react";
import { TextInput, Textarea } from "@powerhousedao/document-engineering";
import { type WorkBreakdownStructureState } from "../../../document-models/work-breakdown-structure/gen/schema/types.js";
import { updateWbsInfo } from "../../../document-models/work-breakdown-structure/gen/creators.js";

interface WBSHeaderProps {
  state: WorkBreakdownStructureState;
  dispatch: (action: any) => void;
}

export function WBSHeader({ state, dispatch }: WBSHeaderProps) {
  const handleUpdateInfo = (field: keyof Pick<WorkBreakdownStructureState, "title" | "description">, value: any) => {
    dispatch(updateWbsInfo({
      [field]: value,
      updatedAt: new Date().toISOString()
    }));
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <TextInput
            label="Project Title"
            className="w-full"
            defaultValue={state.title || ""}
            onBlur={(e) => {
              if (e.target.value !== state.title) {
                handleUpdateInfo("title", e.target.value);
              }
            }}
          />
        </div>
        
        <div className="lg:col-span-2">
          <Textarea
            label="Description"
            className="w-full"
            defaultValue={state.description || ""}
            placeholder="Describe the work breakdown structure scope and objectives..."
            onBlur={(e) => {
              if (e.target.value !== state.description) {
                handleUpdateInfo("description", e.target.value);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}