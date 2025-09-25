import React, { useMemo, useState } from "react";
import { ObjectSetTable, type ColumnDef, type ColumnAlignment, TextInput } from "@powerhousedao/document-engineering";
import { Button } from "@powerhousedao/design-system";
import { Icon } from "@powerhousedao/design-system";
import { type WorkBreakdownStructureState, type TeamMember } from "../../../document-models/work-breakdown-structure/gen/schema/types.js";
import { addTeamMember, updateTeamMember, removeTeamMember } from "../../../document-models/work-breakdown-structure/gen/creators.js";
import { TeamMemberForm } from "./team-member-form.js";

interface TeamViewProps {
  state: WorkBreakdownStructureState;
  dispatch: (action: any) => void;
}

export function TeamView({ state, dispatch }: TeamViewProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showMemberForm, setShowMemberForm] = useState(false);

  const generateId = () => crypto.randomUUID();

  const handleCreateMember = () => {
    setSelectedMember(null);
    setShowMemberForm(true);
  };

  const handleEditMember = (member: TeamMember) => {
    setSelectedMember(member);
    setShowMemberForm(true);
  };

  const handleDeleteMember = (memberId: string) => {
    dispatch(removeTeamMember({ 
      memberId, 
      updatedAt: new Date().toISOString() 
    }));
  };

  const handleToggleActive = (memberId: string, isActive: boolean) => {
    dispatch(updateTeamMember({
      memberId,
      isActive: !isActive,
      updatedAt: new Date().toISOString()
    }));
  };

  const columns = useMemo<Array<ColumnDef<TeamMember>>>(
    () => [
      {
        field: "name",
        title: "Name",
        editable: true,
        align: "left" as ColumnAlignment,
        width: 200,
        onSave: (newValue, context) => {
          dispatch(updateTeamMember({
            memberId: (context as any).row.id,
            name: newValue as string,
            updatedAt: new Date().toISOString()
          }));
          return true;
        },
      },
      {
        field: "email",
        title: "Email",
        editable: true,
        align: "left" as ColumnAlignment,
        width: 250,
        onSave: (newValue, context) => {
          dispatch(updateTeamMember({
            memberId: (context as any).row.id,
            email: (newValue as string) || null,
            updatedAt: new Date().toISOString()
          }));
          return true;
        },
      },
      {
        field: "role",
        title: "Role",
        editable: true,
        align: "left" as ColumnAlignment,
        width: 150,
        onSave: (newValue, context) => {
          dispatch(updateTeamMember({
            memberId: (context as any).row.id,
            role: (newValue as string) || null,
            updatedAt: new Date().toISOString()
          }));
          return true;
        },
      },
      {
        field: "isActive",
        title: "Status",
        editable: false,
        align: "center" as ColumnAlignment,
        width: 100,
        renderCell: (value, row) => (
          <button
            onClick={() => handleToggleActive((row as any).id, value as boolean)}
            className={`
              px-3 py-1 rounded-full text-xs font-medium transition-colors
              ${value 
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
              }
            `}
          >
            {value ? "Active" : "Inactive"}
          </button>
        ),
      },
      {
        field: "joinedAt",
        title: "Joined",
        editable: false,
        align: "center" as ColumnAlignment,
        width: 120,
        renderCell: (value) => (
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {new Date(value).toLocaleDateString()}
          </span>
        ),
      },
      {
        field: "actions",
        title: "Actions",
        editable: false,
        align: "center" as ColumnAlignment,
        width: 120,
        renderCell: (_, row) => (
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => handleEditMember(row as any)}
              className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 rounded"
              aria-label="Edit member"
            >
              <span className="text-xs">✏️</span>
            </button>
            <button
              onClick={() => handleDeleteMember((row as any).id)}
              className="p-1 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded"
              aria-label="Remove member"
            >
              <span className="text-xs">🗑️</span>
            </button>
          </div>
        ),
      },
    ],
    [dispatch]
  );

  const teamMembers = state.teamMembers || [];

  const handleAddMember = () => {
    dispatch(addTeamMember({
      id: generateId(),
      name: "New Team Member",
      joinedAt: new Date().toISOString()
    }));
  };

  // Calculate task assignments for each member
  const getMemberTaskCount = (memberId: string) => {
    // TODO: Task assignments not implemented in current schema
    return 0;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Team Members ({teamMembers.length})
        </h2>
        <Button
          onClick={handleCreateMember}
          className="flex items-center space-x-2"
        >
          <span className="text-sm">➕</span>
          <span>Add Member</span>
        </Button>
      </div>

      {teamMembers.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-gray-500 dark:text-gray-400 text-xl">👥</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No team members yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Add team members to assign tasks and track workload.
          </p>
          <Button onClick={handleCreateMember}>
            <span className="text-sm mr-2">➕</span>
            Add First Member
          </Button>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <ObjectSetTable
            data={teamMembers.map(member => ({
              ...member,
              taskCount: getMemberTaskCount(member.id)
            }))}
            columns={[
              ...columns,
              {
                field: "taskCount",
                title: "Tasks",
                editable: false,
                align: "center" as ColumnAlignment,
                width: 80,
                renderCell: (value) => (
                  <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full">
                    {value}
                  </span>
                ),
              }
            ]}
            onAdd={handleAddMember}
            onDelete={(member) => handleDeleteMember((member as any).id)}
          />
        </div>
      )}

      {showMemberForm && (
        <TeamMemberForm
          member={selectedMember}
          dispatch={dispatch}
          onClose={() => setShowMemberForm(false)}
        />
      )}
    </div>
  );
}