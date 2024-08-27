import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { KindeClientProvider } from '@/app/providers/KindeClientProvider'
import { ConvexClientProvider } from '@/app/providers/ConvexClientProvider'
import "./globals.css";


const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });


export const metadata: Metadata = {
  title: "Akira PM",
  description: "Project Management By Akira",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={bricolage.className}>
        <KindeClientProvider>
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>
        </KindeClientProvider>
      </body>
    </html>
  );
}
