'use client';

import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import './globals.css';

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
          <Navbar />
          
          {/* Main Content */}
          <main className="flex-grow">
            {children}
          </main>
          
        
          
        </div>
      </body>
    </html>
  );
}