'use client';

import { useState } from 'react';
import { useCreateOrganization, useJoinOrganization, useGetUserOrganization } from '@/app/(routes)/dashboard/_utils/organizationUtils';
import { Id } from "@/convex/_generated/dataModel";

export default function OrganizationPrompt({ userId }: { userId: string }) {
  const [orgName, setOrgName] = useState('');
  const createOrganization = useCreateOrganization();
  const joinOrganization = useJoinOrganization();
  const userOrg = useGetUserOrganization(userId);

  if (userOrg === undefined) return <div>Loading...</div>;
  if (userOrg) return null; // User has a valid organization

  const handleCreateOrg = async () => {
    if (orgName) {
      try {
        await createOrganization(orgName, userId);
      } catch (error) {
        // Handle error (e.g., show error message to user)
      }
    }
  };

  const handleJoinOrg = async () => {
    const orgIdString = prompt("Enter organization ID:");
    if (orgIdString) {
      try {
        const orgId = orgIdString as Id<"organizations">;
        await joinOrganization(orgId, userId);
      } catch (error) {
        // Handle error (e.g., show error message to user)
      }
    }
  };


  return (
    <section className="flex items-center justify-center w-full h-screen bg-gray-50 dark:bg-gray-900 fixed z-50">
      <div className="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="bg-white  dark:bg-gray-800 border dark:border-gray-700 p-6 sm:p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Welcome! Let's get you started</h2>
          <div className="mb-4">
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="Organization name"
              className="w-full p-2 border rounded placeholder:text-sm"
            />
          </div>
          <button
            onClick={handleCreateOrg}
            className="bg-blue-500 hover:bg-blue-600 text-sm text-white px-4 py-2 rounded w-full"
          >
            Create Organization
          </button>
          {/* <button
            onClick={handleJoinOrg}
            className="bg-green-500 text-sm text-white px-4 py-2 rounded"
          >
            Join Existing Organization
          </button> */}
        <div className="mt-4" onClick={handleJoinOrg}>
          <p className="dark:text-gray-300 text-xs">or Join an existing <span className="text-blue-500 cursor-pointer">organization</span></p>
        </div>
        </div>
      </div>
    </section>
  );
}