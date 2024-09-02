'use client';

import React, { createContext, useContext, useState } from 'react';

type User = {
  kindeId: string;
  name: string;
  email: string;
};

type Organization = {
  id: string;
  name: string;
  creatorId: string;
};

type OrganizationContextType = {
  currentOrganization: Organization | null;
  setCurrentOrganization: React.Dispatch<React.SetStateAction<Organization | null>>;
  userOrganizations: Organization[];
  setUserOrganizations: React.Dispatch<React.SetStateAction<Organization[]>>;
  currentUsers: User[];
  setCurrentUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export function OrganizationProvider({ 
  children, 
  initialOrganization,
  initialUserOrganizations,
  initialUsers
}: { 
  children: React.ReactNode; 
  initialOrganization: Organization | null;
  initialUserOrganizations: Organization[];
  initialUsers: User[];
}) {
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(initialOrganization);
  const [userOrganizations, setUserOrganizations] = useState<Organization[]>(initialUserOrganizations);
  const [currentUsers, setCurrentUsers] = useState<User[]>(initialUsers);

  return (
    <OrganizationContext.Provider value={{ 
      currentOrganization, 
      setCurrentOrganization, 
      userOrganizations,
      setUserOrganizations,
      currentUsers,
      setCurrentUsers
    }}>
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganization() {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
}