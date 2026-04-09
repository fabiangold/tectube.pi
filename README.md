# TecTube - YouTube for Pioneers

A specialized video-sharing platform for technical and educational content. TecTube is a niche YouTube alternative focused exclusively on technology, featuring a clean, modern dark mode interface optimized for mobile devices.

## Features

### Core Functionality
- **Video Feed**: Homepage showing trending and latest technical videos with filtering by category
- **Categories**: Filter videos by specialized tech topics (Crypto & Blockchain, Electronics & DIY, Software Development, Hardware Reviews)
- **Search**: Global search functionality to find videos, creators, and content by keyword
- **User Profiles**: Creator profiles displaying videos, subscriber counts, and engagement metrics
- **Interactions**: Like, comment, and share functionality for all videos
- **Video Upload**: Upload and share your own technical content with detailed metadata

### Design
- **Dark Mode Interface**: Tech-focused dark theme with purple accent colors for visual appeal
- **Mobile-First**: Fully responsive design optimized for all device sizes
- **Grid Layout**: Video thumbnails organized in responsive grid with titles and view counts
- **Modern Aesthetic**: Clean typography, smooth transitions, and intuitive navigation

## Available Routes

### Main Pages
- `/` - Homepage with video feed and category filtering
- `/video/[id]` - Individual video detail page with comments and related videos
- `/upload` - Video upload page for creators
- `/profile` - Current user's profile and uploaded videos
- `/creators` - Directory of featured creators
- `/creator/[id]` - Individual creator profile with their video collection
- `/category/[id]` - Videos filtered by specific category
- `/search` - Search results for videos and creators
- `/404` - Custom 404 page

## Categories

1. **Crypto & Blockchain** (₿)
   - Bitcoin smart contracts, Layer 2 solutions, blockchain technology

2. **Electronics & DIY** (⚙️)
   - IoT projects, hardware builds, electronics tutorials

3. **Software Development** (💻)
   - Next.js patterns, React compilator, programming languages

4. **Hardware Reviews** (📱)
   - GPU comparisons, device benchmarks, hardware analysis

## Mock Data

The application includes comprehensive mock data featuring:
- **4 Featured Creators**: Different tech specialization profiles
- **6 Sample Videos**: Across all categories with realistic metadata
- **Comments System**: Sample interactions on videos
- **Follow System**: Creator directory with follow functionality

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **UI Components**: shadcn/ui with Tailwind CSS v4
- **Styling**: Dark mode theme with semantic design tokens
- **State Management**: React hooks (useState, useMemo)
- **Navigation**: Next.js routing and dynamic routes
- **Icons**: Lucide React icons

## Component Structure

### Core Components
- `Header` - Navigation and search bar
- `CategoryNav` - Category filtering navigation
- `VideoCard` - Individual video display with interactions
- `ThemeProvider` - Dark mode theme management
- `AppWrapper` - Root app wrapper

### Pages
- Homepage with video feed
- Video detail with comments
- Creator profiles and directory
- Upload interface
- Search results

## Getting Started

1. **Installation**
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Development Server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Key Features Implementation

### Search
- Global search across video titles, descriptions, and creator names
- Dedicated search results page with video and creator results
- Search accessible from header on all pages

### Categories
- Quick category filter in homepage navigation
- Dedicated category pages showing all videos in category
- Category icons for visual identification

### Interactions
- Like/unlike videos with count display
- Comment on videos with real-time addition
- Share functionality for spreading content
- View count tracking

### User Profiles
- Creator profiles with video gallery
- Follower/following system
- User statistics (videos, followers, total views)
- Follow/contact functionality

### Responsive Design
- Mobile-first approach with breakpoints for tablet and desktop
- Touch-friendly buttons and navigation
- Optimized grid layouts for all screen sizes
- Mobile menu for navigation

## Customization

### Colors
Edit `/app/globals.css` to customize the color theme. Default dark mode uses:
- Primary: Purple (accent color)
- Background: Dark grey/black
- Cards: Slightly lighter than background

### Videos
Add more mock videos to `/lib/mock-data.ts` following the `Video` interface structure.

### Categories
Modify `/lib/types.ts` `CATEGORIES` array to add new content categories.

## Performance Optimizations

- Component memoization with `useMemo` for filtered video lists
- Lazy loading for images via Next.js Image component
- Responsive image sizes for different screen sizes
- Efficient filtering and search algorithms

## Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- High contrast dark theme for readability
- Screen reader friendly text

---

Built with App Studio - Made with Next.js and Tailwind CSS
