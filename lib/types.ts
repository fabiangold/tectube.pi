export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: string;
}

export interface Video {
  id: string;
  userId: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  videoUrl: string;
  category: 'crypto-blockchain' | 'electronics-diy' | 'software-dev' | 'hardware-reviews' | 'other';
  viewCount: number;
  likeCount?: number;
  commentCount?: number;
  isLiked?: boolean;
  createdAt: string;
  user?: User;
}

export interface Comment {
  id: string;
  userId: string;
  videoId: string;
  text: string;
  createdAt: string;
  user?: User;
}

export interface Like {
  id: string;
  userId: string;
  videoId: string;
  createdAt: string;
}

export interface UserProfile extends User {
  followerCount: number;
  followingCount: number;
  videoCount: number;
  isFollowing?: boolean;
}

export const CATEGORIES = [
  { id: 'crypto-blockchain', label: 'Crypto & Blockchain', icon: '₿' },
  { id: 'electronics-diy', label: 'Electronics & DIY', icon: '⚙️' },
  { id: 'software-dev', label: 'Software Development', icon: '💻' },
  { id: 'hardware-reviews', label: 'Hardware Reviews', icon: '📱' },
] as const;
