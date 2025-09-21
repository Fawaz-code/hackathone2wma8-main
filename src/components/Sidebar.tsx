import React from 'react';
import { Home, Search, Users, User, TrendingUp, Settings, LogOut, Trophy } from 'lucide-react';

type View = 'home' | 'search' | 'profiles' | 'profile' | 'trending';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  currentUser?: {
    username: string;
    fullName: string;
    avatar: string;
  };
}

export default function Sidebar({ currentView, onViewChange, currentUser }: SidebarProps) {
  const menuItems = [
    { id: 'home' as View, icon: Home, label: 'Home', count: null },
    { id: 'search' as View, icon: Search, label: 'Search', count: null },
    { id: 'profiles' as View, icon: Users, label: 'Discover People', count: null },
    { id: 'leaderboard' as View, icon: Trophy, label: 'Leaderboard', count: null },
    { id: 'trending' as View, icon: TrendingUp, label: 'Trending', count: null },
  ];

  return (
    <aside className="w-72 bg-white shadow-lg rounded-xl m-6 flex flex-col items-center py-8">
      {/* Logo */}
      <div className="flex items-center mb-10">
        <img src="/logo192.png" alt="Fawazbook Logo" className="w-10 h-10 mr-2" />
        <span className="text-3xl font-extrabold text-blue-600 tracking-tight">Fawazbook</span>
      </div>
      {/* Navigation */}
      <nav className="flex-1 w-full">
        <ul className="space-y-2">
          {menuItems.map(item => (
            <li key={item.label}>
              <button
                className={`flex items-center w-full px-6 py-3 rounded-lg text-lg font-medium transition-colors duration-150 ${currentView === item.id ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => onViewChange(item.id)}
              >
                <span className="mr-4 text-2xl"><item.icon /></span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {/* Current User */}
      <div className="mt-10 flex flex-col items-center">
        <img src={currentUser.avatar} alt={currentUser.fullName} className="w-14 h-14 rounded-full border-2 border-blue-200 mb-2" />
        <span className="font-semibold text-gray-900">{currentUser.fullName}</span>
        <span className="text-gray-500 text-sm">@{currentUser.username}</span>
      </div>
    </aside>
  );
}