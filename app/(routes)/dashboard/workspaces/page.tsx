'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@/app/contexts/user/UserProviderClient';
import { Id } from '@/convex/_generated/dataModel';
import Header from './_components/Header';
import JointWorkspaces from './_components/JointWorkspaces/JointWorkspaces';
import { useWorkspace } from '@/app/contexts/workspace/WorkspaceContext';
import { toast } from 'sonner';
import { useCreateOrganization, useJoinOrganization, useGetUserOrganization } from '@/app/(routes)/dashboard/_utils/organizationUtils';
import { useOrganization } from '@/app/contexts/organization/OrganizationContext';
import DashboardAnimation from '@/app/_components/DashboardAnimation';
import { SWorkspace } from '@/app/_components/Skeleton/SWorkspace';

export default function Page() {
  const { user } = useUser();
  const { currentOrganization, userOrganizations } = useOrganization();
  const { userWorkspaces, setUserWorkspaces } = useWorkspace();
  const createWorkspace = useMutation(api.workspaces.createWorkspace);
  const deleteWorkspaceMutation = useMutation(api.workspaces.deleteWorkspace);

  if (!currentOrganization) {
    return <SWorkspace />;
  }

  function toUserId(userId: string): Id<"users"> {
    return userId as unknown as Id<"users">;
  }

  const handleCreateWorkspace = async (
    workspaceName: string, 
    workspaceColor: string, 
    organizationId: Id<"organizations"> | undefined,
    createdBy: string,
    visibility: string,
    members: string[], 
    workspaceDescription?: string,
  ) => {
    if (workspaceName && organizationId) {
      try {
        const convertedMembers = members?.map(toUserId); 

        // const newWorkspace = await createWorkspace({ 
        //   name: workspaceName, 
        //   organizationId, 
        //   color: workspaceColor,
        //   createdBy: createdBy,
        //   description: workspaceDescription,
        //   visibility: visibility,
        //   members: visibility === 'private' ? convertedMembers : undefined
        // }) as Workspace;

        // setUserWorkspaces([...userWorkspaces, newWorkspace]);
        console.log('workspace details' + 
          'workspaceName: ' + workspaceName, 
          'color:' + workspaceColor, 
          'organizationId: ' + organizationId, 
          'createdBy: ' + createdBy, 
          'visibility: ' + visibility, 
          'description: ' + workspaceDescription, 
          'members: ' + convertedMembers
        );
        toast.success('Workspace created successfully');
      } catch (error) {
        console.error('Error creating workspace:', error);
        toast.error('Failed to create workspace');
      }
    } else {
      console.error('Missing required fields for workspace creation');
    }
  };

  const handleDeleteWorkspace = async (workspaceId: Id<"workspaces">) => {
    try {
      await deleteWorkspaceMutation({ workspaceId });
      setUserWorkspaces(userWorkspaces.filter(workspace => workspace._id !== workspaceId));
      toast.success('Workspace deleted successfully');
    } catch (error) {
      console.error('Error deleting workspace:', error);
      toast.error('Failed to delete workspace');
    }
  }

  return (
    <section>
      <Header />
      <div>
        <div className="h-full">
          <div className="p-4 lg:py-10 lg:px-8 lg:pl-12">  
            <JointWorkspaces 
              handleCreateWorkspace={handleCreateWorkspace}
              handleDeleteWorkspace={handleDeleteWorkspace}
              currentUserId={user?.id as string}
            />
          </div>
        </div>
      </div>
    </section>
  );
}