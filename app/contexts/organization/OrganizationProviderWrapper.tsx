'use client';

import React, { useState, useEffect } from 'react';
import { OrganizationProvider } from './OrganizationContext';
import { Organization, OrganizationUser } from '@/app/types';
import { useUser } from '@/app/contexts/user/UserProviderClient';
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import OrganizationPrompt from '@/app/(routes)/dashboard/_components/OrganizationPrompt';

function OrganizationProviderWrapper({ children }: { children: React.ReactNode }) {
  const [initialOrganization, setInitialOrganization] = useState<Organization | null>(null);
  const [userOrganizations, setUserOrganizations] = useState<Organization[]>([]);
  const [organizationUsers, setOrganizationUsers] = useState<OrganizationUser[]>([]);
  const [showPrompt, setShowPrompt] = useState(false);

  const { user } = useUser();
  const convex = useConvex();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const fetchedOrganizations = await convex.query(api.organizations.getUserOrganizations, { kindeId: user.kindeId });
        if(fetchedOrganizations) {
          const mappedOrganizations: Organization[] = fetchedOrganizations.map(org => ({
            _id: org._id,
            _creationTime: org._creationTime,
            name: org.name,
            ownerId: org.ownerId
          }));
          setUserOrganizations(mappedOrganizations);
        
          if (mappedOrganizations.length > 0) {
            setInitialOrganization(mappedOrganizations[0]);
            const fetchedUsers = await convex.query(api.organizations.getOrganizationUsers, { organizationId: mappedOrganizations[0]._id });
            
            const mappedUsers: OrganizationUser[] = fetchedUsers.map(user => ({
              kindeId: user._id, 
              name: user.name || "Unknown", 
              email: user.email
            }));
        
            setOrganizationUsers(mappedUsers);
            setShowPrompt(false); 
          } else {
            setShowPrompt(true); 
          }
        } else {
          setShowPrompt(true);
        }
      }
    };
  
    fetchData();
  }, [user, convex]);

  if (!user) {
    return null; 
  }

  return (
    <OrganizationProvider
      initialOrganization={initialOrganization}
      initialUserOrganizations={userOrganizations}
      initialUsers={organizationUsers}
    >
      {showPrompt ? (
        <OrganizationPrompt 
          userId={user.kindeId}
          onCreateOrganization={(org: Organization) => {
            setInitialOrganization(org);
            setUserOrganizations([org]);
            setShowPrompt(false);
          }} 
        />
      ) : (
        children
      )}
    </OrganizationProvider>
  );
}

export default OrganizationProviderWrapper;