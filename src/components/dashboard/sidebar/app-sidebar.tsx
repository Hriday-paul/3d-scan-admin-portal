"use client";

import * as React from "react";
import {
  LayoutDashboard,
  PhoneCall,
  ScanQrCode,
  Settings,
  UsersRound,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import nsLogo from "../../../assets/images/ns-logo.png";
import Image from "next/image";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Account Details",
      url: "/account-details",
      icon: UsersRound,
    },
    {
      title: "Scan Submissions",
      url: "/scan-submissions",
      icon: ScanQrCode,
    },
    {
      title: "Contact List",
      url: "/contact-list",
      icon: PhoneCall,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="py-24">
              <Link href="/">
                <div className="flex items-center justify-center">
                  <Image
                    src={nsLogo}
                    alt="ns-logo"
                    width={600}
                    height={600}
                    className=" object-cover"
                  />
                </div>
                {/* <div className="grid flex-1 text-left text-sm leading-tight">
                  <h2 className="font-bold text-xl">Nobel Sport</h2>
                </div> */}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className=" -mt-10">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
