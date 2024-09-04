'use client';

import { useState } from 'react';
import { useCreateOrganization, useJoinOrganization } from '@/app/(routes)/dashboard/_utils/organizationUtils';
import { Id } from "@/convex/_generated/dataModel";
import { toast } from 'sonner';
import { useOrganization } from '@/app/contexts/organization/OrganizationContext';
import { Organization } from "@/app/types"; 

type OrganizationPromptProps = {
  userId: string;
  onCreateOrganization: (org: Organization) => void;
};

export default function OrganizationPrompt({ userId, onCreateOrganization }: OrganizationPromptProps) {
  const { currentOrganization, setCurrentOrganization, userOrganizations, setUserOrganizations, isLoading: isOrgLoading } = useOrganization();
  const [orgName, setOrgName] = useState('');
  const [orgId, setOrgId] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const createOrganization = useCreateOrganization();
  const joinOrganization = useJoinOrganization();

  if (isOrgLoading) {
    return <div>Loading Organization...</div>;
  }

  if (currentOrganization || userOrganizations.length > 0) {
    return null;
  }

  const handleCreateOrganization = async () => {
    if (orgName) {
      try {
        const result = await createOrganization(orgName, userId);
        if ('orgId' in result && 'workspaceId' in result) {
          const newOrg: Organization = {
            id: result.orgId,
            name: orgName,
            creatorId: userId
          };
          setUserOrganizations([...userOrganizations, newOrg]);
          onCreateOrganization(newOrg);
          toast.success('Organization created successfully');
        }
      } catch (error) {
        console.error("Failed to create organization:", error);
      }
    }
  };

  const handleJoinOrganization = async () => {
    if (orgId) {
      try {
        const organizationId = orgId as Id<"organizations">;
        const joinedOrg = await joinOrganization(organizationId, userId);
        
        if ('id' in joinedOrg && 'name' in joinedOrg && 'creatorId' in joinedOrg) {
          setUserOrganizations([...userOrganizations, joinedOrg as Organization]);
          onCreateOrganization(joinedOrg as Organization);
        }
        toast.success('Successfully joined the organization');
      } catch (error) {
        console.error("Failed to join organization:", error);
      }
    }
  };

  return (
    <section className="flex items-center justify-center w-full h-screen bg-gray-50 dark:bg-bgDark fixed z-50">
      <div className="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="bg-white dark:bg-workspaceDark border dark:border-borderDark p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Welcome! Let's get you started</h2>
          <div className="mb-4">
            <div className="flex space-x-2 mb-4">
              <button
                onClick={() => setIsJoining(false)}
                className={`px-4 py-2 h-8 w-full text-sm rounded text-white ${!isJoining ? 'bg-blue-500' : 'bg-[#3C414A] text-gray-700'}`}
              >
                Create
              </button>
              <button
                onClick={() => setIsJoining(true)}
                className={`px-4 py-2 h-8 w-full text-sm rounded text-white ${isJoining ? 'bg-green-500' : 'bg-[#3C414A] text-gray-700'}`}
              >
                Join
              </button>
            </div>
            {isJoining ? (
              <>
                <label className="text-sm mb-2">Organization Id</label>
                <input
                  type="text"
                  value={orgId}
                  onChange={(e) => setOrgId(e.target.value)}
                  className="w-full p-2 border dark:border-borderDark bg-inherit rounded placeholder:text-sm mb-2"
                />
                <button
                  onClick={handleJoinOrganization}
                  className="bg-green-500 hover:bg-green-600 text-sm text-white px-4 py-2 rounded w-full"
                >
                  Join Organization
                </button>
              </>
            ) : (
              <>
                <label className="text-sm mb-2">Organization Name</label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full p-2 border dark:border-borderDark bg-inherit rounded placeholder:text-sm mb-2"
                />
                <button
                  onClick={handleCreateOrganization}
                  className="bg-blue-500 hover:bg-blue-600 text-sm text-white px-4 py-2 rounded w-full"
                >
                  Create Organization
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}