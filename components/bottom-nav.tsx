'use client';

import Link from 'next/link';
import { Home, Compass, Plus, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BottomNavProps {
  activeTab?: string;
}

export function BottomNav({ activeTab = 'home' }: BottomNavProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, href: '/' },
    { id: 'explore', label: 'Explore', icon: Compass, href: '/creators' },
    { id: 'upload', label: 'Upload', icon: Plus, href: '/upload', isPrimary: true },
    { id: 'search', label: 'Search', icon: Search, href: '/search' },
    { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-primary h-16 md:h-20 border-t border-primary/20 hidden sm:block">
      <div className="max-w-7xl h-full mx-auto px-4 md:px-8 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (item.isPrimary) {
            return (
              <Link key={item.id} href={item.href} className="flex items-center justify-center">
                <Button
                  size="icon"
                  className="bg-white text-primary hover:bg-gray-100 rounded-full w-14 h-14 shadow-lg"
                >
                  <Icon className="w-6 h-6" />
                </Button>
              </Link>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive ? 'text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
