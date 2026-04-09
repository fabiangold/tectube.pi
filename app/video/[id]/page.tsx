'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Heart, MessageCircle, Share2, Eye, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/header';
import { mockVideos, mockUsers, mockComments } from '@/lib/mock-data';
import { useState } from 'react';

export default function VideoPage() {
  const params = useParams();
  const videoId = params.id as string;

  const video = mockVideos.find((v) => v.id === videoId);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState(mockComments.filter((c) => c.videoId === videoId));
  const [newComment, setNewComment] = useState('');

  if (!video) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Video not found</h1>
          <Button asChild>
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const relatedVideos = mockVideos
    .filter((v) => v.category === video.category && v.id !== video.id)
    .slice(0, 4);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: `comment-${Date.now()}`,
        userId: 'current-user',
        videoId: videoId,
        text: newComment,
        createdAt: new Date().toISOString(),
        user: mockUsers.user1,
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
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

  const formatViews = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Video Player */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Link>
            </Button>
          </div>

          <div className="aspect-video bg-secondary rounded-lg overflow-hidden mb-6">
            <iframe
              className="w-full h-full"
              src={video.videoUrl}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Info */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-3">{video.title}</h1>

              {/* Channel and Stats */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  {video.user && (
                    <>
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={video.user.avatarUrl} />
                        <AvatarFallback>{video.user.username[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{video.user.username}</p>
                        <p className="text-sm text-muted-foreground">{video.user.bio}</p>
                      </div>
                    </>
                  )}
                </div>
                <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                  Subscribe
                </Button>
              </div>

              {/* Stats and Actions */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Eye className="w-4 h-4" />
                  <span>{formatViews(video.viewCount)} views</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>• {formatDate(video.createdAt)}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={isLiked ? 'default' : 'outline'}
                  className="gap-2 flex-1 sm:flex-none"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="hidden sm:inline">
                    {isLiked ? 'Liked' : 'Like'}
                  </span>
                </Button>
                <Button variant="outline" className="gap-2 flex-1 sm:flex-none">
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
              </div>

              {/* Description */}
              {video.description && (
                <div className="mt-6 p-4 bg-secondary rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">{video.description}</p>
                </div>
              )}
            </div>

            {/* Comments Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Comments ({comments.length})</h2>

              {/* Add Comment */}
              <div className="flex gap-3 mb-6">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Input
                    placeholder="Add a comment..."
                    className="mb-2 bg-secondary border-border"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setNewComment('')}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                    >
                      Comment
                    </Button>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={comment.user?.avatarUrl} />
                      <AvatarFallback>
                        {comment.user?.username[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">
                          {comment.user?.username}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{comment.text}</p>
                      <div className="flex gap-4 mt-2">
                        <button className="text-xs text-muted-foreground hover:text-foreground">
                          Like
                        </button>
                        <button className="text-xs text-muted-foreground hover:text-foreground">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Related Videos */}
          <div>
            <h3 className="font-bold text-lg mb-4">Related Videos</h3>
            <div className="space-y-4">
              {relatedVideos.map((relatedVideo) => (
                <Link
                  key={relatedVideo.id}
                  href={`/video/${relatedVideo.id}`}
                  className="block group"
                >
                  <div className="rounded-lg overflow-hidden mb-2">
                    <img
                      src={relatedVideo.thumbnailUrl}
                      alt={relatedVideo.title}
                      className="w-full aspect-video object-cover group-hover:opacity-75 transition-opacity"
                    />
                  </div>
                  <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary">
                    {relatedVideo.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {relatedVideo.user?.username}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatViews(relatedVideo.viewCount)} views
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
