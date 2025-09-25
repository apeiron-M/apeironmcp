import React, { useState } from "react";
import type { EditorProps } from "document-model";
import { useDocumentById } from "@powerhousedao/reactor-browser";
import { Button } from "@powerhousedao/design-system";
import type { 
  LegalStructureAssessmentState, 
  LegalStructureNeedsAssessmentDocument
} from "../../document-models/legal-structure-needs-assessment/index.js";
import { actions } from "../../document-models/legal-structure-needs-assessment/index.js";
import { OrganizationSection } from "./components/organization-section.js";
import { StrategicGoalsSection } from "./components/strategic-goals-section.js";
import { OperationalNeedsSection } from "./components/operational-needs-section.js";
import { CommercialSection } from "./components/commercial-section.js";
import { GovernanceSection } from "./components/governance-section.js";
import { AssessmentResults } from "./components/assessment-results.js";

export type IProps = EditorProps;

type Section = 
  | "organization" 
  | "strategic" 
  | "operational" 
  | "commercial" 
  | "governance" 
  | "assessment";

const sections: Array<{ key: Section; label: string }> = [
  { key: "organization", label: "Organization" },
  { key: "strategic", label: "Strategic Goals" },
  { key: "operational", label: "Operations" },
  { key: "commercial", label: "Commercial & IP" },
  { key: "governance", label: "Governance" },
  { key: "assessment", label: "Assessment" },
];

export default function Editor(props: IProps) {
  const { document: initialDocument } = props;
  const [document, dispatch] = useDocumentById(initialDocument.header.id);
  const typedDocument = document as LegalStructureNeedsAssessmentDocument;
  const [currentSection, setCurrentSection] = useState<Section>("organization");

  const state = typedDocument.state.global as LegalStructureAssessmentState;

  const renderSection = () => {
    switch (currentSection) {
      case "organization":
        return <OrganizationSection state={state} dispatch={dispatch} actions={actions} />;
      case "strategic":
        return <StrategicGoalsSection state={state} dispatch={dispatch} actions={actions} />;
      case "operational":
        return <OperationalNeedsSection state={state} dispatch={dispatch} actions={actions} />;
      case "commercial":
        return <CommercialSection state={state} dispatch={dispatch} actions={actions} />;
      case "governance":
        return <GovernanceSection state={state} dispatch={dispatch} actions={actions} />;
      case "assessment":
        return <AssessmentResults state={state} dispatch={dispatch} actions={actions} />;
      default:
        return <OrganizationSection state={state} dispatch={dispatch} actions={actions} />;
    }
  };

  return (
    <div className="flex h-full bg-gray-50 dark:bg-gray-900">
      {/* Simple Tab Navigation */}
      <nav className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Legal Structure Assessment
        </h2>
        
        <div className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => setCurrentSection(section.key)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentSection === section.key
                  ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-6">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}