import React from "react";
import clsx from "clsx";

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Home, Settings, FileText, PanelsTopLeft, ChevronDown } from 'lucide-react';


import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

interface ProfileIconProps {
  showStatusBar: Checked;
  showActivityBar: Checked;
  showPanel: Checked;
  setShowPanel: React.Dispatch<React.SetStateAction<Checked>>;
  setShowStatusBar: React.Dispatch<React.SetStateAction<Checked>>;
  setShowActivityBar: React.Dispatch<React.SetStateAction<Checked>>;
}

export default function ProfileIcon(props: ProfileIconProps) {
  const { showStatusBar, showActivityBar, showPanel, setShowPanel, setShowStatusBar, setShowActivityBar } = props;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={clsx(
            "relative flex items-center space-x-1 p-1 bg-[#eaeaf097] dark:bg-[#2A2E35] focus:bg-[#2A2E35] rounded-full cursor-pointer",
          )}
        >
            <div
                className={clsx(
                "relative bg-green-900 h-[26px] w-[26px] text-sm text-white rounded-full flex items-center justify-center",
                )}
            >
                E
                <div className="absolute right-0 border rounded-sm bottom-0 bg-green-400 p-[3px]" />
            </div>
            <div className="flex gap-1 items-center">
                <ChevronDown size={12} />
            </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px] bg-white dark:bg-workspaceDark  dark:border-borderDark">
        <DropdownMenuLabel>
          <div
            className={clsx(
              "relative flex items-center space-x-2 dark:hover:bg-[#2A2E35] focus:bg-[#2A2E35] rounded-md cursor-pointer",
            )}
          >
            <div
              className={clsx(
                "bg-green-900 h-[36px] w-[36px] text-sm text-white rounded-lg flex items-center justify-center",
              )}
            >
              E
            </div>
            <div className="flex gap-1 items-center">
              <span className="text-sm">Emmanuel Ekpo's Wo...</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="dark:bg-borderDark" />
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
          disabled
        >
          Activity Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
        >
          Panel
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
