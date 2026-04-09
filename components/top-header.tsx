'use client';

import Link from 'next/link';
import { Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TopHeaderProps {
  onSearch?: (query: string) => void;
}

export function TopHeader({ onSearch }: TopHeaderProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary h-16 md:h-20 flex items-center px-4 md:px-8">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-foreground rounded-lg flex items-center justify-center font-bold text-primary text-lg md:text-xl">
            Π
          </div>
          <span className="text-white font-bold text-lg md:text-2xl hidden sm:inline">TecTube</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4 lg:max-w-lg hidden md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search videos, creators..."
              className="pl-10 w-full bg-white border-0 text-foreground placeholder:text-gray-400 rounded-lg"
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Profile Icon */}
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-primary/90 w-10 h-10 md:w-12 md:h-12 flex-shrink-0"
          asChild
        >
          <Link href="/profile">
            <User className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
        </Button>
      </div>
    </header>
  );
}
