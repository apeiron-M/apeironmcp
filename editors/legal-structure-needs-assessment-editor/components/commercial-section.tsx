import React from "react";
import { TextInput } from "@powerhousedao/document-engineering";
import { Button } from "@powerhousedao/design-system";
import type { LegalStructureAssessmentState } from "../../../document-models/legal-structure-needs-assessment/index.js";
// Use crypto.randomUUID for ID generation
const generateId = () => crypto.randomUUID();
import { CheckboxGroup } from "./checkbox-group.js";
import { SimpleTable } from "./simple-table.js";

interface CommercialSectionProps {
  state: LegalStructureAssessmentState;
  dispatch: (action: any) => void;
  actions: any;
}

export function CommercialSection({ state, dispatch, actions }: CommercialSectionProps) {
  const { salesRevenue, ipManagement, fundraising } = state;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Commercial Activities & IP Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Define your commercial activities, intellectual property, and fundraising needs
        </p>
      </div>

      {/* Commercial Activities */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Commercial Activities
          </h2>
          <Button
            
            size="small"
            onClick={() => {
              dispatch(actions.addCommercialActivity({
                id: generateId(),
                activityType: "",
                description: ""
              }));
            }}
          >
            Add Activity
          </Button>
        </div>

        <div className="mb-4">
          <CheckboxGroup
            options={[
              { key: "service_agreements", label: "Sign agreements with clients (Service agreements, Grant agreements, Consultancy agreements, SLAs)" },
              { key: "website_policies", label: "Publish Terms of Use, Privacy policies, Cookie policies, or disclaimers for your website" },
              { key: "ip_licensing", label: "License IP and receive fees or royalties" },
              { key: "process_payments", label: "Process payments from clients" }
            ]}
            values={{
              service_agreements: salesRevenue.commercialActivities.some(a => a.activityType === "service_agreements"),
              website_policies: salesRevenue.commercialActivities.some(a => a.activityType === "website_policies"),
              ip_licensing: salesRevenue.commercialActivities.some(a => a.activityType === "ip_licensing"),
              process_payments: salesRevenue.commercialActivities.some(a => a.activityType === "process_payments")
            }}
            onChange={(values) => {
              Object.entries(values).forEach(([key, selected]) => {
                const existingActivity = salesRevenue.commercialActivities.find(a => a.activityType === key);
                
                if (selected && !existingActivity) {
                  dispatch(actions.addCommercialActivity({
                    id: generateId(),
                    activityType: key,
                    description: ""
                  }));
                } else if (!selected && existingActivity) {
                  dispatch(actions.deleteCommercialActivity({
                    id: existingActivity.id
                  }));
                }
              });
            }}
          />
        </div>

        {salesRevenue.commercialActivities.length > 0 && (
          <SimpleTable
            title="Commercial Activities"
            data={salesRevenue.commercialActivities}
            columns={[
              { key: "activityType", label: "Activity Type" },
              { key: "description", label: "Description" }
            ]}
          />
        )}

        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            ℹ️ The Swiss Association can be involved in commercial activities with certain limitations. 
            Swiss Associations are capable of signing commercial agreements.
          </p>
        </div>
      </div>

      {/* IP Management */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Intellectual Property Management
          </h2>
          <Button
            
            size="small"
            onClick={() => {
              dispatch(actions.addIpAsset({
                id: generateId(),
                assetType: "",
                description: ""
              }));
            }}
          >
            Add IP Asset
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">IP Asset Types</h3>
            <CheckboxGroup
              options={[
                { key: "os_copyrights", label: "OS copyrights" },
                { key: "proprietary_copyrights", label: "Proprietary copyrights" },
                { key: "trademarks", label: "Trademarks" },
                { key: "patents", label: "Patents" },
                { key: "ip_addresses", label: "IP Addresses" }
              ]}
              values={{
                os_copyrights: ipManagement.ipAssets.some(a => a.assetType === "os_copyrights"),
                proprietary_copyrights: ipManagement.ipAssets.some(a => a.assetType === "proprietary_copyrights"),
                trademarks: ipManagement.ipAssets.some(a => a.assetType === "trademarks"),
                patents: ipManagement.ipAssets.some(a => a.assetType === "patents"),
                ip_addresses: ipManagement.ipAssets.some(a => a.assetType === "ip_addresses")
              }}
              onChange={(values) => {
                Object.entries(values).forEach(([key, selected]) => {
                  const existingAsset = ipManagement.ipAssets.find(a => a.assetType === key);
                  
                  if (selected && !existingAsset) {
                    dispatch(actions.addIpAsset({
                      id: generateId(),
                      assetType: key,
                      description: ""
                    }));
                  } else if (!selected && existingAsset) {
                    dispatch(actions.deleteIpAsset({
                      id: existingAsset.id
                    }));
                  }
                });
              }}
            />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">IP Assignment & Licensing</h3>
            <div className="space-y-4">
              <CheckboxGroup
                options={[
                  { key: "contributors_assign_current", label: "Contributors currently assign IP rights to a separate entity" },
                  { key: "contributors_assign_future", label: "Contributors will be obliged to assign IP rights to your new entity" }
                ]}
                values={{
                  contributors_assign_current: ipManagement.contributorsAssignIP,
                  contributors_assign_future: ipManagement.futureIPAssignment
                }}
                onChange={(values) => {
                  dispatch(actions.setIpManagement({
                    contributorsAssignIP: values.contributors_assign_current || false,
                    futureIPAssignment: values.contributors_assign_future || false,
                    licensingPlans: ipManagement.licensingPlans
                  }));
                }}
              />

              <TextInput
                label="IP Licensing Plans"
                className="w-full"
                defaultValue={ipManagement.licensingPlans || ""}
                onBlur={(e) => {
                  if (e.target.value !== ipManagement.licensingPlans) {
                    dispatch(actions.setIpManagement({
                      contributorsAssignIP: ipManagement.contributorsAssignIP,
                      futureIPAssignment: ipManagement.futureIPAssignment,
                      licensingPlans: e.target.value || null
                    }));
                  }
                }}
                placeholder="Describe your plans for licensing IP assets"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
          <p className="text-green-700 dark:text-green-300 text-sm">
            ✅ A Swiss Association is an appropriate vehicle for managing and protecting IP assets. 
            Licensing fees (royalties or fees) are generally considered a commercial activity and subject to restrictions.
          </p>
        </div>
      </div>

      {/* Fundraising */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Fundraising Activities
          </h2>
          <Button
            
            size="small"
            onClick={() => {
              dispatch(actions.addFundraisingActivity({
                id: generateId(),
                activityType: "",
                description: ""
              }));
            }}
          >
            Add Activity
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Funding Sources</h3>
            <CheckboxGroup
              options={[
                { key: "tokens_icos", label: "Via tokens / ICOs" },
                { key: "equity", label: "Equity (company shares)" },
                { key: "equity_tokens", label: "Combination Equity + tokens" }
              ]}
              values={{
                tokens_icos: fundraising.activities.some(a => a.activityType === "tokens_icos"),
                equity: fundraising.activities.some(a => a.activityType === "equity"),
                equity_tokens: fundraising.activities.some(a => a.activityType === "equity_tokens")
              }}
              onChange={(values) => {
                Object.entries(values).forEach(([key, selected]) => {
                  const existingActivity = fundraising.activities.find(a => a.activityType === key);
                  
                  if (selected && !existingActivity) {
                    dispatch(actions.addFundraisingActivity({
                      id: generateId(),
                      activityType: key,
                      description: ""
                    }));
                  } else if (!selected && existingActivity) {
                    dispatch(actions.deleteFundraisingActivity({
                      id: existingActivity.id
                    }));
                  }
                });
              }}
            />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Investment Agreements</h3>
            <CheckboxGroup
              options={[
                { key: "term_sheets", label: "Term sheets" },
                { key: "warrants", label: "Warrants" },
                { key: "saft_safe", label: "SAFT / SAFE" }
              ]}
              values={{
                term_sheets: fundraising.activities.some(a => a.activityType === "term_sheets"),
                warrants: fundraising.activities.some(a => a.activityType === "warrants"),
                saft_safe: fundraising.activities.some(a => a.activityType === "saft_safe")
              }}
              onChange={(values) => {
                Object.entries(values).forEach(([key, selected]) => {
                  const existingActivity = fundraising.activities.find(a => a.activityType === key);
                  
                  if (selected && !existingActivity) {
                    dispatch(actions.addFundraisingActivity({
                      id: generateId(),
                      activityType: key,
                      description: ""
                    }));
                  } else if (!selected && existingActivity) {
                    dispatch(actions.deleteFundraisingActivity({
                      id: existingActivity.id
                    }));
                  }
                });
              }}
            />
          </div>
        </div>

        {fundraising.requiresInvestmentVehicle && (
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              ⚠️ Swiss Associations can sign financing agreements with investors, but they are unsuitable for receiving direct investments or issuing security tokens. 
              For that purpose, a separate vehicle is needed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}