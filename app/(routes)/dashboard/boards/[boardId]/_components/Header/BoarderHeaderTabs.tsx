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
    <div className="">
      <div className="px-4 flex items-center border-b-[1px] dark:border-borderDark">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={clsx(
              'px-2 h-6 text-xs font-medium dark:hover:bg-borderDark rounded-md',
              activeTab === index
                ? 'text-black dark:text-white underline underline-offset-8 decoration-1 decoration-blue-500 dark:decoration-blue-400'
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