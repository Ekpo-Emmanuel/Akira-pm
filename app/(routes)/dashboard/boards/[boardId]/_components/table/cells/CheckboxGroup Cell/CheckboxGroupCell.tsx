import React from 'react';
import { CellContext } from '@tanstack/react-table';

interface CheckboxGroupCellProps {
    getValue: () => any,
    row: any,
    column: any,
    table: any
}

const CheckboxGroupCell: React.FC<CheckboxGroupCellProps> = ({ getValue, row, column, table }) => {
    const selectedOptions = getValue();

    const handleChange = (option: string) => {
        let updatedOptions = [...selectedOptions];
        if (updatedOptions.includes(option)) {
            updatedOptions = updatedOptions.filter((o) => o !== option);
        } else {
            updatedOptions.push(option);
        }
        table.options.meta.updateData(row.index, column.id, updatedOptions);
    };

    // Assuming checkboxGroup options are predefined or stored elsewhere
    const options = ['Option 1', 'Option 2', 'Option 3'];

    return (
        <div className="flex flex-col">
            {options.map((option) => (
                <label key={option} className="inline-flex items-center">
                    <input
                        type="checkbox"
                        value={option}
                        checked={selectedOptions.includes(option)}
                        onChange={() => handleChange(option)}
                        className="form-checkbox"
                    />
                    <span className="ml-2">{option}</span>
                </label>
            ))}
        </div>
    );
};

export default CheckboxGroupCell;
