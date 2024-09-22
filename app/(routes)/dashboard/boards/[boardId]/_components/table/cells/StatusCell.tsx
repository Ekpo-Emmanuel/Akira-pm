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
        updateData(props.row.index, props.column.id, newStatus); // Update the whole status object
    }

    // Default to "Not Started" if no valid status is found
    const displayName = name || 'Not Started'; // Fallback name if empty
    const displayColor = color || '#797E93';  // Default color for "Not Started"

    return (
        <Select onValueChange={(value) => {
            const selectedStatus = statusOptions.find(status => status.name === value);
            if (selectedStatus) {
                handleStatusChange(selectedStatus);
            }
        }}>
            <SelectTrigger
                className="w-full h-full text-black dark:text-white"
                style={{
                    backgroundColor: displayColor // Use the updated color or fallback color
                }}
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
                        >
                            <div className="flex items-center gap-2">
                                <ColorIcon color={status.color} />
                                {status.name}
                            </div>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
