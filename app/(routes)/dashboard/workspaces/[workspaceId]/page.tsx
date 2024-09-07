'use client';
import { useEffect, useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from "@/convex/_generated/dataModel";
import SingleWorkspaceHeader from "../_components/Single workspace/SingleWorkspaceHeader";
import WorkspaceTabs from "../_components/Single workspace/WorkspaceTabs";

export default function WorkspacePage({ params }: { params: { workspaceId: string } }) {
  const workspace = useQuery(api.workspaces.getWorkspace, { id: params.workspaceId as Id<"workspaces"> });

  return (
    <section>
      <SingleWorkspaceHeader />
      <WorkspaceTabs workspaceId={params.workspaceId as Id<"workspaces">} />
    </section>
  );
}