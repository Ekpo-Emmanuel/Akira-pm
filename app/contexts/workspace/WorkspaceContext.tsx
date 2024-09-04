'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Workspace, WorkspaceMember, User, Organization } from '@/app/types';
import { api } from "@/convex/_generated/api";
import { Id } from '@/convex/_generated/dataModel';
import { useConvex } from "convex/react";

type WorkspaceContextType = {
  currentWorkspace: Workspace | null;
  setCurrentWorkspace: React.Dispatch<React.SetStateAction<Workspace | null>>;
  userWorkspaces: Workspace[];
  setUserWorkspaces: React.Dispatch<React.SetStateAction<Workspace[]>>;
  currentWorkspaceMembers: WorkspaceMember[];
  setCurrentWorkspaceMembers: React.Dispatch<React.SetStateAction<WorkspaceMember[]>>;
};

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

type WorkspaceProviderProps = {
  children: React.ReactNode;
  user: User | null;
  currentOrganization: Organization | null;
};

export function WorkspaceProvider({ children, user, currentOrganization }: WorkspaceProviderProps) {
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [userWorkspaces, setUserWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspaceMembers, setCurrentWorkspaceMembers] = useState<WorkspaceMember[]>([]);

  const convex = useConvex();

  useEffect(() => {
    const fetchWorkspaces = async () => {
      if (user && currentOrganization) {
        const workspaces = await convex.query(api.workspaces.getWorkspaces, { 
          organizationId: currentOrganization.id as Id<"organizations">
        });

        setUserWorkspaces(workspaces);
        if (workspaces.length > 0) {
          setCurrentWorkspace(workspaces[0]);
        }
      }
    };

    fetchWorkspaces();
  }, [convex, user, currentOrganization]);

  useEffect(() => {
    const fetchWorkspaceMembers = async () => {
      if (currentWorkspace) {
        const members = await convex.query(api.workspaces.getWorkspaceMembers, { workspaceId: currentWorkspace._id as Id<"workspaces"> });
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