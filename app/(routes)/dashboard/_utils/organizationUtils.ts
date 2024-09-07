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
  const joinOrganizationMutation = useMutation(api.organizations.joinOrganization);
  
  return async (organizationId: Id<"organizations">, userId: string) => {
    try {
      const joinedOrg = await joinOrganizationMutation({ organizationId, userId });
      return joinedOrg;
    } catch (error) {
      console.error('Error joining organization:', error);
      throw error;
    }
  };
}


export function useGetOrganization(orgId: Id<"organizations"> | null) {
  return useQuery(api.organizations.getOrganization, orgId ? { orgId } : "skip");
}

// export function useGetOrganizationMembers(organizationId: Id<"organizations"> | undefined) {
//   return useQuery(api.organizations.getOrganizationMembers, 
//       organizationId ? { organizationId } : "skip"
//   );
// }

export function useGetOrganizationMembers(organizationId: Id<"organizations"> | undefined) {
  const result = useQuery(api.organizations.getOrganizationMembers, 
      organizationId ? { organizationId } : "skip"
  );
  return { members: result, isLoading: result === undefined, error: result instanceof Error ? result : null };
}