'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from "@/convex/_generated/dataModel";
import SingleWorkspaceHeader from "../_components/Single workspace/SingleWorkspaceHeader";
import WorkspaceTabs from "../_components/Single workspace/WorkspaceTabs";

export default function WorkspacePage({ params }: { params: { workspaceId: string } }) {
  const router = useRouter();
  const workspace = useQuery(api.workspaces.getWorkspace, { id: params.workspaceId as Id<"workspaces"> });

  useEffect(() => {
    router.replace(`/dashboard/workspaces/${params.workspaceId}/recent`);
  }, [router, params.workspaceId]);

  if (!workspace) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <SingleWorkspaceHeader />
      <WorkspaceTabs workspaceId={params.workspaceId} />
    </section>
  );
}