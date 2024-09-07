'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@/app/contexts/user/UserProviderClient';
import { Organization, OrganizationMember } from '@/app/types';

export default function page() {
  const { user } = useUser();
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

  const userOrganizations = useQuery(api.organizations.getUserOrganizations, 
    user?.id ? { kindeId: user.kindeId } : 'skip'
  );

  const organizationMembers = useQuery(api.organizations.getOrganizationMembers, 
    selectedOrg ? { organizationId: selectedOrg._id } : 'skip'
  );

  useEffect(() => {
    if (userOrganizations && userOrganizations.length > 0) {
      setSelectedOrg(userOrganizations[0]);
    }
  }, [userOrganizations]);

  if (!user) {
    return <div>Please log in to view your organizations.</div>;
  }

  if (!userOrganizations) {
    return <div>Loading organizations...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Organizations</h1>
      <div className="flex">
        <div className="w-1/3 pr-4">
          <h2 className="text-xl font-semibold mb-2">Organizations</h2>
          <ul>
            {userOrganizations.map((org) => (
              <li 
                key={org._id} 
                className={`cursor-pointer p-2 ${selectedOrg?._id === org._id ? 'bg-blue-100' : ''}`}
                onClick={() => setSelectedOrg(org)}
              >
                {org.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-2/3">
          {selectedOrg && (
            <>
              <h2 className="text-xl font-semibold mb-2">{selectedOrg.name} Members</h2>
              {organizationMembers ? (
                <ul>
                  {organizationMembers.map((member) => (
                    <li key={member._id} className="p-2">
                      {member.name} ({member.email})
                    </li>
                  ))}
                </ul>
              ) : (
                <div>Loading members...</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
// return (
//   <div>
//     <h1>Your Organization</h1>
//     <InviteUser 
//       organizationId={userOrg.organizationId} 
//       senderId={String(user?.id)} 
//       currentUserEmail={user?.email} 
//       organizationName={organizationDetails?.name || "Your Organization"}
//       senderName={user?.given_name + " " + user?.family_name}
//     />
//     {/* <InviteUserForm organizationId={userOrg.organizationId} /> */}
//   </div>
// );