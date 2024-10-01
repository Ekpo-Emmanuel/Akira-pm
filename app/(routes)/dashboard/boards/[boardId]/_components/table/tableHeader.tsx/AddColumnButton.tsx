import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus } from 'lucide-react';
import AddColumnForm from './AddColumnForm';

interface AddColumnButtonProps {
    onAddColumn: (newColumn: any) => void; 
}

const AddColumnButton: React.FC<AddColumnButtonProps> = ({ onAddColumn }) => {
    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger>
                    <Popover>
                        <PopoverTrigger>
                            <div className="hover:bg-bgLight dark:hover:bg-borderDark p-1 rounded-sm cursor-pointer">
                                <Plus size={16} />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <AddColumnForm onAddColumn={onAddColumn} />
                        </PopoverContent>
                    </Popover>
                </TooltipTrigger>
                <TooltipContent>
                    <span>Add new column</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default AddColumnButton;