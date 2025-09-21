export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
  verified: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  timestamp: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  image?: string;
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  liked: boolean;
  commentsList?: Comment[];
}

export interface Story {
  id: string;
  userId: string;
  image: string;
  timestamp: string;
  viewed: boolean;
}

export const sampleUsers: User[] = [
  {
    id: '1',
    username: 'sarah_chen',
    fullName: 'Sarah Chen',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Digital artist & UI/UX designer. Creating beautiful experiences ✨',
    followers: 15420,
    following: 892,
    posts: 147,
    verified: true
  },
  {
    id: '2',
    username: 'alex_travel',
    fullName: 'Alex Rodriguez',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Travel photographer 📸 | Adventure seeker 🌍',
    followers: 8903,
    following: 1205,
    posts: 89,
    verified: false
  },
  {
    id: '3',
    username: 'tech_guru_mike',
    fullName: 'Mike Johnson',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Software engineer | Tech enthusiast | Coffee lover ☕',
    followers: 12567,
    following: 567,
    posts: 203,
    verified: true
  },
  {
    id: '4',
    username: 'fitness_emma',
    fullName: 'Emma Wilson',
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Certified fitness trainer 💪 | Nutrition coach | Living my best life',
    followers: 23891,
    following: 345,
    posts: 312,
    verified: true
  },
  {
    id: '5',
    username: 'foodie_david',
    fullName: 'David Park',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Food blogger | Chef | Sharing culinary adventures 🍳',
    followers: 9876,
    following: 1123,
    posts: 187,
    verified: false
  },
  {
    id: '6',
    username: 'music_lisa',
    fullName: 'Lisa Anderson',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Singer-songwriter 🎵 | Music producer | Creating melodies',
    followers: 34567,
    following: 789,
    posts: 156,
    verified: true
  },
  {
    id: '7',
    username: 'nature_tom',
    fullName: 'Tom Green',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Wildlife photographer | Nature conservationist 🌿',
    followers: 18234,
    following: 456,
    posts: 234,
    verified: false
  },
  {
    id: '8',
    username: 'fashion_sophia',
    fullName: 'Sophia Martinez',
    avatar: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Fashion designer | Style influencer | Sustainable fashion advocate 👗',
    followers: 45678,
    following: 234,
    posts: 289,
    verified: true
  }
];

