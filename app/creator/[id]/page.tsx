'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Share2, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Header } from '@/components/header';
import { VideoCard } from '@/components/video-card';
import { mockUsers, mockVideos } from '@/lib/mock-data';
import { useState } from 'react';

export default function CreatorProfilePage() {
  const params = useParams();
  const userId = params.id as string;
  const user = mockUsers[userId as keyof typeof mockUsers];
  const [isFollowing, setIsFollowing] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Creator not found</h1>
          <Button asChild>
            <Link href="/creators">Back to creators</Link>
          </Button>
        </div>
      </div>
    );
  }

  const userVideos = mockVideos.filter((v) => v.userId === userId);
  const totalViews = userVideos.reduce((sum, v) => sum + v.viewCount, 0);

  const stats = [
    { label: 'Videos', value: userVideos.length },
    { label: 'Followers', value: '2.3K' },
    { label: 'Total Views', value: totalViews > 0 ? Math.round(totalViews / 1000) + 'K' : '0' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Back Button */}
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/creators">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to creators
            </Link>
          </Button>
        </div>

        {/* Profile Header */}
        <div className="bg-card rounded-lg p-6 md:p-8 border border-border mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:gap-8">
            {/* Avatar */}
            <Avatar className="w-32 h-32 md:w-40 md:h-40 mb-6 sm:mb-0">
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback>{user.username[0]}</AvatarFallback>
            </Avatar>

            {/* Profile Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{user.username}</h1>
              <p className="text-lg text-muted-foreground mb-4">{user.bio}</p>

              {/* Stats */}
              <div className="flex gap-8 mb-6">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={isFollowing ? 'default' : 'outline'}
                  className={`gap-2 ${!isFollowing && 'bg-primary hover:bg-primary/90'}`}
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  <UserPlus className="w-4 h-4" />
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
                <Button variant="outline" className="gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="hidden sm:inline">Contact</span>
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-6">
          <div className="flex gap-4">
            <button className="px-4 py-2 border-b-2 border-primary font-semibold">
              Videos ({userVideos.length})
            </button>
            <button className="px-4 py-2 border-b-2 border-transparent text-muted-foreground hover:text-foreground">
              Playlists
            </button>
          </div>
        </div>

        {/* Videos Grid */}
        {userVideos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <h2 className="text-xl font-semibold mb-2">No videos yet</h2>
            <p className="text-muted-foreground">
              This creator hasn&apos;t uploaded any videos yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {userVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
