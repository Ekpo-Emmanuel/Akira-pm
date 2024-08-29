import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
  
import { ChevronRight, ChevronDown, CircleAlert, HousePlus, Plus } from 'lucide-react';
import clsx from "clsx";

export default function Workspaces() {
  return (
    <section>
        <div className="flex flex-col space-y-2">
        <Collapsible>
            <CollapsibleTrigger className="flex justify-between items-center w-full ">
                <div className="flex items-center space-x-1 hover:text-white py-2 rounded">
                    <ChevronRight size={16} />
                    <span className="text-md font-medium">My Workspaces </span>
                    <p className="text-[10px]">10</p>
                </div>
                <div 
                    className="inline-flex items-center justify-center w-fit gap-1 dark:bg-[#1c1f23] font-medium rounded-lg text-xs p-2.5 text-center "
                // className=" rounded-md p-2 w-fit cursor-pointer flex items-center gap-2 justify-center"
                >
                    <Plus size={16} strokeWidth={1} />
                    <p>New Workspace</p>
                </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="dark:bg-[#1E2024] rounded-md border dark:border-[#656f7d6d] p-2 sm:p-4">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-4">
                <div className="dark:bg-[#2A2E35] rounded-md p-2 w-full cursor-pointer">
                    <div className="flex items-start space-x-2">
                        <div className={clsx(
                            "relative flex items-center space-x-2 p-1 rounded-md w-fit",
                        )}>
                            <div className={clsx(
                                "bg-red-600 h-[36px] w-[36px] sm:h-[46px] sm:w-[46px] text-lg text-white rounded-lg flex items-center justify-center",
                            )}>
                                M
                            </div>
                                <div className="absolute right-0 border border-white dark:border-[#2A2E35] rounded-md bottom-0 bg-white dark:bg-[#2A2E35] p-[1px]">
                                    <HousePlus size={16} />
                                </div>
                        </div>
                        <p className="text-md font-medium mt-2">Main Workspace</p>
                    </div>
                </div>
            </div>
            </CollapsibleContent>
        </Collapsible>
        </div>
    </section>
  );
}
