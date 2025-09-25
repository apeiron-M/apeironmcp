# Legal Structure Needs Assessment - Document Model Overview

## Basic Information
- **Document Model ID**: `jetstream/legal-structure-assessment`
- **Name**: Legal Structure Needs Assessment  
- **Extension**: `.lsna`
- **Author**: Jetstream (https://jetstream.legal)
- **Description**: A comprehensive needs analysis questionnaire for crypto startups, DAOs, and network organizations to assess the suitability of Swiss Associations as legal structures for operational hubs

## Document State Schema

The document contains the following main sections:

### 1. Organization Info (`organizationInfo`)
- **name**: String - Organization/project name
- **multisigWallets**: Array of MultisigWallet objects
  - `id`: OID (unique identifier)
  - `chain`: String (blockchain)
  - `ownershipStructure`: String
- **existingEntities**: Array of LegalEntity objects  
- **contributorEntities**: Array of LegalEntity objects
- **contracts**: Array of ContractEngagement objects
- **financialTools**: Array of FinancialTool objects
- **regulatoryConcerns**: String
- **licenses**: String  
- **complianceConcerns**: String

### 2. Strategic Goals (`strategicGoals`)
- **decentralizationCriteria**: Object with boolean flags
  - `isDAO`, `isNetwork`, `worksInDecentralized`, `aspiresDecentralization`, `qualifiesAsDecentralized`
- **nonProfitPurpose**: Object
  - `primaryPurpose`: String
  - `otherPurpose`: String
- **nonProfitIndicators**: Object with assessment scores
  - Boolean flags: `reinvestsProfits`, `benefitsPublic`, `revenueIsSecondary`, `distributeProfits`, `membershipBenefits`, `commercialDominates`
  - Scores: `nonProfitScore`, `commercialScore` (Float)
  - `overallAssessment`: String

### 3. Operational Needs (`operationalNeeds`)
- **activities**: Array of OperationalActivity objects
- **paymentRequirements**: Array of PaymentRequirement objects  
- **contributorJurisdictions**: Array of strings
- **financialInfrastructure**: Array of strings
- **needsAttestationTool**: Boolean
- **requiresRedundancy**: Boolean
- **monthlyRevenue**: String
- **monthlyExpenses**: String

### 4. Sales Revenue (`salesRevenue`)
- **commercialActivities**: Array of CommercialActivity objects

### 5. IP Management (`ipManagement`)
- **ipAssets**: Array of IPAsset objects
- **contributorsAssignIP**: Boolean
- **futureIPAssignment**: Boolean  
- **licensingPlans**: String

### 6. Fundraising (`fundraising`)
- **activities**: Array of FundraisingActivity objects
- **requiresInvestmentVehicle**: Boolean

### 7. Governance (`governance`)
- **decisionMaking**: String
- **existingBylaws**: Boolean
- **bylawsDescription**: String
- **plansGovernanceTokens**: Boolean

### 8. Suitability Score (`suitabilityScore`)
- **decentralizationMet**: Boolean
- **nonProfitMet**: Boolean  
- **operationalNeedsMet**: Boolean
- **overallSuitability**: String
- **recommendations**: String
- **requiresSeparateVehicle**: Boolean
- **additionalConsiderations**: String

### 9. Assessment Status
- **assessmentCompleted**: Boolean
- **assessmentDate**: DateTime

## Available Operations (37 total)

### Organization Module (7 operations)
1. `SET_ORGANIZATION_NAME` - Sets organization name
2. `ADD_MULTISIG_WALLET` - Adds multisig wallet
3. `ADD_EXISTING_ENTITY` - Adds existing legal entity
4. `ADD_CONTRIBUTOR_ENTITY` - Adds contributor entity
5. `ADD_CONTRACT_ENGAGEMENT` - Adds contract/agreement
6. `ADD_FINANCIAL_TOOL` - Adds financial tool/platform
7. `SET_COMPLIANCE_INFO` - Sets regulatory concerns/compliance info

### Strategic Goals Module (4 operations)  
8. `SET_DECENTRALIZATION_CRITERIA` - Sets DAO/network flags
9. `SET_NONPROFIT_PURPOSE` - Sets primary purpose
10. `SET_NONPROFIT_INDICATORS` - Sets profit/commercial indicators
11. `CALCULATE_NONPROFIT_SCORE` - Calculates non-profit score

### Operational Needs Module (5 operations)
12. `ADD_OPERATIONAL_ACTIVITY` - Adds operational activity requirement  
13. `ADD_PAYMENT_REQUIREMENT` - Adds payment requirement
14. `SET_CONTRIBUTOR_JURISDICTIONS` - Sets contributor locations
15. `SET_FINANCIAL_INFRASTRUCTURE` - Sets financial tools needed
16. `SET_FINANCIAL_METRICS` - Sets revenue/expense estimates

### Commercial & IP Module (4 operations)
17. `ADD_COMMERCIAL_ACTIVITY` - Adds commercial/sales activity
18. `ADD_IP_ASSET` - Adds IP asset (copyrights, trademarks, etc.)
19. `SET_IP_MANAGEMENT` - Sets IP assignment settings  
20. `ADD_FUNDRAISING_ACTIVITY` - Adds fundraising activity

### Governance Module (1 operation)
21. `SET_GOVERNANCE_FRAMEWORK` - Sets governance structure

### Assessment Module (3 operations)
22. `CALCULATE_SUITABILITY` - Calculates overall suitability  
23. `GENERATE_RECOMMENDATIONS` - Generates recommendations
24. `COMPLETE_ASSESSMENT` - Marks assessment complete

### Custom Delete Operations (13 operations)
25. `DELETE_MULTISIG_WALLET` - Removes multisig wallet
26. `DELETE_EXISTING_ENTITY` - Removes existing entity
27. `DELETE_CONTRIBUTOR_ENTITY` - Removes contributor entity  
28. `DELETE_OPERATIONAL_ACTIVITY` - Removes operational activity
29. `DELETE_PAYMENT_REQUIREMENT` - Removes payment requirement
30. `DELETE_COMMERCIAL_ACTIVITY` - Removes commercial activity
31. `DELETE_IP_ASSET` - Removes IP asset
32. `DELETE_FUNDRAISING_ACTIVITY` - Removes fundraising activity

## Editor Features

The interactive editor provides:

✅ **Full CRUD Operations**: Create, Read, Update, Delete for all entities
✅ **Checkbox Interactivity**: Check/uncheck to add/remove items with revision history
✅ **Table Management**: Add/edit/delete rows in data tables
✅ **Real-time Validation**: Input validation and error handling  
✅ **Assessment Engine**: Automatic suitability scoring and recommendations
✅ **Revision History**: All changes tracked as document operations
✅ **Responsive UI**: Works on desktop and mobile devices

## Revision History Tracking

Every user interaction creates a proper document operation:
- Checking boxes → `ADD_*` operations
- Unchecking boxes → `DELETE_*` operations  
- Text input changes → `SET_*` operations
- Table modifications → `ADD_*` / `DELETE_*` operations
- Assessment actions → `CALCULATE_*` / `COMPLETE_*` operations

This ensures complete auditability and the ability to replay document changes.

## Usage in Connect

1. Create a new document of type "Legal Structure Needs Assessment"
2. Use the interactive editor to fill out all sections
3. Check/uncheck items to automatically add/remove them
4. Complete the assessment to get suitability recommendations  
5. View revision history to see all changes made to the document