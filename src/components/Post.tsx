import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Hash } from 'lucide-react';
import { Post as PostType, User } from '../data/sampleData';

interface PostProps {
  post: PostType;
  user: User;
  onLike: (postId: string) => void;
  onTagClick: (tag: string) => void;
}

export default function Post({ post, user, onLike, onTagClick }: PostProps) {
  const [isLiked, setIsLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.commentsList || []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    onLike(post.id);
  };

  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim() === "") return;
    const newComment = {
      id: Date.now().toString(),
      user: user,
      content: commentText,
      timestamp: "Just now"
    };
    setComments([...comments, newComment]);
    setCommentText("");
  };

  return (
    <div className="bg-white rounded-2xl shadow border border-[#e4e6eb] overflow-hidden mb-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="p-4 pb-2 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={user.avatar}
            alt={user.fullName}
            className="w-11 h-11 rounded-full border border-[#e4e6eb]"
          />
          <div>
            <div className="flex items-center space-x-1">
              <h3 className="font-semibold text-gray-900 text-base">{user.fullName}</h3>
              {user.verified && (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500">@{user.username} • {post.timestamp}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 text-[15px] leading-relaxed">{post.content}</p>
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagClick(tag)}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <Hash className="h-3 w-3 mr-1" />
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Image */}
      {post.image && (
        <div className="px-4 pb-3">
          <img
            src={post.image}
            alt="Post content"
            className="w-full rounded-xl max-h-96 object-cover border border-[#e4e6eb]"
          />
        </div>
      )}
      {/* Actions */}
      <div className="px-4 py-3 border-t border-[#e4e6eb] bg-[#f7f8fa]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 ${isLiked ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-gray-700'} transition-colors group`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''} group-hover:scale-110 transition-transform`} />
              <span className="text-sm font-medium">{formatCount(likes)}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors group">
              <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">{formatCount(post.comments)}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors group">
              <Share2 className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">{formatCount(post.shares)}</span>
            </button>
          </div>
          <button className="text-gray-500 hover:text-gray-700 transition-colors group">
            <Bookmark className="h-5 w-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
      {/* Comments Section */}
      <div className="px-4 pb-4">
        <div className="mt-2">
          <h4 className="font-semibold text-sm text-gray-700 mb-2">Comments</h4>
          {comments.length === 0 && <p className="text-xs text-gray-400">No comments yet.</p>}
          <ul className="space-y-3">
            {comments.filter(comment => comment && comment.user && comment.user.avatar).map((comment: any) => (
              <li key={comment.id} className="flex items-start space-x-2">
                <img src={comment.user.avatar} alt={comment.user.fullName} className="w-7 h-7 rounded-full border border-[#e4e6eb] mt-1" />
                <div>
                  <span className="font-medium text-xs text-gray-800">{comment.user.fullName}</span>
                  <span className="text-xs text-gray-400 ml-2">{comment.timestamp}</span>
                  <p className="text-xs text-gray-700 mt-1">{comment.content}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={handleCommentSubmit} className="flex items-center mt-3 space-x-2">
          <input
            type="text"
            className="flex-1 border border-[#e4e6eb] rounded-full px-3 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-100 bg-[#f0f2f5]"
            placeholder="Write a comment..."
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 text-white text-xs px-4 py-1 rounded-full hover:bg-blue-600 transition-colors">Post</button>
        </form>
      </div>
    </div>
  );
}