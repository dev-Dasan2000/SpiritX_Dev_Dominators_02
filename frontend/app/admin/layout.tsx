'use client';
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import '../globals.css';
import { Sidebar } from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import AdminSidebar from '../components/Admin/Sidebar';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isRootPage = pathname === '/admin';

  // If it's the root page.tsx, render without the layout
  if (isRootPage) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <div className='min-h-screen bg-gradient-to-r from-gray-800 via-indigo-900 to-black text-white'>
            {children}
          </div>
          
        </body>
      </html>
    );
  }

  // For all other pages, use the full layout
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-white w-full">
          <SidebarProvider>
            <AdminSidebar />
            
            {/* Main Content */}
            <div className="flex-grow">
              <SidebarTrigger />
              {children}
            </div>
          </SidebarProvider>
        </div>
      </body>
    </html>
  );
}