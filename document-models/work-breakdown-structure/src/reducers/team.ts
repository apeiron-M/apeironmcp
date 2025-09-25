import type { WorkBreakdownStructureTeamOperations } from "../../gen/team/operations.js";
import { MemberNotFoundError } from "../../gen/team/error.js";

export const reducer: WorkBreakdownStructureTeamOperations = {
    addTeamMemberOperation(state, action, dispatch) {
        const newMember = {
          id: action.input.id,
          name: action.input.name,
          email: action.input.email || null,
          role: action.input.role || null,
          avatar: action.input.avatar || null,
          isActive: true,
          joinedAt: action.input.joinedAt
        };

        state.teamMembers.push(newMember);
        state.updatedAt = action.input.joinedAt;
    },
    updateTeamMemberOperation(state, action, dispatch) {
        const memberIndex = state.teamMembers.findIndex(member => member.id === action.input.memberId);

        if (memberIndex === -1) {
          throw new MemberNotFoundError(`Team member with ID ${action.input.memberId} not found`);
        }

        const member = state.teamMembers[memberIndex];

        if (action.input.name !== undefined) member.name = action.input.name || "";
        if (action.input.email !== undefined) member.email = action.input.email;
        if (action.input.role !== undefined) member.role = action.input.role;
        if (action.input.avatar !== undefined) member.avatar = action.input.avatar;
        if (action.input.isActive !== undefined) member.isActive = action.input.isActive;

        state.updatedAt = action.input.updatedAt;
    },
    removeTeamMemberOperation(state, action, dispatch) {
        const memberIndex = state.teamMembers.findIndex(member => member.id === action.input.memberId);

        if (memberIndex === -1) {
          throw new MemberNotFoundError(`Team member with ID ${action.input.memberId} not found`);
        }

        state.teamMembers.splice(memberIndex, 1);
        state.updatedAt = action.input.updatedAt;
    }
};