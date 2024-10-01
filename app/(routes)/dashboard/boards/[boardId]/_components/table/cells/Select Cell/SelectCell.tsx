import React from 'react';
import { CellContext } from '@tanstack/react-table';
import { StatusOption } from '@/app/types';

interface SelectCellProps {
    getValue: () => any,
    row: any,
    column: any,
    table: any
}

const SelectCell: React.FC<SelectCellProps> = ({ getValue, row, column, table }) => {
    const selectedOption = getValue();
    const options: StatusOption[] = table.getColumn(column.id)?.columnDef.meta?.options || [];

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = options.find(option => option.id === e.target.value);
        if (selected) {
            table.options.meta.updateData(row.index, column.id, selected);
        }
    };

    return (
        <select 
            value={selectedOption ? selectedOption.id : ''}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
        >
            <option value="">Select</option>
            {options.map(option => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            ))}
        </select>
    );
};

export default SelectCell;
