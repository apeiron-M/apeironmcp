import { type SignalDispatch } from "document-model";
import {
  type AddCommercialActivityAction,
  type AddIpAssetAction,
  type SetIpManagementAction,
  type AddFundraisingActivityAction,
} from "./actions.js";
import { type LegalStructureNeedsAssessmentState } from "../types.js";

export interface LegalStructureNeedsAssessmentCommercialIpOperations {
  addCommercialActivityOperation: (
    state: LegalStructureNeedsAssessmentState,
    action: AddCommercialActivityAction,
    dispatch?: SignalDispatch,
  ) => void;
  addIpAssetOperation: (
    state: LegalStructureNeedsAssessmentState,
    action: AddIpAssetAction,
    dispatch?: SignalDispatch,
  ) => void;
  setIpManagementOperation: (
    state: LegalStructureNeedsAssessmentState,
    action: SetIpManagementAction,
    dispatch?: SignalDispatch,
  ) => void;
  addFundraisingActivityOperation: (
    state: LegalStructureNeedsAssessmentState,
    action: AddFundraisingActivityAction,
    dispatch?: SignalDispatch,
  ) => void;
}
