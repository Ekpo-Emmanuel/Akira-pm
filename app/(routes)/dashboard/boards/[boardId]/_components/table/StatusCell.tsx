'use client';

import React, { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { StatusOption } from '@/app/types';

type StatusCellProps = {
  row: any;
  value: string;
  statusOptions: StatusOption[];
  setStatusOptions: React.Dispatch<React.SetStateAction<StatusOption[]>>;
  updateStatus: (newStatus: string) => void;
};

const StatusCell: React.FC<StatusCellProps> = ({
  value,
  statusOptions,
  setStatusOptions,
  updateStatus,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newColor, setNewColor] = useState('#000000');

  const currentOption = statusOptions.find((option) => option.label === value);

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          className="flex items-center"
          style={{
            backgroundColor: currentOption?.color || '#ffffff',
            padding: '4px 8px',
            borderRadius: '4px',
          }}
        >
          {value}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        sideOffset={5}
        className="bg-white rounded-md shadow-md p-2 w-56"
      >
        {/* Existing Status Options */}
        {statusOptions.map((option) => (
          <DropdownMenu.Item
            key={option.label}
            className="flex items-center px-2 py-1 cursor-pointer"
            onSelect={() => {
              updateStatus(option.label);
              setIsOpen(false);
            }}
          >
            <div
              className="w-4 h-4 mr-2"
              style={{ backgroundColor: option.color }}
            ></div>
            {option.label}
          </DropdownMenu.Item>
        ))}

        <DropdownMenu.Separator className="my-1 h-px bg-gray-200" />

        {/* Add New Status Option */}
        <div className="px-2 py-1">
          <input
            type="text"
            placeholder="New label"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 w-full mb-1"
          />
          <input
            type="color"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            className="w-full mb-1"
          />
          <button
            onClick={() => {
              if (newLabel.trim() === '') return;
              const newOption = { label: newLabel, color: newColor };
              setStatusOptions((prev) => [...prev, newOption]);
              updateStatus(newLabel);
              setNewLabel('');
              setNewColor('#000000');
              setIsOpen(false);
            }}
            className="bg-blue-500 text-white px-2 py-1 rounded-md w-full"
          >
            Add New Status
          </button>
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default StatusCell;