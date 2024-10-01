import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IoMdArrowDropdown } from "react-icons/io";

interface CollapseButtonProps {
    onClick: () => void;
}

const CollapseButton: React.FC<CollapseButtonProps> = ({ onClick }) => {
    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger>
                    <div
                        className="hover:bg-bgLight dark:hover:bg-borderDark p-1 rounded-sm cursor-pointer"
                        onClick={onClick}
                    >
                        <IoMdArrowDropdown size={20} />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <span>Collapse this group</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default CollapseButton;