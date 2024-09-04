'use client';

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import InviteUser from "../_components/InviteUser";
import { useUser } from "@/app/contexts/user/UserProviderClient";
import InviteUserForm from "../_components/InviteUserForm";
import { Id } from "@/convex/_generated/dataModel";

export default function Page() {
  const { user }: any = useUser();
  const userOrg = useQuery(api.users.getUserOrganization, { kindeId: String(user?.id) });
  const organizationDetails = useQuery(api.organizations.getOrganizationDetails, 
    userOrg ? { organizationId: userOrg.organizationId as Id<"organizations"> } : "skip"
  );

  if (userOrg === undefined) return <div>Loading...</div>;
  if (!userOrg) return <div>You are not part of any organization</div>;

  return (
    <div>
      <h1>Your Organization</h1>
      <InviteUser 
        organizationId={userOrg.organizationId} 
        senderId={String(user?.id)} 
        currentUserEmail={user?.email} 
        organizationName={organizationDetails?.name || "Your Organization"}
        senderName={user?.given_name + " " + user?.family_name}
      />
      {/* <InviteUserForm organizationId={userOrg.organizationId} /> */}
    </div>
  );
}