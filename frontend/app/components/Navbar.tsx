'use client';

import Link from 'next/link';
import { Users, Layers, DollarSign, BarChart, MessageSquare, LogOut } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-gradient-to-r from-[#2D5D85] to-[#4A90E2] text-white p-3">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-white text-[#2D5D85] font-bold px-3 py-2 rounded-lg">FC</div>
        <span className="text-lg font-semibold">Fantasy Cricket</span>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <Link href="/selectTeam" className="flex items-center gap-2 bg-[#2D5D85] px-4 py-2 rounded-lg hover:bg-[#A0C9E6] hover:text-[#2D5D85] transition-colors">
          <Users size={18} /> Select Your Team
        </Link>
        <Link href="#" className="flex items-center gap-2 hover:bg-[#A0C9E6] hover:text-[#2D5D85] px-3 py-2 rounded-lg transition-colors">
          <Layers size={18} /> Team
        </Link>
        <Link href="/budgetTracker" className="flex items-center gap-2 hover:bg-[#A0C9E6] hover:text-[#2D5D85] px-3 py-2 rounded-lg transition-colors">
          <DollarSign size={18} /> Budget
        </Link>
        <Link href="#" className="flex items-center gap-2 hover:bg-[#A0C9E6] hover:text-[#2D5D85] px-3 py-2 rounded-lg transition-colors">
          <BarChart size={18} /> Leaderboard
        </Link>
        <Link href="#" className="flex items-center gap-2 hover:bg-[#A0C9E6] hover:text-[#2D5D85] px-3 py-2 rounded-lg transition-colors">
          <MessageSquare size={18} /> Chatbot
        </Link>
      </div>

      {/* Logout Button */}
      <button className="flex items-center gap-2 bg-white text-[#2D5D85] px-4 py-2 rounded-lg hover:bg-[#A0C9E6] transition-colors">
        <LogOut size={18} /> Logout
      </button>
    </nav>
  );
};

export default Navbar;