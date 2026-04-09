'use client';

import Link from 'next/link';
import { ArrowLeft, UserPlus, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Header } from '@/components/header';
import { mockUsers, mockVideos } from '@/lib/mock-data';
import { useState } from 'react';

export default function CreatorsPage() {
  const [followedCreators, setFollowedCreators] = useState<string[]>([]);

  const creators = Object.values(mockUsers).map((user) => {
    const videoCount = mockVideos.filter((v) => v.userId === user.id).length;
    const totalViews = mockVideos
      .filter((v) => v.userId === user.id)
      .reduce((sum, v) => sum + v.viewCount, 0);

    return { ...user, videoCount, totalViews };
  });

  const handleFollow = (userId: string) => {
    setFollowedCreators((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">TecTube Creators</h1>
          <p className="text-muted-foreground">
            Follow your favorite tech pioneers and stay updated with their latest content
          </p>
        </div>

        {/* Featured Creators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((creator) => {
            const isFollowed = followedCreators.includes(creator.id);

            return (
              <div
                key={creator.id}
                className="bg-card rounded-lg p-6 border border-border hover:border-primary transition-colors"
              >
                {/* Avatar */}
                <div className="flex justify-center mb-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={creator.avatarUrl} />
                    <AvatarFallback>{creator.username[0]}</AvatarFallback>
                  </Avatar>
                </div>

                {/* Info */}
                <h3 className="text-lg font-bold text-center mb-1">
                  {creator.username}
                </h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  {creator.bio}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-y border-border">
                  <div className="text-center">
                    <p className="text-lg font-bold">{creator.videoCount}</p>
                    <p className="text-xs text-muted-foreground">Videos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold">{creator.totalViews > 0 ? Math.round(creator.totalViews / 1000) : 0}K</p>
                    <p className="text-xs text-muted-foreground">Views</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant={isFollowed ? 'default' : 'outline'}
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => handleFollow(creator.id)}
                  >
                    <UserPlus className="w-4 h-4" />
                    {isFollowed ? 'Following' : 'Follow'}
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>

                {/* View Profile Link */}
                <Link
                  href={`/creator/${creator.id}`}
                  className="text-sm text-primary hover:underline text-center block mt-4"
                >
                  View Profile →
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
