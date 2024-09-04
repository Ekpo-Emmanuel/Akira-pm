'use client';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from "@/convex/_generated/dataModel";
import SingleWorkspaceHeader from "../../_components/Single workspace/SingleWorkspaceHeader";
import WorkspaceTabs from "../../_components/Single workspace/WorkspaceTabs";
import { usePathname } from 'next/navigation';

export default function WorkspaceTabPage({ params }: { params: { workspaceId: string, tab: string } }) {
  const workspace = useQuery(api.workspaces.getWorkspace, { id: params.workspaceId as Id<"workspaces"> });
  const pathname = usePathname();
  const currentTab = pathname.split('/').pop() || 'recent';

  if (!workspace) {
    return <div>Loading...</div>;
  }

  const renderTabContent = () => {
    switch (currentTab) {
      case 'recent':
        return <div>Recent Boards Content</div>;
      case 'lists':
        return <div>Lists Content</div>;
      case 'members':
        return <div>Members Content</div>;
      case 'settings':
        return <div>Settings Content</div>;
      default:
        return <div>Recent Boards Content</div>;
    }
  };

  return (
    <section>
      <SingleWorkspaceHeader />
      <WorkspaceTabs workspaceId={params.workspaceId} />
      {renderTabContent()}
    </section>
  );
}