'use client';
import React, { useState } from "react";
import NotificationSearch from "./NotificationSearch";
import NotificationPersonFilter from "./NotificationPersonFilter";

export default function NotificationTabs() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const tabs = ["All", "Unread", "mentioned", "Assigned to me"];

  return (
    <div className="w-full mt-5">
      <div className="flex sm:space-x-2 border-b-2 sm:pb-1 border-gray-200 dark:border-borderDark text-sm">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${
              activeTab === tab
                ? "border-b-2 bg-blue-500  text-white"
                : "hover:bg-gray-200 dark:hover:bg-borderDark dark:text-textDark"
            } sm:py-1 px-3 focus:outline-none text-xs rounded-sm`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4">
        <div className="flex gap-2 items-center">
            <NotificationSearch onSearch={() => {}} />
            <NotificationPersonFilter />
        </div>
        <div className="">
            {activeTab === "All" && <p>All Notifications</p>}
            {activeTab === "Unread" && <p>Unread Notifications</p>}
            {activeTab === "mentioned" && <p>Mentions</p>}
            {activeTab === "Assigned to me" && <p>Assigned to Me</p>}
        </div>
      </div>
    </div>
  );
};