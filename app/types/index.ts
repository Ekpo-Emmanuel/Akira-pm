import { Id } from "@/convex/_generated/dataModel";

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

export type Column = {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'select' | 'multiselect';
  options?: string[];
}

export type Group = {
  id: string;
  name: string;
}

export type Row = {
  _id: Id<"rows">;
  tableId: Id<"tables">;
  groupId: string;
  data: { [columnId: string]: any };
  createdBy: Id<"users">;
  createdAt: number;
  updatedAt: number;
}