export const samplePosts: Post[] = [
  {
    id: '1',
    userId: '1',
    content: 'Just finished designing this new mobile app interface. Love how the colors came together! 🎨',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['design', 'ui', 'mobile', 'creative'],
    likes: 234,
    comments: 18,
    shares: 12,
    timestamp: '2 hours ago',
    liked: false,
    commentsList: [
      { id: 'c1', userId: '2', text: 'Amazing work!', timestamp: '1 hour ago' },
      { id: 'c2', userId: '3', text: 'Colors look great.', timestamp: '45 minutes ago' }
    ]
  },
  {
    id: '2',
    userId: '2',
    content: 'Sunset in Santorini never gets old. This place is pure magic! ✨',
    image: 'https://images.pexels.com/photos/1139556/pexels-photo-1139556.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['travel', 'sunset', 'greece', 'photography'],
    likes: 567,
    comments: 43,
    shares: 28,
    timestamp: '4 hours ago',
    liked: true,
    commentsList: [
      { id: 'c3', userId: '1', text: 'Beautiful view!', timestamp: '3 hours ago' }
    ]
  },
  {
    id: '3',
    userId: '3',
    content: 'Working on a new React project with TypeScript. The developer experience is amazing! 💻',
    tags: ['programming', 'react', 'typescript', 'webdev'],
    likes: 189,
    comments: 25,
    shares: 15,
    timestamp: '6 hours ago',
    liked: false
  },
  {
    id: '4',
    userId: '4',
    content: 'Morning workout done! Remember, consistency is key to achieving your fitness goals 💪',
    image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['fitness', 'motivation', 'health', 'workout'],
    likes: 423,
    comments: 32,
    shares: 19,
    timestamp: '8 hours ago',
    liked: true
  },
  {
    id: '5',
    userId: '5',
    content: 'Homemade pasta with fresh basil and tomatoes. Simple ingredients, amazing flavors! 🍝',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['food', 'cooking', 'pasta', 'homemade'],
    likes: 345,
    comments: 28,
    shares: 22,
    timestamp: '10 hours ago',
    liked: false
  },
  {
    id: '6',
    userId: '6',
    content: 'Recording session for my new album. Can\'t wait to share these melodies with you all! 🎵',
    image: 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['music', 'recording', 'album', 'studio'],
    likes: 678,
    comments: 56,
    shares: 34,
    timestamp: '12 hours ago',
    liked: true
  },
  {
    id: '7',
    userId: '7',
    content: 'Captured this amazing shot of a bald eagle during today\'s hike. Nature is incredible! 🦅',
    image: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['nature', 'wildlife', 'photography', 'hiking'],
    likes: 512,
    comments: 41,
    shares: 31,
    timestamp: '14 hours ago',
    liked: false
  },
  {
    id: '8',
    userId: '8',
    content: 'New sustainable fashion collection dropping next week! Eco-friendly never looked so good 🌱',
    image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['fashion', 'sustainable', 'eco', 'design'],
    likes: 789,
    comments: 67,
    shares: 45,
    timestamp: '16 hours ago',
    liked: true
  },
  {
    id: '9',
    userId: '1',
    content: 'Color theory is fascinating! Here\'s my latest exploration with complementary colors.',
    image: 'https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['design', 'color', 'theory', 'art'],
    likes: 156,
    comments: 12,
    shares: 8,
    timestamp: '18 hours ago',
    liked: false
  },
  {
    id: '10',
    userId: '2',
    content: 'Tokyo streets at night. The neon lights create such an amazing atmosphere! 🌃',
    image: 'https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['travel', 'tokyo', 'night', 'urban'],
    likes: 634,
    comments: 38,
    shares: 26,
    timestamp: '20 hours ago',
    liked: true
  },
  {
    id: '11',
    userId: '3',
    content: 'Just deployed my portfolio website! Built with Next.js and styled with Tailwind CSS 🚀',
    tags: ['webdev', 'nextjs', 'tailwind', 'portfolio'],
    likes: 298,
    comments: 22,
    shares: 17,
    timestamp: '22 hours ago',
    liked: false
  },
  {
    id: '12',
    userId: '4',
    content: 'Yoga session in the park. Finding balance in both body and mind 🧘‍♀️',
    image: 'https://images.pexels.com/photos/1812964/pexels-photo-1812964.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['yoga', 'meditation', 'balance', 'wellness'],
    likes: 387,
    comments: 29,
    shares: 21,
    timestamp: '1 day ago',
    liked: true
  },
  {
    id: '13',
    userId: '5',
    content: 'Experimental fusion dish: Korean-Mexican tacos! Sometimes the best recipes come from mixing cultures 🌮',
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['food', 'fusion', 'korean', 'mexican'],
    likes: 456,
    comments: 35,
    shares: 24,
    timestamp: '1 day ago',
    liked: false
  },
  {
    id: '14',
    userId: '6',
    content: 'Acoustic version of my latest single is now live! Sometimes stripped down is the way to go 🎸',
    image: 'https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['music', 'acoustic', 'single', 'guitar'],
    likes: 523,
    comments: 44,
    shares: 33,
    timestamp: '1 day ago',
    liked: true
  },
  {
    id: '15',
    userId: '7',
    content: 'Early morning mist over the lake. These are the moments that make waking up at 5 AM worth it 🌅',
    image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['nature', 'morning', 'lake', 'peaceful'],
    likes: 412,
    comments: 31,
    shares: 18,
    timestamp: '1 day ago',
    liked: false
  },
  // Additional posts to reach 35+
  {
    id: '16',
    userId: '8',
    content: 'Behind the scenes of our sustainable fashion photoshoot. Every detail matters! 📸',
    image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['fashion', 'photoshoot', 'sustainable', 'behindthescenes'],
    likes: 678,
    comments: 52,
    shares: 41,
    timestamp: '1 day ago',
    liked: true
  },
  {
    id: '17',
    userId: '1',
    content: 'Working on a new logo design for a local coffee shop. Love projects that support the community! ☕',
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['design', 'logo', 'coffee', 'branding'],
    likes: 234,
    comments: 16,
    shares: 11,
    timestamp: '2 days ago',
    liked: false
  },
  {
    id: '18',
    userId: '2',
    content: 'Street art in Barcelona is absolutely incredible. Every corner tells a story! 🎨',
    image: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['travel', 'streetart', 'barcelona', 'culture'],
    likes: 567,
    comments: 39,
    shares: 27,
    timestamp: '2 days ago',
    liked: true
  },
  {
    id: '19',
    userId: '3',
    content: 'Just learned about Web Components. The future of web development is looking bright! 🌟',
    tags: ['webdev', 'webcomponents', 'javascript', 'frontend'],
    likes: 189,
    comments: 23,
    shares: 14,
    timestamp: '2 days ago',
    liked: false
  },
  {
    id: '20',
    userId: '4',
    content: 'HIIT workout complete! 20 minutes of pure intensity. Your future self will thank you 🔥',
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['fitness', 'hiit', 'workout', 'intensity'],
    likes: 398,
    comments: 31,
    shares: 19,
    timestamp: '2 days ago',
    liked: true
  },
  {
    id: '21',
    userId: '5',
    content: 'Fresh pasta made from scratch. There\'s something therapeutic about the process 🍜',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['food', 'pasta', 'homemade', 'cooking'],
    likes: 445,
    comments: 33,
    shares: 25,
    timestamp: '2 days ago',
    liked: false
  },
  {
    id: '22',
    userId: '6',
    content: 'Late night songwriting session. The best ideas come when the world is quiet 🌙',
    image: 'https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['music', 'songwriting', 'latenight', 'creative'],
    likes: 356,
    comments: 28,
    shares: 16,
    timestamp: '3 days ago',
    liked: true
  },
  {
    id: '23',
    userId: '7',
    content: 'Mountain hiking trail rewards you with views like this. Every step worth it! 🏔️',
    image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['hiking', 'mountains', 'nature', 'adventure'],
    likes: 523,
    comments: 42,
    shares: 29,
    timestamp: '3 days ago',
    liked: false
  },
  {
    id: '24',
    userId: '8',
    content: 'Vintage meets modern in our new collection. Timeless style never goes out of fashion ✨',
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['fashion', 'vintage', 'modern', 'timeless'],
    likes: 612,
    comments: 47,
    shares: 35,
    timestamp: '3 days ago',
    liked: true
  },
  {
    id: '25',
    userId: '1',
    content: 'Typography workshop was amazing! Learning new ways to make text come alive 📝',
    tags: ['design', 'typography', 'workshop', 'learning'],
    likes: 167,
    comments: 14,
    shares: 9,
    timestamp: '3 days ago',
    liked: false
  },
  {
    id: '26',
    userId: '2',
    content: 'Golden hour in Paris. The city of light living up to its name! ✨',
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['travel', 'paris', 'goldenhour', 'architecture'],
    likes: 789,
    comments: 58,
    shares: 43,
    timestamp: '4 days ago',
    liked: true
  },
  {
    id: '27',
    userId: '3',
    content: 'Debugging code at 2 AM. Sometimes you have to chase the bug until you catch it! 🐛',
    tags: ['programming', 'debugging', 'latenight', 'persistence'],
    likes: 234,
    comments: 19,
    shares: 12,
    timestamp: '4 days ago',
    liked: false
  },
  {
    id: '28',
    userId: '4',
    content: 'Nutrition is 80% of your fitness journey. Fueling your body right makes all the difference 🥗',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['nutrition', 'health', 'fitness', 'wellness'],
    likes: 456,
    comments: 36,
    shares: 28,
    timestamp: '4 days ago',
    liked: true
  },
  {
    id: '29',
    userId: '5',
    content: 'Sourdough bread baking is an art form. Three days of patient work paying off! 🍞',
    image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['baking', 'sourdough', 'bread', 'patience'],
    likes: 378,
    comments: 32,
    shares: 21,
    timestamp: '4 days ago',
    liked: false
  },
  {
    id: '30',
    userId: '6',
    content: 'Collaborating with other artists always sparks new creativity. Music is meant to be shared! 🎶',
    image: 'https://images.pexels.com/photos/159206/microphone-music-studio-recording-159206.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['music', 'collaboration', 'creativity', 'artists'],
    likes: 445,
    comments: 38,
    shares: 26,
    timestamp: '5 days ago',
    liked: true
  },
  {
    id: '31',
    userId: '7',
    content: 'Forest therapy is real. Sometimes you need to disconnect to reconnect 🌲',
    image: 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['nature', 'forest', 'therapy', 'mindfulness'],
    likes: 567,
    comments: 44,
    shares: 32,
    timestamp: '5 days ago',
    liked: false
  },
  {
    id: '32',
    userId: '8',
    content: 'Sustainable fashion isn\'t just a trend, it\'s a responsibility. Every choice matters 🌍',
    tags: ['fashion', 'sustainable', 'responsibility', 'environment'],
    likes: 623,
    comments: 51,
    shares: 39,
    timestamp: '5 days ago',
    liked: true
  },
  {
    id: '33',
    userId: '1',
    content: 'Minimalist design speaks volumes. Sometimes less truly is more ⚪',
    image: 'https://images.pexels.com/photos/1145434/pexels-photo-1145434.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['design', 'minimalist', 'simple', 'clean'],
    likes: 298,
    comments: 21,
    shares: 15,
    timestamp: '6 days ago',
    liked: false
  },
  {
    id: '34',
    userId: '2',
    content: 'Northern Lights in Iceland. Nature\'s own light show is absolutely mesmerizing! 🌌',
    image: 'https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg?auto=compress&cs=tinysrgb&w=500',
    tags: ['travel', 'northernlights', 'iceland', 'natural'],
    likes: 834,
    comments: 67,
    shares: 48,
    timestamp: '6 days ago',
    liked: true
  },
  {
    id: '35',
    userId: '3',
    content: 'Open source contribution feels great! Giving back to the community that taught me so much 🤝',
    tags: ['programming', 'opensource', 'community', 'contribution'],
    likes: 189,
    comments: 16,
    shares: 11,
    timestamp: '6 days ago',
    liked: false
  },
  {
    id: '36',
    userId: '4',
    content: 'Rest days are just as important as workout days. Listen to your body! 😴',
    tags: ['fitness', 'rest', 'recovery', 'balance'],
    likes: 367,
    comments: 28,
    shares: 18,
    timestamp: '1 week ago',
    liked: true
  }
];

