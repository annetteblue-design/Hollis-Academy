
import React from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { View } from '../types';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
  rank: string;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView, rank }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: View.HOME, label: 'Headquarters' },
    { id: View.MISSIONS, label: 'Missions' },
    { id: View.CODE, label: 'PI Code' },
    { id: View.TOOLKIT, label: 'Toolbox' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-yellow-500/20 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setView(View.HOME)}
        >
          <div className="bg-yellow-500 p-2 rounded-lg shadow-lg shadow-yellow-500/20 group-hover:scale-110 transition-transform">
            <Shield size={24} className="text-black" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tighter text-white">HOLLIS ACADEMY</h1>
            <p className="text-[10px] uppercase tracking-widest text-yellow-500 font-bold -mt-1">Private Investigator Division</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`text-sm font-bold uppercase tracking-wider transition-all hover:text-yellow-500 ${
                currentView === item.id ? 'text-yellow-500' : 'text-slate-400'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="h-6 w-px bg-slate-800"></div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Current Rank</span>
            <span className="text-xs text-yellow-400 font-mono font-bold tracking-widest">{rank}</span>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-400" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 border-b border-yellow-500/20 p-6 space-y-4">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setView(item.id);
                setIsOpen(false);
              }}
              className="block w-full text-left text-lg font-bold uppercase text-slate-300 py-2 border-b border-white/5"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Header;
