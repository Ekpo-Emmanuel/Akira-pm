import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Ellipsis } from 'lucide-react';

const MoreActionsButton: React.FC = () => {
    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger>
                    <div className="hover:bg-bgLight dark:hover:bg-borderDark p-1 rounded-sm cursor-pointer">
                        <Ellipsis size={16} />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <span>See more actions</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default MoreActionsButton;