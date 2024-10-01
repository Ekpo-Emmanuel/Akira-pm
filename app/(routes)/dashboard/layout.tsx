import type { Metadata } from "next";
import { UserProvider } from '@/app/contexts/user/UserProvider';
import OrganizationProviderWrapper from "@/app/contexts/organization/OrganizationProviderWrapper";
import { WorkspaceProviderWrapper } from '@/app/contexts/workspace/WorkspaceProviderWrapper';
import SideNav from "./_components/Navigation/SideNav/SideNav";
import TopNav from "./_components/Navigation/topNav/TopNav";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }: Readonly<{children: React.ReactNode;}>) {
  return (
    <UserProvider>
      <OrganizationProviderWrapper>
        <WorkspaceProviderWrapper>
          <main className="bg-bgLight dark:bg-bgDark dark:text-[#CCCCCC]">
            <div className="h-screen flex flex-col">
              <TopNav />
              <div className="flex flex-1 overflow-hidden pt-12">
                <SideNav />
                <section className="flex-1 bg-white dark:bg-workspaceDark border dark:border-borderDark overflow-y-auto">
                  {children}
                </section>
              </div>
            </div>
          </main>
        </WorkspaceProviderWrapper>
      </OrganizationProviderWrapper>
    </UserProvider>
  );
}

