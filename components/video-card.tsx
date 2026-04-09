'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, MessageCircle, Share2, Eye } from 'lucide-react';
import { Video } from '@/lib/types';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface VideoCardProps {
  video: Video;
  onLike?: (videoId: string) => void;
}

export function VideoCard({ video, onLike }: VideoCardProps) {
  const [isLiked, setIsLiked] = useState(video.isLiked || false);
  const [likeCount, setLikeCount] = useState(video.likeCount || 0);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    onLike?.(video.id);
  };

  const formatViews = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Link href={`/video/${video.id}`}>
      <div className="video-card">
        {/* Thumbnail */}
        <div className="video-thumbnail">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent group-hover:from-black/40 transition-all" />
          <div className="absolute top-3 right-3 bg-primary/90 px-2.5 py-1 rounded-full text-xs font-bold text-primary-foreground backdrop-blur-sm">
            Video
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-3 text-foreground group-hover:text-primary transition-colors">
            {video.title}
          </h3>

          {/* Channel Info */}
          {video.user && (
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="w-9 h-9 border border-border/30">
                <AvatarImage src={video.user.avatarUrl} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {video.user.username[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm font-semibold truncate text-foreground">
                  {video.user.username}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatViews(video.viewCount)} views
                </p>
              </div>
            </div>
          )}

          {/* Stats Row */}
          <div className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground mb-4 pb-4 border-b border-border/30">
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-primary/70" />
              <span className="font-medium">{formatViews(video.viewCount)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-primary/70" />
              <span className="font-medium">{formatViews(likeCount)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-primary/70" />
              <span className="font-medium">{video.commentCount || 0}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-2" onClick={(e) => e.preventDefault()}>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 h-auto py-2 text-xs font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
              onClick={handleLike}
            >
              <Heart
                className={`w-4 h-4 ${
                  isLiked ? 'fill-current text-red-500' : ''
                }`}
              />
              <span className="hidden sm:inline">Like</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-1.5 h-auto py-2 text-xs font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Comment</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-1.5 h-auto py-2 text-xs font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
