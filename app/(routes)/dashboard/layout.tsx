import type { Metadata } from "next";
import { LoginLink, LogoutLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const {isAuthenticated, getUser} = getKindeServerSession();
    const user = await getUser();

    console.log(user)

  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  );
}
