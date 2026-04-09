'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { VideoCard } from '@/components/video-card';
import { mockVideos } from '@/lib/mock-data';
import { CATEGORIES } from '@/lib/types';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;

  const category = CATEGORIES.find((c) => c.id === categoryId);
  const categoryVideos = mockVideos.filter((v) => v.category === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
          <Button asChild>
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>

        {/* Category Header */}
        <div className="mb-8 bg-card rounded-lg p-6 md:p-8 border border-border">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl md:text-5xl">{category.icon}</div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{category.label}</h1>
              <p className="text-muted-foreground mt-1">
                {categoryVideos.length} videos
              </p>
            </div>
          </div>
          <p className="text-foreground">
            Explore all the latest content in {category.label.toLowerCase()}
          </p>
        </div>

        {/* Videos Grid */}
        {categoryVideos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <h2 className="text-xl font-semibold mb-2">No videos in this category yet</h2>
            <p className="text-muted-foreground">
              Be the first to upload content in {category.label.toLowerCase()}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {categoryVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
