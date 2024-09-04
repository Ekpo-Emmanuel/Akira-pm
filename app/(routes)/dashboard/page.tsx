'use client';

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import PendingInvitations from "./_components/PendingInvitations";
import { useUser } from '@/app/contexts/user/UserProviderClient';
import Welcome from "./_components/dashboard/Welcome";
import Workspaces from "./_components/dashboard/Workspaces";

export default function Dashboard() {
  const { user } = useUser();
  // const userOrg = useQuery(api.users.getUserOrganization, { kindeId: String(user?.id) });
  // if (userOrg === undefined) return <div>Loading...</div>;

  return (
    <div>
      <div className="grid grid-cols-1 gap-2">
        <Welcome name={String(user?.given_name)} />
        <Workspaces />
      </div>
      {/* {userOrg ? (
        <div>You are part of an organization</div>
      ) : (
        <PendingInvitations email={String(user?.email)} userId={String(user?.id)} />
      )} */}
    </div>
  );
}