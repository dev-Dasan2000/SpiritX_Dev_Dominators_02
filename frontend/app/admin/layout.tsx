'use client';

import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import '../globals.css';
import { Sidebar } from 'lucide-react';
import { SidebarProvider } from '../components/ui/sidebar';
import AdminSidebar from '../components/Admin/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-white">
          {/* Navbar as Header */}
          <SidebarProvider>
            <AdminSidebar/>
          </SidebarProvider>
          
          {/* Main Content */}
          <main className="flex-grow">
            {children}
          </main>
          
        
          
        </div>
      </body>
    </html>
  );
}