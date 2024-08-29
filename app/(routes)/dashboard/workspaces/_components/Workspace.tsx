import clsx from 'clsx';
import { HousePlus } from 'lucide-react';

interface WorkspaceProps {
  name: string;
  initial: string;
  color: string;
  onSelect: () => void;
  isSelected: boolean;
}

const Workspace: React.FC<WorkspaceProps> = ({ name, initial, color, onSelect, isSelected }) => {
  return (
    <div 
      className={clsx(
        "border dark:border-[#656f7d6d] rounded-md p-3 w-fit cursor-pointer transition-all duration-200",
        isSelected ? "bg-blue-100 dark:bg-blue-900" : "hover:bg-gray-100 dark:hover:bg-gray-800"
      )}
      onClick={onSelect}
    >
      <div className="flex items-start space-x-2">
        <div className="relative flex items-center space-x-2 p-1 dark:hover:bg-[#2A2E35] rounded-md w-fit">
          <div 
            className="h-[46px] w-[46px] text-lg text-white rounded-lg flex items-center justify-center"
            style={{ backgroundColor: color }}
          >
            {initial}
          </div>
          <div className="absolute right-0 border border-white dark:border-[#2A2E35] rounded-md bottom-0 bg-white dark:bg-[#2A2E35] p-[1px]">
            <HousePlus size={16} />
          </div>
        </div>
        <p className="text-md font-medium mt-2">{name}</p>
      </div>
    </div>
  );
};

export default Workspace;