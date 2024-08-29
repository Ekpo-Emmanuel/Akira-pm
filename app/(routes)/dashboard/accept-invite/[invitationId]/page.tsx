'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@/app/contexts/UserProvider';
import { Id } from '@/convex/_generated/dataModel';
import { UserProvider } from "@/app/contexts/UserProvider"


export default function AcceptInvite({ params }: { params: { invitationId: Id<"invitations"> } }) {
  const router = useRouter();
  const { user } = useUser();
  const [error, setError] = useState<string | null>(null);
  const acceptInvitation = useMutation(api.invitations.acceptInvitation);

  useEffect(() => {
    const handleAcceptInvitation = async () => {
      if (!user) {
        setError("Please log in to accept the invitation.");
        return;
      }

      try {
        await acceptInvitation({
          invitationId: params.invitationId,
          userId: user.id,
        });
        router.push('/dashboard'); 
      } catch (err: any) {
        setError(err.message || "Failed to accept invitation");
      }
    };

    handleAcceptInvitation();
  }, [user, params.invitationId, acceptInvitation, router]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return <div>Processing invitation...</div>;
}