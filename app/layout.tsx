import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { KindeClientProvider } from '@/app/providers/KindeClientProvider'
import { ConvexClientProvider } from '@/app/providers/ConvexClientProvider'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { Toaster } from 'sonner'
import "./globals.css";


const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });

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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <KindeClientProvider>
          <ConvexClientProvider>
            <Toaster richColors />
            {children}
          </ConvexClientProvider>
        </KindeClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}