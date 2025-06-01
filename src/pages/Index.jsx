import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PenTool, BookOpen, Users, TrendingUp, Heart, MessageCircle, Clock, ChevronRight } from 'lucide-react';

const Index = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    // Mock data for featured posts
    const mockFeaturedPosts = [
      {
        id: '1',
        title: 'The Future of Web Development: What to Expect in 2024',
        excerpt: 'Exploring the latest trends and technologies shaping the future of web development.',
        author: {
          name: 'Sarah Johnson',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612c3c6?w=400&h=400&fit=crop&crop=face'
        },
        publishedAt: '2024-01-15',
        readTime: 8,
        category: 'Technology',
        likes: 142,
        comments: 23,
        image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=400&fit=crop'
      },
      {
        id: '2',
        title: 'Building Better User Experiences with Design Systems',
        excerpt: 'Learn how design systems can streamline your workflow and improve user satisfaction.',
        author: {
          name: 'Mike Chen',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
        },
        publishedAt: '2024-01-14',
        readTime: 6,
        category: 'Design',
        likes: 98,
        comments: 15,
        image: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&h=400&fit=crop'
      }
    ];

    const mockRecentPosts = [
      ...mockFeaturedPosts,
      {
        id: '3',
        title: 'Getting Started with React Server Components',
        excerpt: 'A comprehensive guide to understanding and implementing React Server Components.',
        author: {
          name: 'Alex Rodriguez',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
        },
        publishedAt: '2024-01-13',
        readTime: 12,
        category: 'React',
        likes: 76,
        comments: 18,
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop'
      },
      {
        id: '4',
        title: 'The Art of Writing Clean Code',
        excerpt: 'Best practices and principles for writing maintainable and readable code.',
        author: {
          name: 'Emma Davis',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
        },
        publishedAt: '2024-01-12',
        readTime: 10,
        category: 'Programming',
        likes: 124,
        comments: 31,
        image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop'
      }
    ];

    setFeaturedPosts(mockFeaturedPosts);
    setRecentPosts(mockRecentPosts);
  }, []);

  const categories = [
    { name: 'Technology', count: 245, color: 'bg-blue-100 text-blue-800' },
    { name: 'Design', count: 189, color: 'bg-purple-100 text-purple-800' },
    { name: 'Programming', count: 156, color: 'bg-green-100 text-green-800' },
    { name: 'Lifestyle', count: 98, color: 'bg-orange-100 text-orange-800' },
    { name: 'Business', count: 87, color: 'bg-red-100 text-red-800' },
    { name: 'Health', count: 65, color: 'bg-pink-100 text-pink-800' }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Share Your Stories,
              <br />
              <span className="text-blue-200">Inspire Others</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Join a community of writers and readers. Create, discover, and engage with stories that matter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/register">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
                  <PenTool className="h-5 w-5 mr-2" />
                  Start Writing Today
                </Button>
              </Link>
              <Link to="/search">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 text-lg px-8 py-6">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Explore Stories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10,000+</h3>
              <p className="text-gray-600">Stories Published</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">5,000+</h3>
              <p className="text-gray-600">Active Writers</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1M+</h3>
              <p className="text-gray-600">Monthly Readers</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Posts */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Featured Stories</h2>
                <Link to="/search" className="text-blue-600 hover:text-blue-700 flex items-center">
                  See all <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="grid gap-8">
                {featuredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center mb-3">
                          <Badge className={`mr-3 bg-blue-100 text-blue-800`}>
                            {post.category}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.readTime} min read
                          </div>
                        </div>
                        
                        <Link to={`/post/${post.id}`}>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                            {post.title}
                          </h3>
                        </Link>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="h-10 w-10 rounded-full object-cover mr-3"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{post.author.name}</p>
                              <p className="text-sm text-gray-500">{formatDate(post.publishedAt)}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-gray-500">
                            <div className="flex items-center">
                              <Heart className="h-4 w-4 mr-1" />
                              <span className="text-sm">{post.likes}</span>
                            </div>
                            <div className="flex items-center">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              <span className="text-sm">{post.comments}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Recent Posts */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Recent Stories</h2>
                <Link to="/search" className="text-blue-600 hover:text-blue-700 flex items-center">
                  See all <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="grid gap-8">
                {recentPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center mb-3">
                          <Badge className={`mr-3 bg-blue-100 text-blue-800`}>
                            {post.category}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.readTime} min read
                          </div>
                        </div>
                        
                        <Link to={`/post/${post.id}`}>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                            {post.title}
                          </h3>
                        </Link>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="h-10 w-10 rounded-full object-cover mr-3"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{post.author.name}</p>
                              <p className="text-sm text-gray-500">{formatDate(post.publishedAt)}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-gray-500">
                            <div className="flex items-center">
                              <Heart className="h-4 w-4 mr-1" />
                              <span className="text-sm">{post.likes}</span>
                            </div>
                            <div className="flex items-center">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              <span className="text-sm">{post.comments}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Categories */}
            <Card className="mb-8">
              <CardHeader>
                <h3 className="text-xl font-bold text-gray-900">Categories</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={`/search?category=${category.name.toLowerCase()}`}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className={`px-3 py-1 rounded-full text-sm ${category.color}`}>
                        {category.name}
                      </span>
                      <span className="text-gray-500">{category.count}</span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold text-gray-900">Stay Updated</h3>
                <p className="text-gray-600">Get the latest stories delivered to your inbox.</p>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Button className="w-full">Subscribe</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index; 