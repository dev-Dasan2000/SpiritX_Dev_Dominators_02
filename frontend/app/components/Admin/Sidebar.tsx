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
import { 
  LayoutGrid, 
  Users, 
  BarChart, 
  Flag, 
  Pen, 
  Settings,
  LogOut 
} from "lucide-react";
import { Button } from "../ui/button";

const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutGrid,
    group: "Main Menu"
  },
  {
    title: "Players",
    url: "/admin/players",
    icon: Users,
    group: "Management"
  },
  {
    title: "Player Stats",
    url: "/admin/stats",
    icon: BarChart,
    group: "Management"
  },
  {
    title: "Tournament Summary",
    url: "/admin/tournaments",
    icon: Flag,
    group: "Management"
  },
  {
    title: "Teams",
    url: "/admin/teams",
    icon: Pen,
    group: "Management"
  },
  
];

const AdminSidebar = () => {
  const pathname = usePathname(); // Get the current route
  
  // Group the menu items
  const menuGroups = items.reduce((groups, item) => {
    if (!groups[item.group]) {
      groups[item.group] = [];
    }
    groups[item.group].push(item);
    return groups;
  }, {});
  
  return (
    <Sidebar className="h-screen bg-[#1E293B] text-[#F8FAFC] border-r border-[#475569]">
      <SidebarHeader className="p-6 border-b border-[#475569]">
        <div className="flex items-center gap-3">
          <div className="bg-[#22D3EE] text-[#1E293B] font-bold w-8 h-8 rounded-lg flex items-center justify-center">FC</div>
          <span className="text-lg  text-black font-semibold">FantasyCricket</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="py-6 overflow-hidden">
        {Object.entries(menuGroups).map(([group, groupItems]) => (
          <SidebarGroup key={group} className="mb-8">
            <div className="px-6 mb-3 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">{group}</div>
            <SidebarGroupContent>
              <SidebarMenu >
                {groupItems.map((item) => {
                  const isActive = pathname === item.url;
                  const Icon = item.icon;
                  
                  return (
                    <SidebarMenuItem key={item.title} className="px-3  ">
                      <SidebarMenuButton  asChild>
                        <a 
                          href={item.url}
                          className={`flex items-center gap-3 px-2 py-8 mx-a rounded-lg transition-all ${
                            isActive 
                              ? "bg-[rgba(26,48,51,0.1)] text-black" 
                              : "text-black hover:bg-[#2C3E50]"
                          }`}
                        >
                          <Icon className={`w-[18px] h-[18px] ${isActive ? 'opacity-100' : 'opacity-80'}`} />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      
      <SidebarFooter className="p-6 mt-auto border-t border-[#475569]">
        <Button 
          className="w-full bg-transparent hover:bg-[#2C3E50] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#475569] rounded-lg flex items-center justify-center gap-2 py-3"
        >
          <LogOut className="w-[18px] h-[18px]" />
          <span>Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;