import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar";
import Navbar from "@/components/shared/Navbar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Head from "next/head";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#FAFAFC]">
        <Navbar />
        <div className="p-4 pt-0 min-h-screen bg-[#FAFAFC]">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
