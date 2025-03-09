'use client';

import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import '../globals.css';
import AIChatbotButton from '../components/AiChatbotButton';

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
          
          {/* Floating Chatbot Button */}
          <AIChatbotButton />
        </div>
      </body>
    </html>
  );
}