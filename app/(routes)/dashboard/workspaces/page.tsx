'use client';

import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@/app/contexts/UserProvider';
import Workspace from './_components/Workspace';
import { Id } from '@/convex/_generated/dataModel';
import { Plus } from 'lucide-react';
import Header from './_components/Header';
import JointWorkspaces from './_components/JointWorkspaces/JointWorkspaces';
import MyWorkspaces from './_components/MyWorkspaces/MyWorkspaces';



export default function page() {
  const { user } = useUser();
  const [selectedWorkspace, setSelectedWorkspace] = useState<Id<"workspaces"> | null>(null);
  const organizationId = user?.organizationId as Id<"organizations"> | undefined;
  const workspaces = useQuery(api.workspaces.getWorkspaces, 
    organizationId ? { organizationId } : "skip"
  );
  const createWorkspace = useMutation(api.workspaces.createWorkspace);

  if (!organizationId) {
    return <div>You need to be part of an organization to view workspaces.</div>;
  }

  if (workspaces === undefined) {
    return <div>Loading workspaces...</div>;
  }

  const handleCreateWorkspace = async () => {
    const name = prompt("Enter workspace name:");
    if (name) {
      const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
      await createWorkspace({ 
        name, 
        organizationId, 
        color,
        createdBy: String(user?.id)
    });
    }
  };

  return (
    <section>
        <Header />
        <div className="h-screen">
            <div className="h-full grid grid-cols-1 md:grid-cols-[1.4fr_0.7fr] lg:grid-cols-[1.4fr_0.7fr] divide-y-[1px] md:divide-y-0 md:divide-x-[1px] divide-[#656f7d6d]">
                <div className="p-4 lg:py-10 lg:px-8 lg:pl-12">  
                    <JointWorkspaces handleCreateWorkspace={handleCreateWorkspace} />
                </div>
                <div className="p-4 lg:py-10 lg:px-8">  
                    <MyWorkspaces 
                        workspaces={workspaces}
                    />
                </div>
            </div>
        </div>
    </section>
  );
}