
import React from 'react';
import { Card } from '@/components/ui/card';
import { Quote } from 'lucide-react';

interface QuoteCardProps {
  quote: string;
  isAnimating: boolean;
  isFavorite: boolean;
}

const QuoteCard = ({ quote, isAnimating, isFavorite }: QuoteCardProps) => {
  // Parse quote and author
  const quoteMatch = quote.match(/(.*?)\s*-\s*(.+)$/);
  const quoteText = quoteMatch ? quoteMatch[1].trim() : quote;
  const author = quoteMatch ? quoteMatch[2].trim() : "Unknown";

  return (
    <Card className={`p-6 sm:p-8 lg:p-12 bg-white/95 backdrop-blur-sm shadow-2xl border-0 transform transition-all duration-500 ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'} ${isFavorite ? 'ring-4 ring-red-300' : ''}`}>
      <div className="relative">
        {/* Quote Icon */}
        <Quote className="w-8 h-8 sm:w-12 sm:h-12 text-orange-400/50 absolute -top-4 -left-2 sm:-top-6 sm:-left-4" />
        
        {/* Quote Text */}
        <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-800 leading-relaxed mb-6 pl-6 sm:pl-8">
          "{quoteText}"
        </blockquote>
        
        {/* Author */}
        <div className="text-right">
          <cite className="text-lg sm:text-xl text-gray-600 font-medium not-italic">
            — {author}
          </cite>
        </div>

        {/* Favorite indicator */}
        {isFavorite && (
          <div className="absolute top-4 right-4 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
            ❤️ Favorite
          </div>
        )}
      </div>
    </Card>
  );
};

export default QuoteCard;
