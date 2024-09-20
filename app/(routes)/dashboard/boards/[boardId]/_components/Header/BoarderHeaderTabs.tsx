'use client';

import { useState } from 'react';
import clsx from 'clsx';
import BoardDetail from '../BoardDetail';
import { Id } from '@/convex/_generated/dataModel';


type Tab = {
  name: string;
  content: JSX.Element;
};

interface BoarderHeaderTabsProps {
    boardId: string;
}



export default function BoarderHeaderTabs(props: BoarderHeaderTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs: Tab[] = [
    { name: 'Main Table', content: <BoardDetail boardId={props.boardId as Id<"boards">} /> },
    { name: 'Chart', content: <div>Chart Content</div> },
  ];
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="p-4">
      <div className="flex items-center border-b-[1px] dark:border-borderDark">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={clsx(
              'px-4 py-2 text-sm font-medium',
              activeTab === index
                ? 'text-black dark:text-white border-b-[2px] border-blue-500'
                : 'text-gray-600 dark:text-gray-400 '
            )}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="">
        {tabs[activeTab].content}
      </div>
    </div>
  );
}