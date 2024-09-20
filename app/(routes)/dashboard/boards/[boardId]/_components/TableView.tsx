'use client';

import React from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Table, Row } from '@/app/types';

interface TableViewProps {
  tableId: Id<"tables">;
}

export default function TableView({ tableId }: TableViewProps) {
  // const table = useQuery(api.tables.getTable, { tableId }) as Table | null;
  const table = useQuery(api.tables.getTable, { tableId });
  const addRow = useMutation(api.tables.addRow);

  if (!table) return <div>Loading table...</div>;

  // Function to handle adding rows
  const handleAddRow = async () => {
    await addRow({ 
      tableId, 
      rowData: table.columns.reduce((acc, col) => ({...acc, [col.id]: ''}), {}), // Add empty cells
    });
  };

  return (
    <div>
      <h2>{table.name}</h2>
      <table>
        <thead>
          <tr>
            {table.columns.map(column => (
              <th key={column.id}>{column.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row: Row) => ( // Specify row as Row type
            <tr key={row.id}>
              {table.columns.map(column => (
                <td key={`${row.id}-${column.id}`}>
                  {row.cells[column.id] || ''} {/* Safely access cell data */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddRow}>Add Row</button>
    </div>
  );
}
