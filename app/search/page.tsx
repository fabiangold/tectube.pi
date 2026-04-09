'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { VideoCard } from '@/components/video-card';
import { mockVideos, mockUsers } from '@/lib/mock-data';
import { useState } from 'react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);

  const searchResults = mockVideos.filter((video) => {
    const lowerQuery = searchQuery.toLowerCase();
    return (
      video.title.toLowerCase().includes(lowerQuery) ||
      video.description?.toLowerCase().includes(lowerQuery) ||
      video.user?.username.toLowerCase().includes(lowerQuery) ||
      video.user?.bio?.toLowerCase().includes(lowerQuery)
    );
  });

  const creatorResults = Object.values(mockUsers).filter((user) => {
    const lowerQuery = searchQuery.toLowerCase();
    return (
      user.username.toLowerCase().includes(lowerQuery) ||
      user.bio?.toLowerCase().includes(lowerQuery)
    );
  });

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} />

      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Back Button */}
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>

        {/* Results Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Search Results for &quot;{searchQuery}&quot;
          </h1>
          <p className="text-muted-foreground">
            Found {searchResults.length} videos
            {creatorResults.length > 0 && ` and ${creatorResults.length} creators`}
          </p>
        </div>

        {searchResults.length === 0 && creatorResults.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <h2 className="text-2xl font-semibold mb-2">No results found</h2>
            <p className="text-muted-foreground mb-4">
              Try searching for different keywords or browse categories
            </p>
            <Button asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Creator Results */}
            {creatorResults.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl md:text-2xl font-bold mb-6">Creators</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {creatorResults.map((creator) => (
                    <Link
                      key={creator.id}
                      href={`/creator/${creator.id}`}
                      className="bg-card rounded-lg p-6 border border-border hover:border-primary hover:bg-secondary transition-all"
                    >
                      <div className="flex flex-col items-center">
                        <img
                          src={creator.avatarUrl}
                          alt={creator.username}
                          className="w-16 h-16 rounded-full mb-3"
                        />
                        <h3 className="font-bold text-center">{creator.username}</h3>
                        <p className="text-sm text-muted-foreground text-center mt-1">
                          {creator.bio}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4 w-full"
                          asChild
                        >
                          <span>View Profile</span>
                        </Button>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Video Results */}
            {searchResults.length > 0 && (
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-6">Videos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {searchResults.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
