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
  const [showAddStoryModal, setShowAddStoryModal] = useState(false);
  const [newStoryImage, setNewStoryImage] = useState<string | null>(null);
  const [newStoryText, setNewStoryText] = useState("");
  const [localStories, setLocalStories] = useState<Story[]>([]);

  // Group stories by user
  const storiesByUser = [...stories, ...localStories].reduce((acc, story) => {
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
          <div className="flex-shrink-0 text-center cursor-pointer group" onClick={() => setShowAddStoryModal(true)}>
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
      {/* Add Story Modal */}
      {showAddStoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs" onSubmit={e => {
            e.preventDefault();
            if (newStoryImage || newStoryText) {
              setLocalStories(prev => [
                ...prev,
                {
                  id: Math.random().toString(36).substr(2, 9),
                  userId: currentUserId,
                  image: newStoryImage || undefined,
                  text: newStoryText,
                  viewed: false,
                  timestamp: new Date().toISOString()
                }
              ]);
            }
            setShowAddStoryModal(false);
            setNewStoryImage(null);
            setNewStoryText("");
          }}>
            <h2 className="text-lg font-bold mb-4">Add Your Story</h2>
            <input
              type="file"
              accept="image/*"
              className="mb-3"
              onChange={e => {
                const file = e.target.files && e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = ev => setNewStoryImage(ev.target?.result as string);
                  reader.readAsDataURL(file);
                }
              }}
            />
            {newStoryImage && (
              <img src={newStoryImage} alt="Preview" className="w-full rounded-lg mb-3 max-h-40 object-cover" />
            )}
            <textarea
              className="w-full border border-gray-200 rounded-lg p-2 mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-100"
              rows={2}
              placeholder="Write something..."
              value={newStoryText}
              onChange={e => setNewStoryText(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button type="button" className="px-3 py-1 rounded bg-gray-200 text-gray-700" onClick={() => setShowAddStoryModal(false)}>Cancel</button>
              <button type="submit" className="px-3 py-1 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700">Add Story</button>
            </div>
          </form>
        </div>
      )}
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