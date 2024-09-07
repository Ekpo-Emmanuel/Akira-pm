'use client';

import React from 'react';
import { WorkspaceProvider } from './WorkspaceContext';
import { useUser } from '@/app/contexts/user/UserProviderClient';
import { useOrganization } from '@/app/contexts/organization/OrganizationContext';
import { Id } from '@/convex/_generated/dataModel';

export function WorkspaceProviderWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const { currentOrganization } = useOrganization();

  const organization = currentOrganization ? {
    ...currentOrganization,
    id: currentOrganization._id as Id<"organizations">
  } : null;

  return (
    <WorkspaceProvider user={user} currentOrganization={organization}>
      {children}
    </WorkspaceProvider>
  );
}