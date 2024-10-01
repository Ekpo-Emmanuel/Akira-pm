import React from 'react';
import { CellContext } from '@tanstack/react-table';
import { PriorityOption } from '@/app/types';

interface PriorityCellProps {
    getValue: () => any,
    row: any,
}

const PriorityCell: React.FC<PriorityCellProps> = ({ getValue }) => {
    const priority = getValue();

    return (
        <span 
            style={{ 
                backgroundColor: priority.color, 
                color: '#fff', 
                padding: '0.2rem 0.5rem', 
                borderRadius: '4px',
                fontWeight: 'bold',
                display: 'inline-block',
            }}
        >
            {priority.name}
        </span>
    );
};

export default PriorityCell;
