import { Id } from "@/convex/_generated/dataModel";
import { ColumnDef } from '@tanstack/react-table';

export type User = {
  id: Id<"users">;
  kindeId: string;
  email: string;
  name: string;
  given_name?: string;
  family_name?: string;
  organizationId?: Id<"organizations">;
};

//Organization
export type Organization = {
  _id: Id<"organizations">;
  _creationTime: number;
  name: string;
  ownerId: string;
};

export type OrganizationUser = {
  kindeId: string; 
  name: string; 
  email: string;
}

export type OrganizationMember = {
  id: string;
  organizationId: Id<"organizations">;
  userId: string;
  role: string;
};

// Workspace
export type Workspace = {
  _id: Id<"workspaces">;
  _creationTime: number;
  name: string;
  organizationId: Id<"organizations">;
  color: string;
  createdBy: string;
  description?: string;
}

export type WorkspaceMember = {
  id: string;
  userId: string;
  workspaceId: string;
  role: string;
};

//Board
export type Board = {
  _id: Id<"boards">;
  name: string;
  workspaceId: Id<"workspaces">;
  description?: string;
  createdBy: Id<"users">;
  // _creationTime: number;
}

export type Table = {
  _id: Id<"tables">;
  boardId: Id<"boards">;
  name: string;
  columns: Column[];
  groups: Group[];
  createdBy: Id<"users">;
  createdAt: number;
}

export const COLUMN_TYPES = [
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'date', label: 'Date' },
  { value: 'select', label: 'Select' },
  { value: 'multiselect', label: 'Multiselect' },
  { value: 'status', label: 'Status' },
  { value: 'people', label: 'People' },
  { value: 'date_timeline', label: 'Date Timeline' },
  { value: 'priority', label: 'Priority' },
  { value: 'checkbox_group', label: 'Checkbox Group' },
  { value: 'label', label: 'Label' },
];

export type ColumnType = 
  | 'text' 
  | 'number' 
  | 'date' 
  | 'select' 
  | 'multiselect' 
  | 'status' 
  | 'people' 
  | 'date_timeline' 
  | 'priority' 
  | 'checkbox_group' 
  | 'label';

export type Column = {
  id: string;
  name: string;
  type: ColumnType;
  options?: StatusOption[] | PriorityOption[] | LabelOption[];
}

export type Row = {
  id: string;
  task: string;
  status?: StatusOption;
  dueDate?: string;
  assignees?: string[];
  dateTimeline?: { start: string; end: string }; 
  priority?: PriorityOption;
  checkboxGroup?: string[]; 
  labels?: LabelOption[];
  [key: string]: any;
}

export type StatusOption = {
  id: string;
  name: string;
  color: string;
}

export type Group = {
  id: string;
  name: string;
  columns: Column[];
  rows: Row[];
}

export type statusOptions = {
  id: string; 
  name: string; 
  color: string;
}

export type PriorityOption = {
  id: string;
  name: string;
  color: string;
};

export type LabelOption = {
  id: string;
  name: string;
  color: string;
};

// Update the Task type to include subItems
export type Task = {
  id: string;
  task: string;
  status: string;
  due_date: string;
  notes: string;
  group?: string;
  [key: string]: any;
};

// Define the TaskGroup type
export type TaskGroup = {
  id: string;
  groupName: string;
  collapsed: boolean;
  items: Task[];
};



export type CustomColumnDef<T> = {
  id?: string;
  accessorKey: keyof T | string;
  header: string | React.ReactNode;
  cell?: (info: { getValue: () => any, row: { original: T } }) => React.ReactNode;
  enableSorting?: boolean;
}
