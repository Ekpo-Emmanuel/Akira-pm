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

export type Workspace = {
  id: string;
  name: string;
  organizationId: string;
};

export type WorkspaceMember = {
  id: string;
  userId: string;
  workspaceId: string;
  role: string;
};