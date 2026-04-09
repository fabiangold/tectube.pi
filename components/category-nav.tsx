'use client';

import { Button } from '@/components/ui/button';
import { CATEGORIES } from '@/lib/types';

interface CategoryNavProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryNav({ activeCategory, onCategoryChange }: CategoryNavProps) {
  return (
    <div className="bg-background border-b border-border/50 sticky top-[72px] md:top-[80px] z-40 overflow-x-auto">
      <div className="flex gap-3 px-4 py-3 md:px-6 md:py-4 min-w-max md:min-w-0 md:flex-wrap max-w-full">
        <Button
          variant={activeCategory === 'all' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onCategoryChange('all')}
          className={`whitespace-nowrap rounded-full font-medium transition-all ${
            activeCategory === 'all'
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'text-foreground hover:bg-secondary hover:text-primary'
          }`}
        >
          All
        </Button>
        {CATEGORIES.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className={`whitespace-nowrap gap-2 rounded-full font-medium transition-all ${
              activeCategory === category.id
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-foreground hover:bg-secondary hover:text-primary'
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span className="hidden sm:inline">{category.label}</span>
            <span className="sm:hidden text-xs">{category.label.split(' ')[0]}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
