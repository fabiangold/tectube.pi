'use client';

import Link from 'next/link';
import { Heart, MessageCircle, Share2, Eye } from 'lucide-react';
import { Video } from '@/lib/types';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface FeaturedVideoProps {
  video: Video;
}

export function FeaturedVideo({ video }: FeaturedVideoProps) {
  const formatViews = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <Link href={`/video/${video.id}`}>
      <div className="relative rounded-xl overflow-hidden group cursor-pointer mb-8 md:mb-12">
        {/* Main Featured Image */}
        <div className="relative aspect-video md:aspect-[21/9] bg-muted overflow-hidden">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Badge */}
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-sm">
            Featured
          </div>

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
              {video.title}
            </h2>

            {video.user && (
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-12 h-12 border-2 border-white">
                  <AvatarImage src={video.user.avatarUrl} />
                  <AvatarFallback>{video.user.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{video.user.username}</p>
                  <p className="text-sm text-gray-200">{formatViews(video.viewCount)} views</p>
                </div>
              </div>
            )}

            {/* Description */}
            <p className="text-sm md:text-base text-gray-100 line-clamp-2 mb-4 max-w-2xl">
              {video.description}
            </p>

            {/* Stats Row */}
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{formatViews(video.viewCount)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>{formatViews(video.likeCount || 0)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>{video.commentCount || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
