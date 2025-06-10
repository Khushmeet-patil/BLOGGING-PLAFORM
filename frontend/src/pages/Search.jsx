import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search as SearchIcon, 
  Filter, 
  Clock, 
  Heart, 
  MessageCircle,
  User,
  BookOpen,
  TrendingUp
} from 'lucide-react';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('relevance');
  const [filterType, setFilterType] = useState('all');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    'all',
    'Technology',
    'Design',
    'Programming',
    'React',
    'Node.js',
    'JavaScript',
    'Web Development',
    'Mobile',
    'AI/ML',
    'Career',
    'Tutorial'
  ];

  const popularSearches = [
    'React hooks',
    'JavaScript ES6',
    'Web performance',
    'CSS Grid',
    'Node.js API',
    'TypeScript',
    'React Native',
    'GraphQL'
  ];

  useEffect(() => {
    const query = searchParams.get('q');
    const cat = searchParams.get('category');
    
    if (query) {
      setSearchQuery(query);
      performSearch(query, cat || 'all');
    } else if (cat && cat !== 'all') {
      setCategory(cat);
      performSearch('', cat);
    }
  }, [searchParams]);

  const performSearch = async (query, selectedCategory) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock search results
    const mockResults = [
      {
        id: '1',
        type: 'post',
        title: 'Getting Started with React Server Components',
        excerpt: 'Learn how to implement and use React Server Components in your next project. This comprehensive guide covers everything from basic setup to advanced patterns.',
        author: {
          name: 'Sarah Johnson',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612c3c6?w=400&h=400&fit=crop&crop=face'
        },
        publishedAt: '2024-01-15',
        readTime: 12,
        category: 'React',
        likes: 89,
        comments: 23,
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop'
      },
      {
        id: '2',
        type: 'author',
        title: 'Mike Chen',
        author: {
          name: 'Mike Chen',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
        },
        publishedAt: '2024-01-10',
        category: 'Technology',
        likes: 0,
        comments: 0,
        followerCount: 1234,
        postCount: 45
      },
      {
        id: '3',
        type: 'post',
        title: 'Building Scalable APIs with Node.js and Express',
        excerpt: 'Discover best practices for creating robust and scalable APIs using Node.js and Express. Includes examples and real-world scenarios.',
        author: {
          name: 'Alex Rodriguez',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
        },
        publishedAt: '2024-01-13',
        readTime: 8,
        category: 'Node.js',
        likes: 67,
        comments: 15,
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop'
      },
      {
        id: '4',
        type: 'post',
        title: 'Modern CSS Grid Layout Techniques',
        excerpt: 'Master CSS Grid with practical examples and learn how to create responsive layouts that work across all devices.',
        author: {
          name: 'Emma Davis',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
        },
        publishedAt: '2024-01-11',
        readTime: 6,
        category: 'Design',
        likes: 54,
        comments: 9,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop'
      }
    ];

    // Filter results based on search criteria
    let filteredResults = mockResults;
    
    if (query) {
      filteredResults = filteredResults.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.excerpt?.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      filteredResults = filteredResults.filter(result =>
        result.category === selectedCategory
      );
    }

    if (filterType !== 'all') {
      filteredResults = filteredResults.filter(result => result.type === filterType);
    }

    setResults(filteredResults);
    setIsLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (category !== 'all') params.set('category', category);
    setSearchParams(params);
    performSearch(searchQuery, category);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (newCategory !== 'all') params.set('category', newCategory);
    setSearchParams(params);
    performSearch(searchQuery, newCategory);
  };

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {searchQuery ? `Search results for "${searchQuery}"` : 'Explore Content'}
          </h1>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for posts, authors, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
          </form>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="post">Posts</SelectItem>
                <SelectItem value="author">Authors</SelectItem>
              </SelectContent>
            </Select>

            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Popular Searches */}
        {!searchQuery && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Searches</h2>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <Button
                  key={term}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery(term);
                    const params = new URLSearchParams();
                    params.set('q', term);
                    setSearchParams(params);
                    performSearch(term, category);
                  }}
                >
                  {term}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {results.length > 0 ? (
              results.map((result) => (
                <Card key={result.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    {result.type === 'post' ? (
                      <div className="flex">
                        <div className="w-1/3">
                          <img
                            src={result.image}
                            alt={result.title}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                        <div className="w-2/3 pl-6">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="secondary">{result.category}</Badge>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              {result.readTime} min read
                            </div>
                          </div>
                          
                          <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            <Link to={`/post/${result.id}`} className="hover:text-blue-600">
                              {result.title}
                            </Link>
                          </h2>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {result.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <img
                                src={result.author.avatar}
                                alt={result.author.name}
                                className="w-8 h-8 rounded-full"
                              />
                              <span className="text-sm font-medium text-gray-900">
                                {result.author.name}
                              </span>
                              <span className="text-sm text-gray-500">
                                {formatDate(result.publishedAt)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 text-gray-500">
                              <div className="flex items-center">
                                <Heart className="h-4 w-4 mr-1" />
                                <span className="text-sm">{result.likes}</span>
                              </div>
                              <div className="flex items-center">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                <span className="text-sm">{result.comments}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img
                            src={result.author.avatar}
                            alt={result.author.name}
                            className="w-16 h-16 rounded-full"
                          />
                          <div>
                            <h2 className="text-xl font-semibold text-gray-900">
                              <Link to={`/profile/${result.id}`} className="hover:text-blue-600">
                                {result.title}
                              </Link>
                            </h2>
                            <div className="flex items-center space-x-4 mt-1">
                              <div className="flex items-center text-sm text-gray-500">
                                <User className="h-4 w-4 mr-1" />
                                {result.followerCount} followers
                              </div>
                              <div className="flex items-center text-sm text-gray-500">
                                <BookOpen className="h-4 w-4 mr-1" />
                                {result.postCount} posts
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Follow
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search; 