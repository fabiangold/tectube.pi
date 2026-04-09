'use client';

import { Button } from '@/components/ui/button';
import { CATEGORIES } from '@/lib/types';

interface ScrollableCategoryBarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function ScrollableCategoryBar({ activeCategory, onCategoryChange }: ScrollableCategoryBarProps) {
  return (
    <div className="bg-background border-b border-border/50 overflow-x-auto hide-scrollbar">
      <div className="flex gap-3 px-4 md:px-8 py-4 min-w-max md:min-w-0 max-w-full">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCategoryChange('all')}
          className={`whitespace-nowrap font-semibold transition-all rounded-full px-4 py-2 ${
            activeCategory === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'text-foreground hover:bg-muted'
          }`}
        >
          All
        </Button>
        {CATEGORIES.map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className={`whitespace-nowrap font-semibold gap-2 transition-all rounded-full px-4 py-2 ${
              activeCategory === category.id
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-muted'
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span className="hidden sm:inline text-sm">{category.label.split(' ')[0]}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
