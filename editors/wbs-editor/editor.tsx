import React, { useState } from "react";
import { useDocumentById } from "@powerhousedao/reactor-browser";
import type { EditorProps } from "document-model";
import { SidebarProvider } from "@powerhousedao/document-engineering";
import { type WorkBreakdownStructureDocument } from "../../document-models/work-breakdown-structure/gen/index.js";
import { TasksView } from "./components/tasks-view.js";
import { TeamView } from "./components/team-view.js";
import { DependenciesView } from "./components/dependencies-view.js";
import { WBSHeader } from "./components/wbs-header.js";
import { WBSSidebar } from "./components/wbs-sidebar.js";

type ActiveView = "tasks" | "team" | "dependencies";

export default function Editor(props: EditorProps) {
  const { document: initialDocument } = props;
  const [document, dispatch] = useDocumentById(initialDocument.header.id);
  const typedDocument = document as WorkBreakdownStructureDocument;
  const [activeView, setActiveView] = useState<ActiveView>("tasks");
  
  const state = typedDocument.state.global;

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <WBSSidebar 
          activeView={activeView}
          onViewChange={setActiveView}
          tasksCount={state.tasks?.length || 0}
          teamCount={state.teamMembers?.length || 0}
          deliverablesCount={state.deliverables?.length || 0}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <WBSHeader 
            state={state}
            dispatch={dispatch}
          />
          
          <main className="flex-1 overflow-auto p-6">
            {activeView === "tasks" && (
              <TasksView 
                state={state}
                dispatch={dispatch}
              />
            )}
            {activeView === "team" && (
              <TeamView 
                state={state}
                dispatch={dispatch}
              />
            )}
            {activeView === "dependencies" && (
              <DependenciesView 
                state={state}
                dispatch={dispatch}
              />
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}