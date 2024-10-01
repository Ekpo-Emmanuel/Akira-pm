import React from 'react';
import { CellContext } from '@tanstack/react-table';
import { StatusOption } from '@/app/types';

interface MultiSelectCellProps {
    getValue: () => any,
    row: any,
    column: any,
    table: any
}

const MultiSelectCell: React.FC<MultiSelectCellProps> = ({ getValue, row, column, table }) => {
    const selectedOptions = getValue() || [];
    const options: StatusOption[] = table.getColumn(column.id)?.columnDef.meta?.options || [];

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
        const updatedOptions = options.filter(option => selectedValues.includes(option.id));
        table.options.meta.updateData(row.index, column.id, updatedOptions);
    };

    return (
        <select 
            multiple 
            value={selectedOptions.map((option: { id: any; }) => option.id)}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
        >
            {options.map(option => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            ))}
        </select>
    );
};

export default MultiSelectCell;
