import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { statusOptions } from '../../dummyData'

interface StatusCellProps {
    getValue: () => any,
    row: any,
    column: any,
    table: any
}

const ColorIcon = ({ color, ...props }: any) => (
    <div className="w-[12px] h-[12px] rounded-[3px]" style={{ backgroundColor: color }} {...props} />
)

export default function StatusCell(props: StatusCellProps) {
    const { id, name, color } = props.getValue() || {};  // Destructure with fallback
    const { updateData } = props.table.options.meta;

    // Ensure the status name and color are updated
    const handleStatusChange = (newStatus: any) => {
        updateData(props.row.index, props.column.id, newStatus); // Update the whole status object or clear it if null
    }

    const displayName = name || 'Not Started'; 
    const displayColor = name === "none" ? '#ffffff' : color || '#ffffff00';  // Pink color if "none", otherwise use the status color

    return (
        <Select 
            onValueChange={(value) => {
                if (value === 'none') {
                    handleStatusChange(null);  // Clear the status, which will set background to pink
                } else {
                    const selectedStatus = statusOptions.find(status => status.name === value);
                    if (selectedStatus) {
                        handleStatusChange(selectedStatus); // Update with selected status
                    }
                }
            }}
        >
            <SelectTrigger
              className="w-full h-full text-white/90"
              style={{ backgroundColor: displayColor }}
            >
              <SelectValue placeholder={displayName} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {statusOptions.map((status) => (
                        <SelectItem
                            key={status.id}
                            value={status.name}
                            className="w-full h-full"
                            style={{ backgroundColor: status.color }}
                        >
                            <div className="flex items-center gap-2">
                                {status.name}
                            </div>
                        </SelectItem>
                    ))}
                    {/* Add the "None" option to clear the status */}
                    <SelectItem
                      value="none"
                      className="w-full h-full bg-red-400"
                    >
                      <div className="flex items-center gap-2">
                        None
                      </div>
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
