'use client';

import { useState } from 'react';
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function InviteUser({ organizationId }: { organizationId: Id<"organizations"> }) {
  const [email, setEmail] = useState('');
  const createInvitation = useMutation(api.invitations.createInvitation);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createInvitation({
        organizationId: organizationId,
        email: email,
        role: 'user',
      });
      alert(`Invitation sent to ${email}`);
      setEmail('');
    } catch (error) {
      console.error("Failed to send invitation:", error);
      alert("Failed to send invitation. Please try again.");
    }
  };

  return (
    <form onSubmit={handleInvite} className="mt-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email to invite"
        className="p-2 border rounded mr-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Invite User
      </button>
    </form>
  );
}