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
        const mappedOrganizations: Organization[] = fetchedOrganizations.map(org => ({
          id: org._id,
          name: org.name,
          creatorId: org.ownerId
        }));
      
        setUserOrganizations(mappedOrganizations);
      
        if (mappedOrganizations.length > 0) {
          setInitialOrganization(mappedOrganizations[0]);
          const fetchedUsers = await convex.query(api.organizations.getOrganizationUsers, { organizationId: mappedOrganizations[0].id });
          
          const mappedUsers: OrganizationUser[] = fetchedUsers.map(user => ({
            kindeId: user.kindeId, 
            name: user.name || "Unknown", 
            email: user.email
          }));
      
          setOrganizationUsers(mappedUsers);
          setShowPrompt(false); // Hide prompt if user has organizations
        } else {
          setShowPrompt(true); // Show prompt only if user has no organizations
        }
      }
    };
  
    fetchData();
  }, [user, convex]);

  if (!user) {
    return null; // Or a loading indicator
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
          onCreateOrganization={(org) => {
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