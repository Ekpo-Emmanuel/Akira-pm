import React from 'react';
import { CellContext } from '@tanstack/react-table';
import { LabelOption } from '@/app/types';

interface LabelCellProps {
    getValue: () => any,
    row: any,
}

const LabelCell: React.FC<LabelCellProps> = ({ getValue }) => {
    const labels = getValue();

    return (
        <div className="flex space-x-2">
            {/* {labels.map((label, index) => (
                <span 
                    key={index} 
                    style={{ backgroundColor: label.color }} 
                    className="text-white px-2 py-1 rounded-full text-xs"
                >
                    {label.name}
                </span>
            ))} */}
        </div>
    );
};

export default LabelCell;
