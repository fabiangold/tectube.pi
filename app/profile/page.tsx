'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Edit2, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Header } from '@/components/header';
import { VideoCard } from '@/components/video-card';
import { mockUsers, mockVideos } from '@/lib/mock-data';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('videos');
  const currentUser = mockUsers.user1;
  const userVideos = mockVideos.filter((v) => v.userId === currentUser.id);

  const stats = [
    { label: 'Videos', value: userVideos.length },
    { label: 'Followers', value: '1.2K' },
    { label: 'Following', value: '324' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        {/* Back Button */}
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" className="hover:bg-secondary" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>

        {/* Profile Header */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 md:p-8 border border-border/30 mb-8 premium-shadow">
          <div className="flex flex-col sm:flex-row sm:items-start sm:gap-8">
            {/* Avatar */}
            <Avatar className="w-28 h-28 md:w-36 md:h-36 mb-6 sm:mb-0 border-4 border-primary/20">
              <AvatarImage src={currentUser.avatarUrl} />
              <AvatarFallback className="bg-primary/10 text-primary text-3xl font-bold">
                {currentUser.username[0]}
              </AvatarFallback>
            </Avatar>

            {/* Profile Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
                {currentUser.username}
              </h1>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed max-w-2xl">
                {currentUser.bio}
              </p>

              {/* Stats */}
              <div className="flex gap-8 mb-6">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm md:text-base text-muted-foreground font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 flex-wrap">
                <Button
                  size="lg"
                  className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg"
                  asChild
                >
                  <Link href="/settings/profile">
                    <Edit2 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border border-border/50 hover:bg-secondary rounded-lg font-semibold"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Profile</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border/50 mb-8">
          <div className="flex gap-1">
            {['videos', 'playlists', 'followers'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 font-semibold border-b-2 transition-all ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Videos Grid */}
        {userVideos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 md:py-32">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">No videos yet</h2>
            <p className="text-muted-foreground mb-6 text-lg">
              Start uploading your tech content to TecTube
            </p>
            <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg" asChild>
              <Link href="/upload">
                Upload Your First Video
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {userVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
