import React, { useMemo } from "react";
import { ObjectSetTable, type ColumnDef, type ColumnAlignment } from "@powerhousedao/document-engineering";
import type { MultisigWallet } from "../../../document-models/legal-structure-needs-assessment/index.js";

interface MultisigTableProps {
  wallets: MultisigWallet[];
  dispatch: (action: any) => void;
  actions: any;
}

export function MultisigTable({ wallets, dispatch, actions }: MultisigTableProps) {
  const columns = useMemo<Array<ColumnDef<MultisigWallet>>>(
    () => [
      {
        field: "chain",
        title: "Blockchain",
        editable: true,
        align: "left" as ColumnAlignment,
        onSave: (newValue, context) => {
          dispatch(actions.addMultisigWallet({
            id: context.row.id,
            chain: newValue || null,
            ownershipStructure: context.row.ownershipStructure || null
          }));
          return true;
        },
        renderCell: (value) => (
          <span className="font-mono text-sm">
            {value || <span className="text-gray-400">Not specified</span>}
          </span>
        ),
      },
      {
        field: "ownershipStructure", 
        title: "Ownership Structure",
        editable: true,
        align: "left" as ColumnAlignment,
        onSave: (newValue, context) => {
          dispatch(actions.addMultisigWallet({
            id: context.row.id,
            chain: context.row.chain || null,
            ownershipStructure: newValue || null
          }));
          return true;
        },
      },
    ],
    [dispatch, actions]
  );

  return (
    <div>
      {wallets.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <div className="mb-2">
            <span className="text-2xl">💳</span>
          </div>
          <p>No multisig wallets added yet.</p>
          <p className="text-sm">Click "Add Wallet" to get started.</p>
        </div>
      ) : (
        <ObjectSetTable
          data={wallets}
          columns={columns}
          onAdd={() => {
            // This will be handled by the parent component's Add button
          }}
          onDelete={(wallet) => {
            // Since we can't modify generated reducers, we'll use our custom delete action
            // This will create a revision history entry for the deletion
            const walletToDelete = wallet as unknown as MultisigWallet;
            
            try {
              dispatch(actions.deleteMultisigWallet({ id: walletToDelete.id }));
            } catch (error) {
              console.log("Delete operation failed, wallet may not be properly removed:", error);
              // Fallback: force re-render to reflect UI change
              console.log(`Attempted to delete wallet: ${walletToDelete.id}`);
            }
          }}
        />
      )}
    </div>
  );
}