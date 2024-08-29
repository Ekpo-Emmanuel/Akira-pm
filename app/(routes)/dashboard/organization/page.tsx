'use client';

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import InviteUser from "../_components/InviteUser";
import { useUser } from "@/app/contexts/UserProvider";
import InviteUserForm from "../_components/InviteUserForm";


export default function page() {
  const { user }: any = useUser();
  const userOrg = useQuery(api.users.getUserOrganization, { kindeId: String(user?.id) });
  const organizationDetails = useQuery(api.organizations.getOrganizationDetails, 
    userOrg ? { organizationId: userOrg } : "skip"
  );

  if (userOrg === undefined) return <div>Loading...</div>;
  if (!userOrg) return <div>You are not part of any organization</div>;

  return (
    <div>
      <h1>Your Organization</h1>
      {/* Display organization details here */}
      <InviteUser 
        organizationId={userOrg} 
        senderId={String(user?.id)} 
        currentUserEmail={user?.email} 
        organizationName={organizationDetails?.name || "Your Organization"}
        senderName={user?.given_name + " " + user?.family_name}
      />
      {/* <InviteUserForm organizationId={userOrg} /> */}
    </div>
  );
}