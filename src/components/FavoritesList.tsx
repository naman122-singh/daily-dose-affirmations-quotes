
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Trash2, Heart } from 'lucide-react';

interface FavoritesListProps {
  favorites: string[];
  onRemove: (quote: string) => void;
  onBack: () => void;
}

const FavoritesList = ({ favorites, onRemove, onBack }: FavoritesListProps) => {
  if (favorites.length === 0) {
    return (
      <div className="text-center">
        <Card className="p-8 sm:p-12 bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-4">
            No Favorites Yet
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Start building your collection of inspiring quotes!
          </p>
          <Button 
            onClick={onBack}
            className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg transform hover:scale-105 transition-all duration-200"
            size="lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Quotes
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg flex items-center">
          <Heart className="w-8 h-8 sm:w-10 sm:h-10 mr-3 text-red-400 fill-current" />
          Your Favorite Quotes
        </h2>
        <Button 
          onClick={onBack}
          variant="outline"
          className="bg-white/20 border-white/30 text-white hover:bg-white/30 shadow-lg transform hover:scale-105 transition-all duration-200"
          size="lg"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Quotes
        </Button>
      </div>

      {/* Favorites Grid */}
      <div className="grid gap-4 sm:gap-6">
        {favorites.map((quote, index) => {
          // Parse quote and author
          const quoteMatch = quote.match(/(.*?)\s*-\s*(.+)$/);
          const quoteText = quoteMatch ? quoteMatch[1].trim() : quote;
          const author = quoteMatch ? quoteMatch[2].trim() : "Unknown";

          return (
            <Card 
              key={index} 
              className="p-4 sm:p-6 bg-white/95 backdrop-blur-sm shadow-xl border-0 transform hover:scale-[1.02] transition-all duration-200 group"
            >
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <blockquote className="text-lg sm:text-xl font-medium text-gray-800 leading-relaxed mb-2">
                    "{quoteText}"
                  </blockquote>
                  <cite className="text-base sm:text-lg text-gray-600 font-medium not-italic">
                    — {author}
                  </cite>
                </div>
                <Button
                  onClick={() => onRemove(quote)}
                  variant="outline"
                  size="sm"
                  className="text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-200 opacity-0 group-hover:opacity-100 sm:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Footer Stats */}
      <div className="text-center pt-4">
        <p className="text-white/80 text-lg">
          You have collected <span className="font-bold text-white">{favorites.length}</span> inspiring quote{favorites.length !== 1 ? 's' : ''}!
        </p>
      </div>
    </div>
  );
};

export default FavoritesList;
