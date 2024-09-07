'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Organization, OrganizationUser } from '@/app/types';

type User = {
  kindeId: string;
  name: string;
  email: string;
};


type OrganizationContextType = {
  currentOrganization: Organization | null;
  setCurrentOrganization: React.Dispatch<React.SetStateAction<Organization | null>>;
  userOrganizations: Organization[];
  setUserOrganizations: React.Dispatch<React.SetStateAction<Organization[]>>;
  currentUsers: User[];
  setCurrentUsers: React.Dispatch<React.SetStateAction<User[]>>;
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading organization data
    setIsLoading(true);
    // If you have any async operations to fetch organization data, do them here
    // For now, we'll just use the initial values
    setCurrentOrganization(initialOrganization);
    setUserOrganizations(initialUserOrganizations);
    setCurrentUsers(initialUsers);
    setIsLoading(false);
  }, [initialOrganization, initialUserOrganizations, initialUsers]);

  return (
    <OrganizationContext.Provider value={{ 
      currentOrganization, 
      setCurrentOrganization, 
      userOrganizations,
      setUserOrganizations,
      currentUsers,
      setCurrentUsers,
      isLoading
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