'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Upload, Home, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border premium-shadow">
      <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg md:text-xl">
          <div className="w-8 h-8 md:w-9 md:h-9 pi-gradient rounded-lg flex items-center justify-center text-white font-semibold">
            Π
          </div>
          <span className="hidden sm:inline text-foreground">TecTube</span>
        </Link>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-sm mx-6 lg:max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search tutorials and creators..."
              className="pl-10 bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground rounded-lg"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </form>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-foreground hover:text-primary hover:bg-secondary"
            asChild
          >
            <Link href="/">
              <Home className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            size="sm"
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
            asChild
          >
            <Link href="/upload">
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-foreground hover:text-primary hover:bg-secondary"
            asChild
          >
            <Link href="/profile">
              <User className="w-4 h-4" />
            </Link>
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Search Bar */}
      <form onSubmit={handleSearchSubmit} className="md:hidden px-4 pb-3">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-10 w-full bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground text-sm rounded-lg"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </form>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-border px-4 py-4 space-y-2 bg-secondary/30">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Home</span>
          </Link>
          <Link
            href="/upload"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary hover:bg-primary/90 transition-colors text-primary-foreground font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Upload className="w-5 h-5" />
            <span>Upload Video</span>
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <User className="w-5 h-5" />
            <span className="font-medium">My Profile</span>
          </Link>
          <Link
            href="/creators"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <User className="w-5 h-5" />
            <span className="font-medium">Creators</span>
          </Link>
        </nav>
      )}
    </header>
  );
}
