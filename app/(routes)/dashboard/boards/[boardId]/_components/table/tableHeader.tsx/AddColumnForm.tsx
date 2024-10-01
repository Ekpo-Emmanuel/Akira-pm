import React, { useState } from 'react';
import { COLUMN_TYPES } from '@/app/types'; 
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { v4 as uuidv4 } from 'uuid';

interface AddColumnFormProps {
    onAddColumn: (newColumn: any) => void;
}

const AddColumnForm: React.FC<AddColumnFormProps> = ({ onAddColumn }) => {
    const [columnName, setColumnName] = useState('');
    const [selectedType, setSelectedType] = useState<string>('');
    const [options, setOptions] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const uniqueId = uuidv4(); //generates a unique id for the column
        // Construct the new column object based on selectedType and options
        const newColumn = {
            id: uniqueId,
            name: columnName,
            type: selectedType,
            options: options ? options.split(',').map(opt => opt.trim()) : undefined,
        };
        onAddColumn(newColumn);
        // Reset form
        setColumnName('');
        setSelectedType('');
        setOptions('');
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col gap-2">
                <div className="flex flex-col mb-2">
                    <label htmlFor="columnName" className="mb-1 text-sm opacity-70">Column Name:</label>
                    <input
                        type="text"
                        id="columnName"
                        name="columnName"
                        className="border border-gray-300 dark:border-borderDark text-gray-900 rounded-md block w-full px-1.5 h-8 bg-inherit dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-none placeholder:text-xs"
                        placeholder="e.g. Priority"
                        value={columnName}
                        onChange={(e) => setColumnName(e.target.value)}
                        required
                    />
                </div>
                
                {/* Column Type Selection as Grid */}
                <div className="flex flex-col mb-2">
                    <span className="mb-1 text-sm opacity-70">Column Type:</span>
                    <RadioGroup 
                        value={selectedType} 
                        onValueChange={setSelectedType} 
                        className="grid grid-cols-2 gap-1"
                    >
                        {COLUMN_TYPES.map((type) => (
                            <label 
                                key={type.value} 
                                className="flex items-center text-sm p-2 border rounded-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <RadioGroupItem 
                                    value={type.value} 
                                    className="mr-2" 
                                />
                                {type.label}
                            </label>
                        ))}
                    </RadioGroup>
                </div>
            </div>

            {/* Additional Options for Select-like Columns */}
            {['select', 'multiselect', 'status', 'priority', 'label', 'checkbox_group'].includes(selectedType) && (
                <div className="flex flex-col md:flex-row md:space-x-4 mt-4">
                    <div className="flex flex-col mb-2 md:mb-0">
                        <label htmlFor="options" className="mb-1">Options (comma separated):</label>
                        <input 
                            type="text" 
                            id="options" 
                            name="options" 
                            className="border p-2 rounded"
                            placeholder="e.g., Option1, Option2, Option3"
                            value={options}
                            onChange={(e) => setOptions(e.target.value)}
                        />
                    </div>
                </div>
            )}

            <div className="mt-4">
                <button 
                    type="submit" 
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
                    disabled={!columnName || !selectedType}
                >
                    Add Column
                </button>
            </div>
        </form>
    );
};

export default AddColumnForm;