export const sampleStories: Story[] = [
  {
    id: '1',
    userId: '1',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '2 hours ago',
    viewed: false
  },
  {
    id: '2',
    userId: '2',
    image: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '3 hours ago',
    viewed: true
  },
  {
    id: '3',
    userId: '3',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '4 hours ago',
    viewed: false
  },
  {
    id: '4',
    userId: '4',
    image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '5 hours ago',
    viewed: true
  },
  {
    id: '5',
    userId: '5',
    image: 'https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '6 hours ago',
    viewed: false
  },
  {
    id: '6',
    userId: '6',
    image: 'https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '7 hours ago',
    viewed: true
  },
  {
    id: '7',
    userId: '7',
    image: 'https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '8 hours ago',
    viewed: false
  },
  {
    id: '8',
    userId: '8',
    image: 'https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '9 hours ago',
    viewed: false
  },
  // Additional stories to reach 35+
  {
    id: '9',
    userId: '1',
    image: 'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '10 hours ago',
    viewed: true
  },
  {
    id: '10',
    userId: '2',
    image: 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '11 hours ago',
    viewed: false
  },
  {
    id: '11',
    userId: '3',
    image: 'https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '12 hours ago',
    viewed: true
  },
  {
    id: '12',
    userId: '4',
    image: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '13 hours ago',
    viewed: false
  },
  {
    id: '13',
    userId: '5',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '14 hours ago',
    viewed: true
  },
  {
    id: '14',
    userId: '6',
    image: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '15 hours ago',
    viewed: false
  },
  {
    id: '15',
    userId: '7',
    image: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '16 hours ago',
    viewed: true
  },
  {
    id: '16',
    userId: '8',
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '17 hours ago',
    viewed: false
  },
  {
    id: '17',
    userId: '1',
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '18 hours ago',
    viewed: true
  },
  {
    id: '18',
    userId: '2',
    image: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '19 hours ago',
    viewed: false
  },
  {
    id: '19',
    userId: '3',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '20 hours ago',
    viewed: true
  },
  {
    id: '20',
    userId: '4',
    image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '21 hours ago',
    viewed: false
  },
  {
    id: '21',
    userId: '5',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '22 hours ago',
    viewed: true
  },
  {
    id: '22',
    userId: '6',
    image: 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '23 hours ago',
    viewed: false
  },
  {
    id: '23',
    userId: '7',
    image: 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '1 day ago',
    viewed: true
  },
  {
    id: '24',
    userId: '8',
    image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '1 day ago',
    viewed: false
  },
  {
    id: '25',
    userId: '1',
    image: 'https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '1 day ago',
    viewed: true
  },
  {
    id: '26',
    userId: '2',
    image: 'https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '1 day ago',
    viewed: false
  },
  {
    id: '27',
    userId: '3',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '2 days ago',
    viewed: true
  },
  {
    id: '28',
    userId: '4',
    image: 'https://images.pexels.com/photos/1812964/pexels-photo-1812964.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '2 days ago',
    viewed: false
  },
  {
    id: '29',
    userId: '5',
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '2 days ago',
    viewed: true
  },
  {
    id: '30',
    userId: '6',
    image: 'https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '2 days ago',
    viewed: false
  },
  {
    id: '31',
    userId: '7',
    image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '3 days ago',
    viewed: true
  },
  {
    id: '32',
    userId: '8',
    image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '3 days ago',
    viewed: false
  },
  {
    id: '33',
    userId: '1',
    image: 'https://images.pexels.com/photos/1145434/pexels-photo-1145434.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '3 days ago',
    viewed: true
  },
  {
    id: '34',
    userId: '2',
    image: 'https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '4 days ago',
    viewed: false
  },
  {
    id: '35',
    userId: '3',
    image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '4 days ago',
    viewed: true
  },
  {
    id: '36',
    userId: '4',
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '5 days ago',
    viewed: false
  },
  {
    id: '37',
    userId: '5',
    image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=300',
    timestamp: '5 days ago',
    viewed: true
  }
];