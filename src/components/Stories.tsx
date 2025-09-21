import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Story, User } from '../data/sampleData';
import StoryViewer from './StoryViewer';

interface StoriesProps {
  stories: Story[];
  users: User[];
  currentUserId?: string;
  onStoryViewed: (storyId: string) => void;
}

export default function Stories({ stories, users, currentUserId = '1', onStoryViewed }: StoriesProps) {
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  
  // Group stories by user
  const storiesByUser = stories.reduce((acc, story) => {
    if (!acc[story.userId]) {
      acc[story.userId] = [];
    }
    acc[story.userId].push(story);
    return acc;
  }, {} as Record<string, Story[]>);

  // Get latest story for each user for display
  const userStories = Object.entries(storiesByUser).map(([userId, userStories]) => {
    const user = users.find(u => u.id === userId);
    const latestStory = userStories.sort((a, b) => 
      new Date(b.timestamp.replace(' ago', '')).getTime() - new Date(a.timestamp.replace(' ago', '')).getTime()
    )[0];
    
    return {
      user,
      story: latestStory,
      hasUnviewed: userStories.some(s => !s.viewed)
    };
  }).filter(item => item.user);

  const handleStoryClick = (storyId: string) => {
    setSelectedStoryId(storyId);
  };

  const closeStoryViewer = () => {
    setSelectedStoryId(null);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Stories</h2>
        
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {/* Add Your Story */}
          <div className="flex-shrink-0 text-center cursor-pointer group">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Plus className="h-8 w-8 text-white" />
              </div>
            </div>
            <p className="text-xs text-gray-600 font-medium">Your Story</p>
          </div>

          {/* User Stories */}
          {userStories.map(({ user, story, hasUnviewed }) => (
            <div
              key={user!.id}
              onClick={() => handleStoryClick(story.id)}
              className="flex-shrink-0 text-center cursor-pointer group"
            >
              <div className="relative mb-2">
                <div className={`w-16 h-16 rounded-full p-0.5 ${
                  hasUnviewed 
                    ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500' 
                    : 'bg-gray-300'
                } group-hover:scale-105 transition-transform`}>
                  <img
                    src={user!.avatar}
                    alt={user!.fullName}
                    className="w-full h-full rounded-full border-2 border-white object-cover"
                  />
                </div>
                {hasUnviewed && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <p className="text-xs text-gray-600 font-medium max-w-[64px] truncate">
                {user!.username}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Story Viewer Modal */}
      {selectedStoryId && (
        <StoryViewer
          stories={stories}
          users={users}
          initialStoryId={selectedStoryId}
          onClose={closeStoryViewer}
          onStoryViewed={onStoryViewed}
        />
      )}
    </>
  );
}