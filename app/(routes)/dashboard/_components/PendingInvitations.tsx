'use client';

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function PendingInvitations({ email, userId }: { email: string, userId: string }) {
  const pendingInvitations = useQuery(api.invitations.getPendingInvitations, { email });
  const acceptInvitation = useMutation(api.invitations.acceptInvitation);

  if (!pendingInvitations || pendingInvitations.length === 0) {
    return null;
  }

  const handleAccept = async (invitationId: any) => {
    try {
      await acceptInvitation({ invitationId, userId });
      alert("Invitation accepted!");
    } catch (error) {
      console.error("Failed to accept invitation:", error);
      alert("Failed to accept invitation. Please try again.");
    }
  };

  return (
    <div>
      <h2>Pending Invitations</h2>
      <ul>
        {pendingInvitations.map((invitation) => (
          <li key={invitation._id}>
            Invitation to join organization
            <button onClick={() => handleAccept(invitation._id)} className="ml-2 bg-green-500 text-white px-2 py-1 rounded">
              Accept
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}