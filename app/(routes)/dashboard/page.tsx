'use client';

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import PendingInvitations from "./_components/PendingInvitations";
import { useUser } from "@/app/contexts/UserProvider";

export default function Dashboard() {
  const { user } = useUser();
  const userOrg = useQuery(api.users.getUserOrganization, { kindeId: String(user?.id) });
  if (userOrg === undefined) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      {userOrg ? (
        <div>You are part of an organization</div>
      ) : (
        <PendingInvitations email={String(user?.email)} userId={String(user?.id)} />
      )}
    </div>
  );
}