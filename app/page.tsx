'use client';

import { useState, useMemo } from 'react';
import { TopHeader } from '@/components/top-header';
import { ScrollableCategoryBar } from '@/components/scrollable-category-bar';
import { FeaturedVideo } from '@/components/featured-video';
import { VideoCard } from '@/components/video-card';
import { BottomNav } from '@/components/bottom-nav';
import { mockVideos } from '@/lib/mock-data';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = useMemo(() => {
    return mockVideos.filter((video) => {
      const matchesCategory = activeCategory === 'all' || video.category === activeCategory;
      const matchesSearch =
        searchQuery === '' ||
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.user?.username.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredVideo = filteredVideos[0];
  const remainingVideos = filteredVideos.slice(1);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <TopHeader onSearch={setSearchQuery} />

      {/* Category Bar */}
      <div className="mt-16 md:mt-20">
        <ScrollableCategoryBar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      </div>

      {/* Main Content */}
      <main className="px-4 md:px-8 py-8 md:py-12 pb-20 md:pb-24 max-w-7xl mx-auto">
        {/* Featured Video */}
        {featuredVideo && <FeaturedVideo video={featuredVideo} />}

        {/* Video Grid - 2 Columns */}
        {remainingVideos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 md:py-32">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">No videos found</h2>
            <p className="text-muted-foreground text-lg">
              {searchQuery ? `No results for "${searchQuery}"` : 'Try a different category'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {remainingVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab="home" />
    </div>
  );
}
