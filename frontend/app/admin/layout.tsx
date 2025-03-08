"use client";

import AdminSidebar from "@/components/AdminSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Fixed Sidebar */}
      <div className="w-64 fixed inset-y-0 left-0 z-50">
        <AdminSidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 ml-64 overflow-auto p-6 bg-gray-100">
        {children}
      </div>
    </div>
  );
}
