import { Id } from "@/convex/_generated/dataModel";

export type User = {
  id: string;
  kindeId: string;
  email: string;
  name: string;
  given_name?: string;
  family_name?: string;
  organizationId?: Id<"organizations">;
};

export type Organization = {
  id: Id<"organizations">;
  name: string;
  creatorId: string;
};

export type OrganizationUser = {
  kindeId: string; 
  name: string; 
  email: string;
}

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