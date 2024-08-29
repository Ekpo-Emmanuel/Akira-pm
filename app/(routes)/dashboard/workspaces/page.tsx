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
//   const { user } = useUser();
//   const [selectedWorkspace, setSelectedWorkspace] = useState<Id<"workspaces"> | null>(null);
//   const organizationId = user?.organizationId as Id<"organizations"> | undefined;
//   const workspaces = useQuery(api.workspaces.getWorkspaces, 
//     organizationId ? { organizationId } : "skip"
//   );
//   const createWorkspace = useMutation(api.workspaces.createWorkspace);

//   if (!organizationId) {
//     return <div>You need to be part of an organization to view workspaces.</div>;
//   }

//   if (workspaces === undefined) {
//     return <div>Loading workspaces...</div>;
//   }

//   const handleCreateWorkspace = async () => {
//     const name = prompt("Enter workspace name:");
//     if (name) {
//       const color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Generate a random color
//       await createWorkspace({ 
//         name, 
//         organizationId, 
//         color,
//         createdBy: String(user?.id)
//     });
//     }
//   };

  return (
    // <div className="p-6">
    //   <h1 className="text-2xl font-bold mb-6">Workspaces</h1>
    //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    //     {workspaces.map((workspace) => (
    //       <Workspace
    //         key={workspace._id}
    //         name={workspace.name}
    //         initial={workspace.name[0].toUpperCase()}
    //         color={workspace.color}
    //         onSelect={() => setSelectedWorkspace(workspace._id)}
    //         isSelected={selectedWorkspace === workspace._id}
    //       />
    //     ))}
    //     <button 
    //       onClick={handleCreateWorkspace}
    //       className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors duration-200"
    //     >
    //       <Plus className="mr-2" />
    //       New Workspace
    //     </button>
    //   </div>
    // </div>
    <section>
        <Header />
        <div className="h-screen">
            <div className="h-full grid grid-cols-1 md:grid-cols-[1.4fr_0.7fr] lg:grid-cols-[1.4fr_0.7fr] divide-y-[1px] md:divide-y-0 md:divide-x-[1px] divide-[#656f7d6d]">
                <div className="p-4 lg:py-10 lg:px-8 lg:pl-12">  
                    <JointWorkspaces />
                </div>
                <div className="p-4 lg:py-10 lg:px-8">  
                    <MyWorkspaces />
                </div>
            </div>
        </div>
    </section>
  );
}