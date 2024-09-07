'use client';

import { useState } from 'react';
import { Id } from '@/convex/_generated/dataModel';
import Boards from '../Boards/Boards';


interface WorkspaceTabsProps{
  workspaceId: Id<"workspaces">;
}

export default function WorkspaceTabs(props: WorkspaceTabsProps){
  const [activeTab, setActiveTab] = useState('Recent boards');

  const tabs = ['Recent boards', 'Members', 'Permissions'];

  return (
    <div className="w-full mt-5 p-4 md:p-6">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-2 text-sm ${
              activeTab === tab
                ? 'text-blue-500 border-b-2 border-blue-500'
                : ''
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* <div className="mt-4 bg-gray-200 dark:bg-borderDark p-4 rounded-md"> */}
      <div className="mt-4">
        {activeTab === 'Recent boards' && <Boards workspaceId={props.workspaceId} />}
        {activeTab === 'Members' && <div>Your Members content here</div>}
        {activeTab === 'Permissions' && <div>Your Permissions content here</div>}
      </div>
    </div>
  );
};

