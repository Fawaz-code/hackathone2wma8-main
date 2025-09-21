import React from 'react';
import { User, Hash, Users as UsersIcon } from 'lucide-react';
import { User as UserType, Post } from '../data/sampleData';

interface SearchResultsProps {
  query: string;
  posts: Post[];
  users: UserType[];
  allUsers: UserType[];
  onUserClick: (user: UserType) => void;
  onTagClick: (tag: string) => void;
}

export default function SearchResults({ 
  query, 
  posts, 
  users, 
  allUsers, 
  onUserClick, 
  onTagClick 
}: SearchResultsProps) {
  if (!query) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <Hash className="h-16 w-16 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Search for anything</h3>
        <p className="text-gray-500">Find posts, users, or explore tags</p>
      </div>
    );
  }

  const hasResults = posts.length > 0 || users.length > 0;

  return (
    <div className="space-y-6">
      {/* Search Query */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-blue-900 mb-1">
          Search results for "{query}"
        </h2>
        <p className="text-blue-700 text-sm">
          Found {posts.length} posts and {users.length} users
        </p>
      </div>

      {!hasResults ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Hash className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-500">Try searching with different keywords</p>
        </div>
      ) : (
        <>
          {/* Users Results */}
          {users.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <UsersIcon className="h-5 w-5 mr-2" />
                People ({users.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => onUserClick(user)}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar}
                        alt={user.fullName}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1">
                          <h4 className="font-semibold text-gray-900 truncate">
                            {user.fullName}
                          </h4>
                          {user.verified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 truncate">@{user.username}</p>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                          {user.bio}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-3">
                      <span>{user.followers.toLocaleString()} followers</span>
                      <span>{user.posts} posts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Posts Results */}
          {posts.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Hash className="h-5 w-5 mr-2" />
                Posts ({posts.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {posts.map((post) => {
                  const postUser = allUsers.find(u => u.id === post.userId);
                  if (!postUser) return null;

                  return (
                    <div
                      key={post.id}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-2 mb-3">
                        <img
                          src={postUser.avatar}
                          alt={postUser.fullName}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <h4 className="font-semibold text-sm text-gray-900">
                            {postUser.fullName}
                          </h4>
                          <p className="text-xs text-gray-500">@{postUser.username}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-800 text-sm mb-3 line-clamp-3">
                        {post.content}
                      </p>
                      
                      {post.image && (
                        <img
                          src={post.image}
                          alt="Post content"
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                      )}
                      
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {post.tags.slice(0, 3).map((tag) => (
                            <button
                              key={tag}
                              onClick={() => onTagClick(tag)}
                              className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                            >
                              #{tag}
                            </button>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{post.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                      
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{post.likes} likes</span>
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}