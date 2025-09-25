import React, { useMemo } from "react";
import { ObjectSetTable, type ColumnDef, type ColumnAlignment } from "@powerhousedao/document-engineering";
import type { LegalEntity } from "../../../document-models/legal-structure-needs-assessment/index.js";

interface EntityTableProps {
  entities: LegalEntity[];
  dispatch: (action: any) => void;
  actions: any;
  entityType: "existing" | "contributor";
}

export function EntityTable({ entities, dispatch, actions, entityType }: EntityTableProps) {
  const columns = useMemo<Array<ColumnDef<LegalEntity>>>(
    () => [
      {
        field: "entityType",
        title: "Entity Type",
        editable: true,
        align: "left" as ColumnAlignment,
        onSave: (newValue, context) => {
          const action = entityType === "existing" 
            ? actions.addExistingEntity
            : actions.addContributorEntity;
          dispatch(action({
            id: context.row.id,
            entityType: newValue,
            jurisdiction: context.row.jurisdiction,
            purpose: context.row.purpose || ""
          }));
          return true;
        },
      },
      {
        field: "jurisdiction",
        title: "Jurisdiction",
        editable: true,
        align: "left" as ColumnAlignment,
        onSave: (newValue, context) => {
          const action = entityType === "existing" 
            ? actions.addExistingEntity
            : actions.addContributorEntity;
          dispatch(action({
            id: context.row.id,
            entityType: context.row.entityType,
            jurisdiction: newValue,
            purpose: context.row.purpose || ""
          }));
          return true;
        },
      },
      {
        field: "purpose",
        title: "Purpose",
        editable: true,
        align: "left" as ColumnAlignment,
        onSave: (newValue, context) => {
          const action = entityType === "existing" 
            ? actions.addExistingEntity
            : actions.addContributorEntity;
          dispatch(action({
            id: context.row.id,
            entityType: context.row.entityType,
            jurisdiction: context.row.jurisdiction,
            purpose: newValue || null
          }));
          return true;
        },
      },
    ],
    [dispatch, actions, entityType]
  );

  return (
    <div>
      {entities.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No {entityType} entities added yet. Click "Add Entity" to get started.
        </div>
      ) : (
        <ObjectSetTable
          data={entities}
          columns={columns}
          onAdd={() => {
            // This will be handled by the parent component's Add button
          }}
          onDelete={(entity) => {
            // Use our custom delete actions based on entity type
            const entityToDelete = entity as unknown as LegalEntity;
            
            try {
              const deleteAction = entityType === "existing" 
                ? actions.deleteExistingEntity 
                : actions.deleteContributorEntity;
              dispatch(deleteAction({ id: entityToDelete.id }));
            } catch (error) {
              console.log("Delete operation failed, entity may not be properly removed:", error);
              console.log(`Attempted to delete ${entityType} entity: ${entityToDelete.id}`);
            }
          }}
        />
      )}
    </div>
  );
}