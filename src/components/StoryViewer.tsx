import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Story, User } from '../data/sampleData';

interface StoryViewerProps {
  stories: Story[];
  users: User[];
  initialStoryId: string;
  onClose: () => void;
  onStoryViewed: (storyId: string) => void;
}

export default function StoryViewer({ 
  stories, 
  users, 
  initialStoryId, 
  onClose, 
  onStoryViewed 
}: StoryViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(
    stories.findIndex(story => story.id === initialStoryId)
  );
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentStory = stories[currentIndex];
  const currentUser = users.find(user => user.id === currentStory?.userId);

  useEffect(() => {
    if (!isPaused && currentStory) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            goToNextStory();
            return 0;
          }
          return prev + 1;
        });
      }, 50); // 5 seconds total (100 * 50ms)

      return () => clearInterval(interval);
    }
  }, [currentIndex, isPaused]);

  useEffect(() => {
    if (currentStory && !currentStory.viewed) {
      onStoryViewed(currentStory.id);
    }
  }, [currentStory, onStoryViewed]);

  const goToNextStory = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const goToPreviousStory = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  if (!currentStory || !currentUser) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="relative w-full max-w-md h-full max-h-screen bg-black">
        {/* Progress Bars */}
        <div className="absolute top-4 left-4 right-4 flex space-x-1 z-10">
          {stories.map((_, index) => (
            <div key={index} className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-100"
                style={{
                  width: index < currentIndex ? '100%' : 
                         index === currentIndex ? `${progress}%` : '0%'
                }}
              />
            </div>
          ))}
        </div>

        {/* User Info */}
        <div className="absolute top-12 left-4 right-16 flex items-center space-x-3 z-10">
          <img
            src={currentUser.avatar}
            alt={currentUser.fullName}
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <div>
            <h3 className="text-white font-semibold text-sm">{currentUser.username}</h3>
            <p className="text-white/70 text-xs">{currentStory.timestamp}</p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-12 right-4 z-10 text-white hover:text-gray-300 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Story Image */}
        <img
          src={currentStory.image}
          alt="Story"
          className="w-full h-full object-cover"
        />

        {/* Navigation Areas */}
        <button
          onClick={goToPreviousStory}
          className="absolute left-0 top-0 w-1/3 h-full bg-transparent"
          disabled={currentIndex === 0}
        />
        
        <button
          onClick={togglePause}
          className="absolute left-1/3 right-1/3 top-0 h-full bg-transparent flex items-center justify-center"
        >
          {isPaused && (
            <div className="bg-black/50 rounded-full p-2">
              {isPaused ? <Play className="h-8 w-8 text-white" /> : <Pause className="h-8 w-8 text-white" />}
            </div>
          )}
        </button>
        
        <button
          onClick={goToNextStory}
          className="absolute right-0 top-0 w-1/3 h-full bg-transparent"
        />

        {/* Navigation Arrows (Desktop) */}
        <div className="hidden md:block">
          {currentIndex > 0 && (
            <button
              onClick={goToPreviousStory}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          
          {currentIndex < stories.length - 1 && (
            <button
              onClick={goToNextStory}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Story Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full">
          <span className="text-white text-sm">
            {currentIndex + 1} / {stories.length}
          </span>
        </div>
      </div>
    </div>
  );
}