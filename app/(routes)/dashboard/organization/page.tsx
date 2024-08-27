'use client';

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import InviteUser from "../_components/InviteUser";
import { useUser } from "@/app/contexts/UserProvider";


export default function page() {
  const { user }: any = useUser();
  const userOrg = useQuery(api.users.getUserOrganization, { kindeId: String(user?.id) });

  if (userOrg === undefined) return <div>Loading...</div>;
  if (!userOrg) return <div>You are not part of any organization</div>;

  return (
    <div>
      <h1>Your Organization</h1>
      {/* Display organization details here */}
      <InviteUser organizationId={userOrg} />
    </div>
  );
}