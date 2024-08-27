import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export function useCreateOrganization() {
  const createOrg = useMutation(api.organizations.createOrganization);

  return async (name: string, userId: string) => {
    try {
      const orgId = await createOrg({ name, userId });
      return orgId;
    } catch (error) {
      console.error("Failed to create organization:", error);
      throw error;
    }
  };
}

export function useJoinOrganization() {
  const joinOrg = useMutation(api.organizations.joinOrganization);

  return async (orgId: Id<"organizations">, userId: string) => {
    try {
      await joinOrg({ orgId, userId });
    } catch (error) {
      console.error("Failed to join organization:", error);
      throw error;
    }
  };
}

export function useGetUserOrganization(userId: string) {
  return useQuery(api.users.getUserOrganization, { kindeId: userId });
}