import React from "react";
import { TextInput, Textarea } from "@powerhousedao/document-engineering";
import { Button } from "@powerhousedao/design-system";
import type { LegalStructureAssessmentState } from "../../../document-models/legal-structure-needs-assessment/index.js";
// Use crypto.randomUUID for ID generation
const generateId = () => crypto.randomUUID();
import { EntityTable } from "./entity-table.js";
import { MultisigTable } from "./multisig-table.js";

interface OrganizationSectionProps {
  state: LegalStructureAssessmentState;
  dispatch: (action: any) => void;
  actions: any;
}

export function OrganizationSection({ state, dispatch, actions }: OrganizationSectionProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Organization Information
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Basic information about your organization and existing structures
        </p>
      </div>

      {/* Organization Name */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Basic Information
        </h2>
        
        <div className="space-y-4">
          <TextInput
            label="Organization or Project Name"
            className="w-full"
            defaultValue={state.organizationInfo.name || ""}
            onBlur={(e) => {
              if (e.target.value !== state.organizationInfo.name) {
                dispatch(actions.setOrganizationName({ name: e.target.value }));
              }
            }}
            placeholder="Enter your organization or project name"
          />
        </div>
      </div>

      {/* Multisig Wallets */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Multi-signature Wallets
          </h2>
          <Button
            size="small"
            onClick={() => {
              dispatch(actions.addMultisigWallet({
                id: generateId(),
                chain: "",
                ownershipStructure: ""
              }));
            }}
          >
            Add Wallet
          </Button>
        </div>
        
        <MultisigTable
          wallets={state.organizationInfo.multisigWallets}
          dispatch={dispatch}
          actions={actions}
        />
      </div>

      {/* Existing Legal Entities */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Existing Legal Entities
          </h2>
          <Button
             
            size="small"
            onClick={() => {
              dispatch(actions.addExistingEntity({
                id: generateId(),
                entityType: "",
                jurisdiction: "",
                purpose: ""
              }));
            }}
          >
            Add Entity
          </Button>
        </div>
        
        <EntityTable
          entities={state.organizationInfo.existingEntities}
          dispatch={dispatch}
          actions={actions}
          entityType="existing"
        />
      </div>

      {/* Contributor Entities */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Contributor Legal Entities
          </h2>
          <Button
            
            size="small" 
            onClick={() => {
              dispatch(actions.addContributorEntity({
                id: generateId(),
                entityType: "",
                jurisdiction: "",
                purpose: ""
              }));
            }}
          >
            Add Entity
          </Button>
        </div>
        
        <EntityTable
          entities={state.organizationInfo.contributorEntities}
          dispatch={dispatch}
          actions={actions}
          entityType="contributor"
        />
      </div>

      {/* Compliance Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Regulatory & Compliance
        </h2>
        
        <div className="space-y-4">
          <Textarea
            label="Regulatory or Compliance Concerns"
            className="w-full"
            defaultValue={state.organizationInfo.regulatoryConcerns || ""}
            onBlur={(e) => {
              const currentInfo = {
                regulatoryConcerns: state.organizationInfo.regulatoryConcerns,
                licenses: state.organizationInfo.licenses,
                complianceConcerns: state.organizationInfo.complianceConcerns
              };
              
              if (e.target.value !== currentInfo.regulatoryConcerns) {
                dispatch(actions.setComplianceInfo({
                  ...currentInfo,
                  regulatoryConcerns: e.target.value || null
                }));
              }
            }}
            placeholder="Describe any regulatory or compliance concerns"
            rows={3}
          />

          <Textarea
            label="Required Licenses or Registrations"
            className="w-full"
            defaultValue={state.organizationInfo.licenses || ""}
            onBlur={(e) => {
              const currentInfo = {
                regulatoryConcerns: state.organizationInfo.regulatoryConcerns,
                licenses: state.organizationInfo.licenses,
                complianceConcerns: state.organizationInfo.complianceConcerns
              };
              
              if (e.target.value !== currentInfo.licenses) {
                dispatch(actions.setComplianceInfo({
                  ...currentInfo,
                  licenses: e.target.value || null
                }));
              }
            }}
            placeholder="List any licenses or registrations your organization requires"
            rows={3}
          />

          <Textarea
            label="Legal, Regulatory, or Compliance Concerns"
            className="w-full"
            defaultValue={state.organizationInfo.complianceConcerns || ""}
            onBlur={(e) => {
              const currentInfo = {
                regulatoryConcerns: state.organizationInfo.regulatoryConcerns,
                licenses: state.organizationInfo.licenses,
                complianceConcerns: state.organizationInfo.complianceConcerns
              };
              
              if (e.target.value !== currentInfo.complianceConcerns) {
                dispatch(actions.setComplianceInfo({
                  ...currentInfo,
                  complianceConcerns: e.target.value || null
                }));
              }
            }}
            placeholder="Describe any concrete legal, regulatory, or compliance concerns"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}