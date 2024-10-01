import React from 'react';
import { CellContext } from '@tanstack/react-table';

interface PeopleCellProps {
    getValue: () => any,
    row: any,
}

const PeopleCell: React.FC<PeopleCellProps> = ({ getValue, row }) => {
    const people = getValue();

    return (
        <div className="flex space-x-2">
            {people.map((person: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, index: React.Key | null | undefined) => (
                <span 
                    key={index} 
                    className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs"
                >
                    {person}
                </span>
            ))}
        </div>
    );
};

export default PeopleCell;
