import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Stories from './components/Stories';
import Post from './components/Post';
import Profile from './components/Profile';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import TagFilter from './components/TagFilter';
import { sampleUsers, samplePosts, sampleStories } from './data/sampleData';

type View = 'home' | 'search' | 'profiles' | 'profile' | 'trending' | 'leaderboard';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'all' | 'posts' | 'profiles'>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewedStories, setViewedStories] = useState<string[]>([]);

  const currentUser = sampleUsers[0]; // Sarah Chen as the current user

  // Update story viewed status
  const storiesWithViewStatus = useMemo(() => {
    return sampleStories.map(story => ({
      ...story,
      viewed: viewedStories.includes(story.id)
    }));
  }, [viewedStories]);

  // Get all available tags
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    samplePosts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter posts based on selected tags
  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) return samplePosts;
    return samplePosts.filter(post => 
      post.tags.some(tag => selectedTags.includes(tag))
    );
  }, [selectedTags]);

  // Search functionality
  const searchResults = useMemo(() => {
    if (!searchQuery) return { posts: [], users: [] };

    const query = searchQuery.toLowerCase();
    
    let posts = samplePosts;
    let users = sampleUsers;

    if (searchType === 'posts' || searchType === 'all') {
      posts = samplePosts.filter(post => 
        post.content.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    } else {
      posts = [];
    }

    if (searchType === 'profiles' || searchType === 'all') {
      users = sampleUsers.filter(user =>
        user.username.toLowerCase().includes(query) ||
        user.fullName.toLowerCase().includes(query) ||
        user.bio.toLowerCase().includes(query)
      );
    } else {
      users = [];
    }

    return { posts, users };
  }, [searchQuery, searchType]);

  const handleViewChange = (view: View) => {
    setCurrentView(view);
    setSelectedUserId(null);
    if (view !== 'search') {
      setSearchQuery('');
    }
  };

  const handleUserClick = (user: typeof sampleUsers[0]) => {
    setSelectedUserId(user.id);
    setCurrentView('profile');
  };

  const handleSearch = (query: string, type: 'all' | 'posts' | 'profiles') => {
    setSearchQuery(query);
    setSearchType(type);
    setCurrentView('search');
  };

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
    setCurrentView('home');
  };

  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const handleClearAllTags = () => {
    setSelectedTags([]);
  };

  const handleLike = (postId: string) => {
    // In a real app, this would update the backend
    console.log('Liked post:', postId);
  };

  const handleStoryViewed = (storyId: string) => {
    setViewedStories(prev => [...prev, storyId]);
  };

  const renderContent = () => {
    const selectedUser = selectedUserId ? sampleUsers.find(u => u.id === selectedUserId) : null;

    switch (currentView) {
      case 'home':
        return (
          <div>
            {/* Stories */}
            <Stories
              stories={storiesWithViewStatus}
              users={sampleUsers}
              currentUserId={currentUser.id}
              onStoryViewed={handleStoryViewed}
            />

            {/* Tag Filter */}
            <TagFilter
              selectedTags={selectedTags}
              availableTags={availableTags}
              onTagSelect={handleTagClick}
              onTagRemove={handleTagRemove}
              onClearAll={handleClearAllTags}
            />

            {/* Posts */}
            <div className="space-y-6">
              {filteredPosts.map((post) => {
                const user = sampleUsers.find(u => u.id === post.userId);
                if (!user) return null;
                return (
                  <Post
                    key={post.id}
                    post={post}
                    user={user}
                    onLike={handleLike}
                    onTagClick={handleTagClick}
                  />
                );
              })}
            </div>
          </div>
        );

      case 'search':
        return (
          <div>
            <div className="mb-6">
              <SearchBar onSearch={handleSearch} />
            </div>
            <SearchResults
              query={searchQuery}
              posts={searchResults.posts}
              users={searchResults.users}
              allUsers={sampleUsers}
              onUserClick={handleUserClick}
              onTagClick={handleTagClick}
            />
          </div>
        );

      case 'profiles':
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Discover People</h2>
              <p className="text-gray-600">Connect with interesting people in your network</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleUserClick(user)}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="text-center">
                    <img
                      src={user.avatar}
                      alt={user.fullName}
                      className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-gray-200"
                    />
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      <h3 className="font-semibold text-gray-900">{user.fullName}</h3>
                      {user.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm mb-3">@{user.username}</p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{user.bio}</p>
                    
                    <div className="flex justify-center space-x-6 text-sm">
                      <div>
                        <span className="font-semibold text-gray-900">{user.followers.toLocaleString()}</span>
                        <span className="text-gray-500 ml-1">Followers</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">{user.posts}</span>
                        <span className="text-gray-500 ml-1">Posts</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'profile':
        if (!selectedUser) {
          return (
            <Profile
              user={currentUser}
              posts={samplePosts}
              users={sampleUsers}
              onLike={handleLike}
              onTagClick={handleTagClick}
            />
          );
        }
        return (
          <Profile
            user={selectedUser}
            posts={samplePosts}
            users={sampleUsers}
            onLike={handleLike}
            onTagClick={handleTagClick}
            onClose={() => setCurrentView('profiles')}
          />
        );

      case 'trending':
        const trendingTags = availableTags.slice(0, 10);
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Trending</h2>
              <p className="text-gray-600">Popular tags and topics right now</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trendingTags.map((tag, index) => {
                const tagPosts = samplePosts.filter(post => post.tags.includes(tag));
                const totalEngagement = tagPosts.reduce((sum, post) => sum + post.likes + post.comments, 0);
                
                return (
                  <div
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">#{index + 1} Trending</span>
                      <span className="text-xs text-gray-400">{tagPosts.length} posts</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">#{tag}</h3>
                    <p className="text-sm text-gray-600">{totalEngagement.toLocaleString()} interactions</p>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'leaderboard':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Leaderboard</h2>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Rank</th>
                  <th className="py-2 px-4 border-b text-left">User</th>
                  <th className="py-2 px-4 border-b text-left">Posts</th>
                  <th className="py-2 px-4 border-b text-left">Likes</th>
                </tr>
              </thead>
              <tbody>
                {sampleUsers.slice(0, 10).map((user, idx) => (
                  <tr key={user.id} className="hover:bg-blue-50">
                    <td className="py-2 px-4 border-b">{idx + 1}</td>
                    <td className="py-2 px-4 border-b flex items-center space-x-2">
                      <img src={user.avatar} alt={user.fullName} className="w-7 h-7 rounded-full border border-gray-200" />
                      <span>{user.fullName}</span>
                    </td>
                    <td className="py-2 px-4 border-b">{samplePosts.filter(p => p.userId === user.id).length}</td>
                    <td className="py-2 px-4 border-b">{samplePosts.filter(p => p.userId === user.id).reduce((acc, p) => acc + (p.likes || 0), 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col">
      {/* Header Bar */}
      <header className="w-full bg-white shadow flex items-center px-8 h-16 sticky top-0 z-30 border-b border-[#e4e6eb]">
        <div className="flex items-center space-x-3">
          <img src="/logo192.png" alt="Fawazbook Logo" className="w-9 h-9 mr-2" />
          <span className="text-2xl font-extrabold text-blue-600 tracking-tight">Fawazbook</span>
        </div>
        <div className="flex-1 flex justify-center">
          {/* Optionally, add a search bar or navigation icons here */}
        </div>
        <div className="flex items-center space-x-4">
          {/* Optionally, add user avatar or quick links here */}
        </div>
      </header>
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar
          currentView={currentView}
          onViewChange={handleViewChange}
          currentUser={currentUser}
        />
        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center bg-[#f0f2f5]">
          <div className="w-full max-w-2xl mt-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}