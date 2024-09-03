'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Workspace, WorkspaceMember } from '@/app/types';
import { api } from "@/convex/_generated/api";
import { Id } from '@/convex/_generated/dataModel';

import { useConvex } from "convex/react";
import { useUser } from './UserProvider';
import { useOrganization } from './OrganizationContext';

type WorkspaceContextType = {
  currentWorkspace: Workspace | null;
  setCurrentWorkspace: React.Dispatch<React.SetStateAction<Workspace | null>>;
  userWorkspaces: Workspace[];
  setUserWorkspaces: React.Dispatch<React.SetStateAction<Workspace[]>>;
  currentWorkspaceMembers: WorkspaceMember[];
  setCurrentWorkspaceMembers: React.Dispatch<React.SetStateAction<WorkspaceMember[]>>;
};

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [userWorkspaces, setUserWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspaceMembers, setCurrentWorkspaceMembers] = useState<WorkspaceMember[]>([]);

  const convex = useConvex();
  const { user } = useUser();
  const { userOrganizations, currentOrganization } = useOrganization();
  console.log(currentOrganization)

  useEffect(() => {
    const fetchWorkspaces = async () => {
      if (user && currentOrganization) {
        const workspaces = await convex.query(api.workspaces.getUserWorkspaces, { 
          userId: user.id,
          organizationId: currentOrganization?.id as Id<"organizations">
        });
        setUserWorkspaces(workspaces);

        // const organizationId = currentOrganization?.id as Id<"organizations"> | undefined;
        // const workspaces = await convex.query(api.workspaces.getWorkspaces, { organizationId: organizationId } );

        // setUserWorkspaces(workspaces);
        if (workspaces.length > 0) {
          setCurrentWorkspace(workspaces[0]);
        }
      }
    };

    fetchWorkspaces();
  }, [convex, user]);

  useEffect(() => {
    const fetchWorkspaceMembers = async () => {
      if (currentWorkspace) {
        const members = await convex.query(api.workspaces.getWorkspaceMembers, { workspaceId: currentWorkspace.id as Id<"workspaces"> });
        const mappedMembers: WorkspaceMember[] = members.map(member => ({
          id: member._id.toString(), 
          userId: member.userId,
          workspaceId: member.workspaceId.toString(), 
          role: member.role
        }));
        setCurrentWorkspaceMembers(mappedMembers);
      }
    };
  
    fetchWorkspaceMembers();
  }, [currentWorkspace, convex]);

  return (
    <WorkspaceContext.Provider value={{ 
      currentWorkspace, 
      setCurrentWorkspace, 
      userWorkspaces,
      setUserWorkspaces,
      currentWorkspaceMembers,
      setCurrentWorkspaceMembers
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}