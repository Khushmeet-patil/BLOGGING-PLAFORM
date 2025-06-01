import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Link as LinkIcon, 
  Calendar,
  Heart,
  MessageCircle,
  Clock,
  MoreHorizontal,
  UserPlus,
  Mail,
  Settings
} from 'lucide-react';

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    // Mock data for user profile
    const mockProfile = {
      id: id || '1',
      name: 'Sarah Johnson',
      bio: 'Senior Frontend Developer at TechCorp. Passionate about React, TypeScript, and modern web technologies. Love sharing knowledge and building amazing user experiences.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612c3c6?w=400&h=400&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=400&fit=crop',
      location: 'San Francisco, CA',
      website: 'https://sarahjohnson.dev',
      joinedAt: '2022-03-15',
      stats: {
        posts: 42,
        followers: 1247,
        following: 189
      },
      isFollowing: false
    };

    const mockPosts = [
      {
        id: '1',
        title: 'Getting Started with React Server Components',
        excerpt: 'Learn how to implement and use React Server Components in your next project.',
        publishedAt: '2024-01-15',
        readTime: 12,
        category: 'React',
        likes: 89,
        comments: 23,
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop'
      },
      {
        id: '2',
        title: 'Building Better APIs with Node.js',
        excerpt: 'Best practices for creating robust and scalable APIs using Node.js and Express.',
        publishedAt: '2024-01-12',
        readTime: 8,
        category: 'Node.js',
        likes: 67,
        comments: 15,
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop'
      },
      {
        id: '3',
        title: 'The Future of Web Development',
        excerpt: 'Exploring upcoming trends and technologies that will shape web development.',
        publishedAt: '2024-01-10',
        readTime: 6,
        category: 'Technology',
        likes: 124,
        comments: 31,
        image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=400&fit=crop'
      }
    ];

    const mockLikedPosts = [
      {
        id: '4',
        title: 'Modern CSS Grid Layout Techniques',
        excerpt: 'Master CSS Grid with practical examples and responsive design patterns.',
        publishedAt: '2024-01-14',
        readTime: 6,
        category: 'CSS',
        likes: 54,
        comments: 9,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop'
      },
      {
        id: '5',
        title: 'JavaScript Performance Optimization',
        excerpt: 'Tips and techniques to make your JavaScript applications faster and more efficient.',
        publishedAt: '2024-01-11',
        readTime: 10,
        category: 'JavaScript',
        likes: 78,
        comments: 18,
        image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop'
      }
    ];

    setProfile(mockProfile);
    setPosts(mockPosts);
    setLikedPosts(mockLikedPosts);
    setIsLoading(false);
  }, [id]);

  const handleFollow = () => {
    if (!profile) return;
    
    const newFollowing = !profile.isFollowing;
    setProfile({
      ...profile,
      isFollowing: newFollowing,
      stats: {
        ...profile.stats,
        followers: newFollowing ? profile.stats.followers + 1 : profile.stats.followers - 1
      }
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const formatPostDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    });
  };

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const PostCard = ({ post }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="flex">
          <div className="w-1/3">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-32 object-cover"
            />
          </div>
          <div className="w-2/3 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {post.category}
              </Badge>
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                {post.readTime} min
              </div>
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
              {post.title}
            </h3>
            
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{formatPostDate(post.publishedAt)}</span>
              <div className="flex items-center space-x-3 text-gray-500">
                <div className="flex items-center">
                  <Heart className="h-3 w-3 mr-1" />
                  <span className="text-xs">{post.likes}</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  <span className="text-xs">{post.comments}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-64 bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden">
        <img
          src={profile.coverImage}
          alt="Cover"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="relative -mt-16 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                  <p className="text-gray-600 mt-1">{profile.bio}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    {profile.location && (
                      <div className="flex items-center text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{profile.location}</span>
                      </div>
                    )}
                    {profile.website && (
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-500 hover:text-blue-600"
                      >
                        <LinkIcon className="h-4 w-4 mr-1" />
                        <span className="text-sm">Website</span>
                      </a>
                    )}
                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="text-sm">Joined {formatDate(profile.joinedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <Button
                  variant={profile.isFollowing ? "outline" : "default"}
                  onClick={handleFollow}
                  className="flex items-center"
                >
                  {profile.isFollowing ? (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Follow
                    </>
                  )}
                </Button>
                <Button variant="outline" className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 mt-8">
              <div>
                <span className="text-2xl font-bold text-gray-900">{profile.stats.posts}</span>
                <span className="text-gray-600 ml-2">Posts</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">{profile.stats.followers}</span>
                <span className="text-gray-600 ml-2">Followers</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">{profile.stats.following}</span>
                <span className="text-gray-600 ml-2">Following</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="likes">Likes</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>

          <TabsContent value="likes" className="space-y-4">
            {likedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile; 