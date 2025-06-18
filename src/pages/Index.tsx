import React, { useState, useEffect } from 'react';
import { Heart, RefreshCw, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import QuoteCard from '@/components/QuoteCard';
import FavoritesList from '@/components/FavoritesList';
import SplashScreen from '@/components/SplashScreen';

const quotes = [
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
  "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll",
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Don't judge each day by the harvest you reap but by the seeds that you plant. - Robert Louis Stevenson",
  "If you want to live a happy life, tie it to a goal, not to people or things. - Albert Einstein",
  "The best way to predict your future is to create it. - Abraham Lincoln",
  "The only thing we have to fear is fear itself. - Franklin D. Roosevelt",
  "If you want to lift yourself up, lift up someone else. - Booker T. Washington",
  "In the end, we will remember not the words of our enemies, but the silence of our friends. - Martin Luther King Jr.",
  "No one can make you feel inferior without your consent. - Eleanor Roosevelt",
  "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do. - Mark Twain",
  "Don't let yesterday take up too much of today. - Will Rogers",
  "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
  "Life is what we make it, always has been, always will be. - Grandma Moses",
  "Believe and act as if it were impossible to fail. - Charles Kettering",
  "The greatest discovery of all time is that a person can change his future by merely changing his attitude. - Oprah Winfrey",
  "It is during our darkest moments that we must focus to see the light. - Aristotle Onassis",
  "A man is not old until regrets take the place of dreams. - John Barrymore",
  "Never give up on something that you can't go a day without thinking about. - Winston Churchill",
  "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. - Albert Schweitzer",
  "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough. - Oprah Winfrey",
  "Success is stumbling from failure to failure with no loss of enthusiasm. - Winston Churchill",
  "Happiness is not something ready-made. It comes from your own actions. - Dalai Lama",
  "Do not go where the path may lead, go instead where there is no path and leave a trail. - Ralph Waldo Emerson",
  "The best revenge is massive success. - Frank Sinatra",
  "The two most important days in your life are the day you are born and the day you find out why. - Mark Twain",
  "Success is not how high you have climbed, but how you make a positive difference to the world. - Roy T. Bennett",
  "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
  "Life is 10 percent what happens to you and 90 percent how you respond to it. - Lou Holtz",
  "Never give up, for that is just the place and time that the tide will turn. - Harriet Beecher Stowe",
  "Happiness is not the absence of problems, it's the ability to deal with them. - Steve Maraboli",
  "There are no mistakes, only opportunities. - Tina Fey",
  "If you want to be happy, set a goal that commands your thoughts, liberates your energy, and inspires your hopes. - Andrew Carnegie",
  "I find that the harder I work, the more luck I seem to have. - Thomas Jefferson",
  "Opportunity does not knock, it presents itself when you beat down the door. - Kyle Chandler",
  "It is not in the stars to hold our destiny but in ourselves. - William Shakespeare",
  "The more you know yourself, the more clarity there is. Self-knowledge has no end. - Jiddu Krishnamurti",
  "Do not let what you cannot do interfere with what you can do. - John Wooden",
  "The only thing necessary for the triumph of evil is for good men to do nothing. - Edmund Burke",
  "Luck is what happens when preparation meets opportunity. - Seneca",
  "It does not matter how slowly you go as long as you do not stop. - Confucius",
  "The greatest gift of life is friendship, and I have received it. - Hubert H. Humphrey",
  "The more that you read, the more things you will know. The more that you learn, the more places you'll go. - Dr. Seuss",
  "The only true wisdom is in knowing you know nothing. - Socrates",
  "What you get by achieving your goals is not as important as what you become by achieving your goals. - Zig Ziglar",
  "The best way to find yourself is to lose yourself in the service of others. - Mahatma Gandhi",
  "The biggest challenge in life is being yourself… in a world trying to make you like everyone else. - Unknown",
  "The greatest discovery of all time is that a person can change his future by merely changing his attitude. - Oprah Winfrey"
];

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favoriteQuotes');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // Set random initial quote
    setCurrentQuoteIndex(Math.floor(Math.random() * quotes.length));
  }, []);

  useEffect(() => {
    // Save favorites to localStorage whenever it changes
    localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
  }, [favorites]);

  const getNewQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * quotes.length);
      } while (newIndex === currentQuoteIndex && quotes.length > 1);
      setCurrentQuoteIndex(newIndex);
      setIsAnimating(false);
    }, 200);
  };

  const addToFavorites = () => {
    const currentQuote = quotes[currentQuoteIndex];
    if (!favorites.includes(currentQuote)) {
      setFavorites([...favorites, currentQuote]);
      toast.success("Quote added to favorites! ❤️", {
        duration: 2000,
      });
    } else {
      toast.info("Quote is already in favorites!", {
        duration: 2000,
      });
    }
  };

  const removeFromFavorites = (quoteToRemove: string) => {
    setFavorites(favorites.filter(quote => quote !== quoteToRemove));
    toast.success("Quote removed from favorites", {
      duration: 2000,
    });
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  const currentQuote = quotes[currentQuoteIndex];
  const isFavorite = favorites.includes(currentQuote);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-300 via-rose-300 to-pink-400 p-4 sm:p-6 lg:p-8">
      {/* Floating particles for visual appeal */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <Sparkles className="w-4 h-4 text-white/30" />
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Quote of the Day
          </h1>
          <p className="text-lg sm:text-xl text-white/90 drop-shadow-md">
            Discover daily inspiration to fuel your journey
          </p>
        </div>

        {/* Main Content */}
        {!showFavorites ? (
          <div className="space-y-6 sm:space-y-8">
            {/* Quote Card */}
            <QuoteCard 
              quote={currentQuote} 
              isAnimating={isAnimating}
              isFavorite={isFavorite}
            />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={addToFavorites}
                className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white shadow-lg transform hover:scale-105 transition-all duration-200 group"
                size="lg"
              >
                <Heart className={`w-5 h-5 mr-2 transition-all duration-200 ${isFavorite ? 'fill-current' : 'group-hover:fill-current'}`} />
                Add to Favorites
              </Button>

              <Button
                onClick={getNewQuote}
                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white shadow-lg transform hover:scale-105 transition-all duration-200"
                size="lg"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                New Quote
              </Button>

              <Button
                onClick={() => setShowFavorites(true)}
                variant="outline"
                className="w-full sm:w-auto bg-white/20 border-white/30 text-white hover:bg-white/30 shadow-lg transform hover:scale-105 transition-all duration-200"
                size="lg"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                View Favorites ({favorites.length})
              </Button>
            </div>
          </div>
        ) : (
          <FavoritesList
            favorites={favorites}
            onRemove={removeFromFavorites}
            onBack={() => setShowFavorites(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
