"use client";

import { usePathname } from "next/navigation";


import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarProvider, 
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarInset,
} from "../ui/sidebar";

import Image from "next/image";
import { LayoutGrid, KanbanSquare, Ticket, ClipboardList } from "lucide-react";
import { Button } from "../ui/button";


const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutGrid,
  },
  {
    title: "Students",
    url: "/admin/students",
    icon: KanbanSquare,
  },
  {
    title: "Counselor",
    url: "/admin/counselor",
    icon: Ticket,
  },
  {
    title: "Dead Leads",
    url: "/admin/deadlead",
    icon: ClipboardList,
  },
];

const AdminSidebar = () => {
  const pathname = usePathname(); // Get the current route
  
  return (
    <Sidebar className="justify-center px-0 py-0 mx-auto my-0 absolute">
            <SidebarHeader className="px-0 py-0 justify-center ">
              <Image 
                src="/im.jpg" 
                alt="Logo" 
                width={150} 
                height={100} 
                className="my-auto mx-auto px-4 py-10 justify-center w-full" 
              />
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {items.map((item) => {
                      const isActive = pathname === item.url;
                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <a 
                              href={item.url}
                              className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
                                isActive ? "bg-[#9D2429] text-white" : "hover:bg-gray-100 text-gray-800"
                              }`}
                            >
                              <item.icon className="w-5 h-5" />
                              {item.title}
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <Button type="submit" className="bg-[#8B1E23] text-white hover:bg-[#9D2429] mb-24">
                Logout
              </Button>
            </SidebarFooter>
          </Sidebar>
  )
}

export default AdminSidebar