import React, { useState } from 'react';
import { MapPin, Calendar, Link as LinkIcon, MoreHorizontal, UserPlus, MessageCircle } from 'lucide-react';
import { User, Post as PostType } from '../data/sampleData';
import Post from './Post';

interface ProfileProps {
  user: User;
  posts: PostType[];
  users: User[];
  onLike: (postId: string) => void;
  onTagClick: (tag: string) => void;
  onClose?: () => void;
}

export default function Profile({ user, posts, users, onLike, onTagClick, onClose }: ProfileProps) {
  const [activeTab, setActiveTab] = useState<'posts' | 'about'>('posts');
  const [isFollowing, setIsFollowing] = useState(false);

  const userPosts = posts.filter(post => post.userId === user.id);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Cover Photo */}
      <div className="h-48 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 rounded-full p-2 text-white transition-colors"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Profile Info */}
      <div className="px-6 pb-6">
        {/* Avatar and Basic Info */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-16 mb-6">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.fullName}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
            {user.verified && (
              <div className="absolute bottom-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>

          <div className="flex-1 mt-4 sm:mt-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.fullName}</h1>
                <p className="text-gray-600">@{user.username}</p>
              </div>
              
              <div className="flex space-x-3 mt-4 sm:mt-0">
                <button
                  onClick={handleFollow}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    isFollowing
                      ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <UserPlus className="h-4 w-4 inline mr-2" />
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  <MessageCircle className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-800 mt-4 leading-relaxed">{user.bio}</p>

            {/* Stats */}
            <div className="flex space-x-8 mt-4">
              <div>
                <span className="font-bold text-gray-900">{formatNumber(user.posts)}</span>
                <span className="text-gray-600 ml-1">Posts</span>
              </div>
              <div>
                <span className="font-bold text-gray-900">{formatNumber(user.followers)}</span>
                <span className="text-gray-600 ml-1">Followers</span>
              </div>
              <div>
                <span className="font-bold text-gray-900">{formatNumber(user.following)}</span>
                <span className="text-gray-600 ml-1">Following</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('posts')}
              className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'posts'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Posts ({userPosts.length})
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'about'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              About
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'posts' ? (
            <div>
              {userPosts.length > 0 ? (
                <div className="space-y-6">
                  {userPosts
                    .sort((a, b) => new Date(b.timestamp.replace(' ago', '')).getTime() - new Date(a.timestamp.replace(' ago', '')).getTime())
                    .map((post) => (
                      <Post
                        key={post.id}
                        post={post}
                        user={user}
                        onLike={onLike}
                        onTagClick={onTagClick}
                      />
                    ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No posts yet</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">About {user.fullName}</h3>
                <p className="text-gray-600 leading-relaxed">{user.bio}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{formatNumber(user.posts)}</div>
                    <div className="text-sm text-gray-600">Posts Published</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{formatNumber(user.followers)}</div>
                    <div className="text-sm text-gray-600">Followers</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}