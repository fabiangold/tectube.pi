'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap, Users, Play } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative w-full bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border/30">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Discover Premium Tech Content
              </h1>
              <p className="text-lg text-muted-foreground">
                Stream tutorials, reviews, and insights from the world's leading tech pioneers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg gap-2"
                asChild
              >
                <Link href="/upload">
                  <Play className="w-5 h-5" />
                  Get Started
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/20 text-foreground hover:bg-primary/5 font-semibold rounded-lg"
                asChild
              >
                <Link href="/creators">Explore Creators</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary">10K+</p>
                <p className="text-sm text-muted-foreground">Videos</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground">Creators</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary">1M+</p>
                <p className="text-sm text-muted-foreground">Users</p>
              </div>
            </div>
          </div>

          {/* Right Column - Feature Cards */}
          <div className="grid grid-cols-1 gap-4">
            <div className="p-6 rounded-xl bg-card border border-border/30 hover:border-primary/30 transition-all premium-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Curated Content</h3>
                  <p className="text-sm text-muted-foreground">Handpicked tutorials from industry experts</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border/30 hover:border-primary/30 transition-all premium-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Fast & Reliable</h3>
                  <p className="text-sm text-muted-foreground">Smooth streaming with premium quality</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border/30 hover:border-primary/30 transition-all premium-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Community</h3>
                  <p className="text-sm text-muted-foreground">Connect with tech enthusiasts worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
