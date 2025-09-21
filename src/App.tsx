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
  const [posts, setPosts] = useState(samplePosts);
  const [showPostModal, setShowPostModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState<string | null>(null);
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
    if (selectedTags.length === 0) return posts;
    return posts.filter(post => 
      post.tags.some(tag => selectedTags.includes(tag))
    );
  }, [selectedTags, posts]);

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
    if (query.startsWith('#')) {
      // Navigate to trending/tags view for the hashtag
      setSelectedTags([query.slice(1)]);
      setCurrentView('trending');
      setSearchQuery('');
      return;
    }
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
                    onDelete={() => setPosts(posts.filter(p => p.id !== post.id))}
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
        // Professional, advanced leaderboard UI
        return (
          <div className="p-6">
            <h2 className="text-3xl font-extrabold text-blue-700 mb-6 flex items-center gap-2">
              <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.77l-4.77 2.51.91-5.32-3.87-3.77 5.34-.78z" /></svg>
              Leaderboard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow p-4 flex flex-col items-center">
                <span className="text-2xl font-bold text-blue-700">{sampleUsers.length}</span>
                <span className="text-gray-600">Users</span>
              </div>
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-2xl shadow p-4 flex flex-col items-center">
                <span className="text-2xl font-bold text-yellow-600">{samplePosts.length}</span>
                <span className="text-gray-600">Posts</span>
              </div>
              <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-2xl shadow p-4 flex flex-col items-center">
                <span className="text-2xl font-bold text-pink-600">{samplePosts.reduce((acc, p) => acc + (p.likes || 0), 0)}</span>
                <span className="text-gray-600">Total Likes</span>
              </div>
            </div>
            <table className="min-w-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
              <thead className="bg-blue-50">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Rank</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">User</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Posts</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Likes</th>
                </tr>
              </thead>
              <tbody>
                {sampleUsers.slice(0, 10).map((user, idx) => {
                  const isTop3 = idx < 3;
                  const badgeColors = ["bg-yellow-400 text-white", "bg-gray-300 text-gray-800", "bg-orange-400 text-white"];
                  return (
                    <tr key={user.id} className={`hover:bg-blue-50 transition ${isTop3 ? 'font-bold' : ''}`}>
                      <td className="py-2 px-4 border-b">
                        {isTop3 ? (
                          <span className={`inline-block w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold ${badgeColors[idx]}`}>{idx + 1}</span>
                        ) : (
                          idx + 1
                        )}
                      </td>
                      <td className="py-2 px-4 border-b flex items-center gap-2">
                        <img src={user.avatar} alt={user.fullName} className="w-9 h-9 rounded-full border-2 border-blue-200 shadow-sm" />
                        <span>{user.fullName}</span>
                        {user.verified && <svg className="w-4 h-4 text-blue-500 ml-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                      </td>
                      <td className="py-2 px-4 border-b">{samplePosts.filter(p => p.userId === user.id).length}</td>
                      <td className="py-2 px-4 border-b">{samplePosts.filter(p => p.userId === user.id).reduce((acc, p) => acc + (p.likes || 0), 0)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Recent Activity</h3>
              <ul className="space-y-2">
                {samplePosts.slice(0, 5).map(post => {
                  const user = sampleUsers.find(u => u.id === post.userId);
                  if (!user) return null;
                  return (
                    <li key={post.id} className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2 shadow-sm">
                      <img src={user.avatar} alt={user.fullName} className="w-7 h-7 rounded-full border border-gray-200" />
                      <span className="font-semibold text-gray-900">{user.fullName}</span>
                      <span className="text-gray-600">posted</span>
                      <span className="truncate text-gray-700 max-w-xs">{post.content.slice(0, 40)}...</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col">
      <div className="flex items-center justify-between px-6 py-2">
        <div className="flex items-center gap-2">
          <img src="/facebook-logo.svg" alt="Facebook Logo" className="w-8 h-8" />
          <span className="text-blue-600 font-bold text-xl">fawazbokk</span>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-1 font-semibold shadow transition" onClick={() => setShowPostModal(true)}>New Post</button>
      </div>
      {/* Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form onSubmit={handleCreatePost} className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create Post</h2>
            <textarea
              className="w-full border border-gray-200 rounded-lg p-2 mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-100"
              rows={3}
              placeholder="What's on your mind?"
              value={newPostContent}
              onChange={e => setNewPostContent(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              className="mb-3"
              onChange={e => {
                const file = e.target.files && e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = ev => setNewPostImage(ev.target?.result as string);
                  reader.readAsDataURL(file);
                }
              }}
            />
            {newPostImage && (
              <img src={newPostImage} alt="Preview" className="w-full rounded-lg mb-3 max-h-60 object-cover" />
            )}
            <div className="flex justify-end gap-2">
              <button type="button" className="px-4 py-1 rounded bg-gray-200 text-gray-700" onClick={() => setShowPostModal(false)}>Cancel</button>
              <button type="submit" className="px-4 py-1 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700">Post</button>
            </div>
          </form>
        </div>
      )}
      <div className="flex flex-1">
        <Sidebar
          currentView={currentView}
          onViewChange={handleViewChange}
          currentUser={currentUser}
        />
        <div className="flex-1 flex flex-col items-center bg-[#f0f2f5]">
          <div className="w-full max-w-2xl mt-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

// Add this function inside App component
const handleCreatePost = (e: React.FormEvent) => {
  e.preventDefault();
  if (!newPostContent && !newPostImage) return;
  const newPost = {
    id: Date.now().toString(),
    userId: currentUser.id,
    content: newPostContent,
    image: newPostImage,
    tags: [],
    likes: 0,
    comments: 0,
    createdAt: new Date().toISOString(),
  };
  setPosts([newPost, ...posts]);
  setShowPostModal(false);
  setNewPostContent("");
  setNewPostImage(null);
};