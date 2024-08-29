import React from "react";

export default function MyWorkspaces() {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <h2 className="text-md font-medium dark:text-white">
          Visible Workspaces
        </h2>
        <span className="text-xs opacity-50">
          Spaces shown in your left sidebar
        </span>
      </div>
      <div className="border-t dark:border-[#656f7d6d] py-4">
        <div className="flex items-center justify-between p-2 rounded-md hover:bg-[#656f7d6d] group">
          <div className="flex items-center space-x-3 cursor-default">
            <div
              className="h-[26px] w-[26px] text-md text-white rounded-sm flex items-center justify-center"
              style={{
                backgroundColor: "red",
              }}
            >
              T
            </div>
            <p className="text-sm">Team Space</p>
          </div>
          <p className="text-xs bg-transparent hover:bg-[#656f7d96] px-2 py-1 rounded-md cursor-pointer opacity-0 group-hover:opacity-100">
            Hide
          </p>
        </div>
      </div>
    </div>
  );
}
