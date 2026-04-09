'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload as UploadIcon, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TopHeader } from '@/components/top-header';
import { BottomNav } from '@/components/bottom-nav';
import { CATEGORIES } from '@/lib/types';

export default function UploadPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'crypto-blockchain',
    videoUrl: '',
    thumbnailUrl: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate upload
    setTimeout(() => {
      setSubmitSuccess(true);
      setFormData({
        title: '',
        description: '',
        category: 'crypto-blockchain',
        videoUrl: '',
        thumbnailUrl: '',
      });
      setIsSubmitting(false);
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1500);
  };

  const isFormValid =
    formData.title.trim() &&
    formData.category &&
    formData.videoUrl.trim();

  return (
    <div className="min-h-screen bg-background">
      <TopHeader />

      <main className="mt-16 md:mt-20 px-4 md:px-8 py-8 md:py-12 pb-20 md:pb-24 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Button variant="ghost" size="sm" className="hover:bg-muted" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Upload a Video</h1>
          <p className="text-muted-foreground text-lg">
            Share your tech knowledge with pioneers worldwide
          </p>
        </div>

        {submitSuccess && (
          <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="font-semibold text-primary">Video uploaded successfully!</p>
              <p className="text-sm text-primary/80">Your video is now live on TecTube</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Video Title</label>
            <Input
              type="text"
              name="title"
              placeholder="Enter your video title..."
              className="bg-white border border-border text-foreground placeholder:text-muted-foreground rounded-lg"
              value={formData.title}
              onChange={handleInputChange}
              maxLength={100}
              required
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              {formData.title.length}/100 characters
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
            <Textarea
              name="description"
              placeholder="Tell viewers more about your video and what they'll learn..."
              className="bg-white border border-border text-foreground placeholder:text-muted-foreground resize-none rounded-lg"
              rows={6}
              value={formData.description}
              onChange={handleInputChange}
              maxLength={5000}
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              {formData.description.length}/5000 characters
            </p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Category</label>
            <Select value={formData.category} onValueChange={handleSelectChange}>
              <SelectTrigger className="bg-white border border-border text-foreground rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.icon} {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Video URL / Embed Link</label>
            <Input
              type="url"
              name="videoUrl"
              placeholder="https://www.youtube.com/embed/..."
              className="bg-white border border-border text-foreground placeholder:text-muted-foreground rounded-lg"
              value={formData.videoUrl}
              onChange={handleInputChange}
              required
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              Support YouTube, Vimeo, or direct MP4 URLs
            </p>
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Thumbnail URL <span className="text-muted-foreground">(Optional)</span></label>
            <Input
              type="url"
              name="thumbnailUrl"
              placeholder="https://example.com/thumbnail.jpg"
              className="bg-white border border-border text-foreground placeholder:text-muted-foreground rounded-lg"
              value={formData.thumbnailUrl}
              onChange={handleInputChange}
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              If not provided, we'll generate one automatically
            </p>
          </div>

          {/* Upload Preview */}
          {formData.videoUrl && (
            <div className="bg-white rounded-lg p-4 border border-border">
              <p className="text-sm font-semibold text-foreground mb-3">Preview</p>
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <iframe
                  src={formData.videoUrl}
                  title="Video preview"
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              className="border border-border hover:bg-muted rounded-lg"
              asChild
              disabled={isSubmitting}
            >
              <Link href="/">Cancel</Link>
            </Button>
            <Button
              type="submit"
              className="flex-1 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg"
              disabled={!isFormValid || isSubmitting}
            >
              <UploadIcon className="w-4 h-4" />
              {isSubmitting ? 'Uploading...' : 'Upload Video'}
            </Button>
          </div>
        </form>

        {/* Tips Section */}
        <div className="mt-12 p-6 bg-muted rounded-lg border border-border">
          <h3 className="font-semibold text-foreground mb-4">Tips for successful uploads:</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Use clear, descriptive titles that capture your video content accurately</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Write detailed descriptions to help viewers find and understand your content</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Choose the most relevant category to reach your target audience</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Use high-quality thumbnails for better viewer engagement</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>Keep videos focused on technical and educational content</span>
            </li>
          </ul>
        </div>
      </main>

      <BottomNav activeTab="upload" />
    </div>
  );
}
