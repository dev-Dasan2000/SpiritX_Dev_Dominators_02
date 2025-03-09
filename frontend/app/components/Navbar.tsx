'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Users, Layers, DollarSign, BarChart, MessageSquare, LogOut, Menu, X } from 'lucide-react';
import AuthMethods from '../api/auth-methods';
import Loader2 from '@/components/Loader';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleLogout = async () =>{
    setLoading(true);
    await AuthMethods.UserLogOut().then(()=>{
      window.location.href="/";
    })
  }


  return (
    <nav className="bg-gradient-to-r from-[#2D5D85] to-[#4A90E2] text-white p-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="bg-white text-[#2D5D85] font-bold px-3 py-2 rounded-lg">FC</div>
          <span className="text-lg font-semibold">Fantasy Cricket</span>
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavLinks setIsOpen={setIsOpen} />
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <>
          {/* Blurred Backdrop (starts below the navbar) */}
          <div
            className="fixed top-16 inset-x-0 bottom-0 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
      

          {/* Mobile Menu */}
          <div className="fixed top-16 right-0 w-64 h-[calc(100vh-4rem)] bg-white text-[#2D5D85] z-50 md:hidden transform transition-transform duration-300 ease-in-out">

            {/* Navigation Links */}
            <div className="flex flex-col gap-4 p-4 h-full">
              <div className="flex flex-col gap-4">
                <NavLinks setIsOpen={setIsOpen} />
              </div>

              {/* Logout Button at the Bottom */}
              <button
              onClick={handleLogout}
              disabled={isLoading}
              id='Logout'
                className="flex items-center gap-2 bg-[#2D5D85] text-white px-4 py-2 rounded-lg hover:bg-[#4A90E2] transition-colors mt-auto"
              >
                {isLoading? <Loader2 /> : <LogOut size={33} />}Logout
              </button>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

const NavLinks = ({ setIsOpen }: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const links = [
    { href: '/user/selectTeam', icon: <Users size={18} />, label: 'Select Your Team' },
    { href: '/user/ViewTeam', icon: <Layers size={18} />, label: 'Team' },
    { href: '/user/budgetTracker', icon: <DollarSign size={18} />, label: 'Budget' },
    { href: '/user/LeaderBoard', icon: <BarChart size={18} />, label: 'Leaderboard' },
    
  ];

  return (
    <>
      {links.map(({ href, icon, label }) => (
        <Link
          key={label}
          href={href}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#A0C9E6] hover:text-[#2D5D85] transition-colors ${
            label === 'Logout' ? 'hidden sm:inline-block ' : ''
          }`}
          onClick={() => setIsOpen(false)}
        >
          {icon} {label}
        </Link>
        
      )
      
      )}
       <button
  id="Logout1"
  className="hidden md:flex items-center gap-2 bg-[#2D5D85] text-white px-4 py-2 rounded-lg hover:bg-[#4A90E2] transition-colors mt-auto"
  onClick={() => setIsOpen(false)}
>
  <LogOut size={18} /> Logout
</button>

    </>
    
  );
};


export default Navbar;