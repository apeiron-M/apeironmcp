import { type StateReducer, createReducer } from "document-model";
import { type LegalStructureNeedsAssessmentDocument } from "../gen/types.js";
import { reducer as generatedReducer } from "../gen/reducer.js";
import {
  type DeleteMultisigWalletAction,
  type DeleteExistingEntityAction,
  type DeleteContributorEntityAction,
  type DeleteOperationalActivityAction,
  type DeletePaymentRequirementAction,
  type DeleteCommercialActivityAction,
  type DeleteIpAssetAction,
  type DeleteFundraisingActivityAction,
} from "./actions.js";

const customStateReducer: StateReducer<LegalStructureNeedsAssessmentDocument> = (
  state,
  action,
  dispatch,
) => {
  // Handle custom delete actions
  switch (action.type) {
    case "DELETE_MULTISIG_WALLET": {
      const deleteAction = action as DeleteMultisigWalletAction;
      state.global.organizationInfo.multisigWallets = state.global.organizationInfo.multisigWallets.filter(
        wallet => wallet.id !== deleteAction.input.id
      );
      return state;
    }

    case "DELETE_EXISTING_ENTITY": {
      const deleteAction = action as DeleteExistingEntityAction;
      state.global.organizationInfo.existingEntities = state.global.organizationInfo.existingEntities.filter(
        entity => entity.id !== deleteAction.input.id
      );
      return state;
    }

    case "DELETE_CONTRIBUTOR_ENTITY": {
      const deleteAction = action as DeleteContributorEntityAction;
      state.global.organizationInfo.contributorEntities = state.global.organizationInfo.contributorEntities.filter(
        entity => entity.id !== deleteAction.input.id
      );
      return state;
    }

    case "DELETE_OPERATIONAL_ACTIVITY": {
      const deleteAction = action as DeleteOperationalActivityAction;
      state.global.operationalNeeds.activities = state.global.operationalNeeds.activities.filter(
        activity => activity.id !== deleteAction.input.id
      );
      return state;
    }

    case "DELETE_PAYMENT_REQUIREMENT": {
      const deleteAction = action as DeletePaymentRequirementAction;
      state.global.operationalNeeds.paymentRequirements = state.global.operationalNeeds.paymentRequirements.filter(
        requirement => requirement.id !== deleteAction.input.id
      );
      return state;
    }

    case "DELETE_COMMERCIAL_ACTIVITY": {
      const deleteAction = action as DeleteCommercialActivityAction;
      state.global.salesRevenue.commercialActivities = state.global.salesRevenue.commercialActivities.filter(
        activity => activity.id !== deleteAction.input.id
      );
      return state;
    }

    case "DELETE_IP_ASSET": {
      const deleteAction = action as DeleteIpAssetAction;
      state.global.ipManagement.ipAssets = state.global.ipManagement.ipAssets.filter(
        asset => asset.id !== deleteAction.input.id
      );
      return state;
    }

    case "DELETE_FUNDRAISING_ACTIVITY": {
      const deleteAction = action as DeleteFundraisingActivityAction;
      state.global.fundraising.activities = state.global.fundraising.activities.filter(
        activity => activity.id !== deleteAction.input.id
      );
      return state;
    }

    default:
      // Fallback to generated reducer for all other actions
      return generatedReducer(state, action, dispatch);
  }
};

export const reducer = createReducer<LegalStructureNeedsAssessmentDocument>(customStateReducer);