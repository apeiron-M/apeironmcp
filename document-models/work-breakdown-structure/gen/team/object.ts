import { BaseDocumentClass } from "document-model";
import {
  type AddTeamMemberInput,
  type UpdateTeamMemberInput,
  type RemoveTeamMemberInput,
  type WorkBreakdownStructureState,
  type WorkBreakdownStructureLocalState,
} from "../types.js";
import {
  addTeamMember,
  updateTeamMember,
  removeTeamMember,
} from "./creators.js";
import { type WorkBreakdownStructureAction } from "../actions.js";

export default class WorkBreakdownStructure_Team extends BaseDocumentClass<
  WorkBreakdownStructureState,
  WorkBreakdownStructureLocalState,
  WorkBreakdownStructureAction
> {
  public addTeamMember(input: AddTeamMemberInput) {
    return this.dispatch(addTeamMember(input));
  }

  public updateTeamMember(input: UpdateTeamMemberInput) {
    return this.dispatch(updateTeamMember(input));
  }

  public removeTeamMember(input: RemoveTeamMemberInput) {
    return this.dispatch(removeTeamMember(input));
  }
}
