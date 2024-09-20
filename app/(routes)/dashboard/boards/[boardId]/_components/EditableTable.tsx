'use client';
import React, { useState } from 'react';

type Row = { [key: string]: string };

const EditableTable = () => {
  const [columns, setColumns] = useState<string[]>(['Item', 'Person', 'Status', 'Date', 'Description', 'Content Type', 'Final Link', 'Hours']);
  const [rows, setRows] = useState<Row[]>([{ Item: '', Person: '', Status: '', Date: '', Description: '', 'Content Type': '', 'Final Link': '', Hours: '' }]);
  
  const handleChange = (rowIndex: number, column: string, value: string) => {
    const updatedRows = rows.map((row, i) =>
      i === rowIndex ? { ...row, [column]: value } : row
    );
    setRows(updatedRows);
  };

  const addRow = () => {
    const newRow = columns.reduce((acc, col) => ({ ...acc, [col]: '' }), {}); // Create a new row with empty values for each column
    setRows([...rows, newRow]);
  };

  const addColumn = () => {
    const columnName = prompt('Enter the name for the new column:');
    if (columnName) {
      setColumns([...columns, columnName]);  
      setRows(rows.map(row => ({ ...row, [columnName]: '' }))); // Add new column to all rows with an empty value
    }
  };

  return (
    <div className="overflow-scroll">
      <table className="min-w-full table-auto border-collapse border border-gray-500">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="border border-gray-500 px-4 py-2">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="border border-gray-500 px-4 py-2">
                  <input
                    type="text"
                    value={row[column] || ''}
                    onChange={(e) => handleChange(rowIndex, column, e.target.value)}
                    className="bg-transparent w-full outline-none text-white"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-2 space-x-4">
        <button
          className="p-2 bg-blue-500 text-white rounded"
          onClick={addRow}
        >
          Add Row
        </button>
        <button
          className="p-2 bg-green-500 text-white rounded"
          onClick={addColumn}
        >
          Add Column
        </button>
      </div>
    </div>
  );
};

export default EditableTable;
