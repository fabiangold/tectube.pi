'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-7xl font-bold mb-4">404</h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-2">Page not found</p>
        <p className="text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button asChild className="gap-2 bg-primary hover:bg-primary/90">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
