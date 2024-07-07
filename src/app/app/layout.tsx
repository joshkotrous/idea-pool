import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/navigation";
import AppNavigation from "@/components/appNavigation";
import { AuthProvider } from "@/utils/supabase/authProvider";
const inter = Inter({ subsets: ["latin"] });
import { isMobile } from "react-device-detect";

export const metadata: Metadata = {
  title: "Idea Pool",
  description: "Crowdsource your ideas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <main className="flex flex-col p-4 pt-2 h-screen max-h-screen overflow-hidden items-center">
        <div className="flex w-full h-full max-h-screen max-w-[1024px] gap-4">
          <Navigation />
          {!isMobile && <AppNavigation />}
          {children}
        </div>
      </main>
    </AuthProvider>
  );
}
