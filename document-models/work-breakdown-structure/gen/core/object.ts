import { BaseDocumentClass } from "document-model";
import {
  type CreateWbsInput,
  type UpdateWbsInfoInput,
  type WorkBreakdownStructureState,
  type WorkBreakdownStructureLocalState,
} from "../types.js";
import { createWbs, updateWbsInfo } from "./creators.js";
import { type WorkBreakdownStructureAction } from "../actions.js";

export default class WorkBreakdownStructure_Core extends BaseDocumentClass<
  WorkBreakdownStructureState,
  WorkBreakdownStructureLocalState,
  WorkBreakdownStructureAction
> {
  public createWbs(input: CreateWbsInput) {
    return this.dispatch(createWbs(input));
  }

  public updateWbsInfo(input: UpdateWbsInfoInput) {
    return this.dispatch(updateWbsInfo(input));
  }
}
