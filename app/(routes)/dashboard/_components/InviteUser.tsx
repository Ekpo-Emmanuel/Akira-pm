'use client';

import { useState } from 'react';
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface InviteUserProps {
  organizationId: Id<"organizations">;
  senderId: string;
  senderName?: string;
  currentUserEmail?: string;
  organizationName: string;
}

export default function InviteUser(props: InviteUserProps) {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInvitationLink, setIsInvitationLink] = useState<string>('');
  const createInvitation = useMutation(api.invitations.createInvitation);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (props.currentUserEmail === email) {
      alert("You can't invite yourself to your own organization.");
      return;
    }
    setIsLoading(true);
    try {
      const invitationId = await createInvitation({
        organizationId: props.organizationId,
        email: email,
        role: 'member',
        senderId: props.senderId,
      });

      // Generate invite link
      const inviteLink = `${window.location.origin}/accept-invite/${invitationId}`;
      setIsInvitationLink(`Invitation link: ${inviteLink}`);

      // Send invitation email
      const response = await fetch('/api/send-invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          inviterName: props.senderName,
          organizationName: props.organizationName,
          inviteLink,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send invitation email');
      }

      alert(`Invitation sent to ${email}`);
      setEmail('');
    } catch (error) {
      console.error("Failed to send invitation:", error);
      alert("Failed to send invitation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleInvite} className="mt-4">
      <p >{isInvitationLink}</p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email to invite"
        className="p-2 border rounded mr-2"
        required
        disabled={isLoading}
      />
      <button 
        type="submit" 
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={isLoading}
      >
        {isLoading ? 'Sending...' : 'Invite User'}
      </button>
    </form>
  );
}