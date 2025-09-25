import type React from "react";
import { useState } from "react";
import { TextInput } from "@powerhousedao/document-engineering";
import { Button } from "@powerhousedao/design-system";
import { Icon } from "@powerhousedao/design-system";
import { type TeamMember } from "../../../document-models/work-breakdown-structure/gen/schema/types.js";
import { addTeamMember, updateTeamMember } from "../../../document-models/work-breakdown-structure/gen/creators.js";

interface TeamMemberFormProps {
  member?: TeamMember | null;
  dispatch: (action: any) => void;
  onClose: () => void;
}

export function TeamMemberForm({ member, dispatch, onClose }: TeamMemberFormProps) {
  const isEditing = !!member;
  const [formData, setFormData] = useState({
    name: member?.name || "",
    email: member?.email || "",
    role: member?.role || "",
    avatar: member?.avatar || ""
  });

  const generateId = () => crypto.randomUUID();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && member) {
      dispatch(updateTeamMember({
        memberId: member.id,
        name: formData.name,
        email: formData.email || null,
        role: formData.role || null,
        avatar: formData.avatar || null,
        updatedAt: new Date().toISOString()
      }));
    } else {
      dispatch(addTeamMember({
        id: generateId(),
        name: formData.name,
        email: formData.email || null,
        role: formData.role || null,
        avatar: formData.avatar || null,
        joinedAt: new Date().toISOString()
      }));
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {isEditing ? "Edit Team Member" : "Add Team Member"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <span className="text-xl">✖</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter full name"
            required
          />

          <TextInput
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="member@company.com"
          />

          <TextInput
            label="Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            placeholder="e.g., Developer, Designer, PM"
          />

          <TextInput
            label="Avatar URL"
            value={formData.avatar}
            onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
            placeholder="https://example.com/avatar.jpg"
          />

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isEditing ? "Update Member" : "Add Member"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}