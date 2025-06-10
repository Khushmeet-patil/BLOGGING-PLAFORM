import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Clock,
  Eye,
  ArrowLeft,
  ThumbsUp,
  Flag,
  MoreHorizontal
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data for the blog post
    const mockPost = {
      id: id || '1',
      title: 'The Future of Web Development: What to Expect in 2024',
      content: `
        <p>Web development is constantly evolving, and 2024 promises to bring some exciting changes to the landscape. From new frameworks to emerging technologies, developers have a lot to look forward to.</p>
        
        <h2>The Rise of Server-Side Rendering</h2>
        <p>Server-side rendering (SSR) has made a significant comeback, with frameworks like Next.js and Nuxt.js leading the charge. The benefits are clear: better SEO, faster initial page loads, and improved user experience.</p>
        
        <blockquote>
          <p>"The future of web development lies in finding the perfect balance between performance and developer experience." - Leading industry expert</p>
        </blockquote>
        
        <h2>WebAssembly's Growing Influence</h2>
        <p>WebAssembly (WASM) is opening doors to running high-performance applications in the browser. We're seeing languages like Rust and Go compile to WASM, bringing near-native performance to web applications.</p>
        
        <h2>The Component-Driven Development Era</h2>
        <p>Component-driven development is becoming the standard approach. Tools like Storybook and design systems are making it easier to build, test, and maintain UI components in isolation.</p>
        
        <ul>
          <li>Improved code reusability</li>
          <li>Better testing capabilities</li>
          <li>Enhanced collaboration between design and development teams</li>
          <li>Consistent user interfaces across applications</li>
        </ul>
        
        <h2>Edge Computing and CDNs</h2>
        <p>Edge computing is revolutionizing how we think about web application deployment. By moving computation closer to users, we can achieve unprecedented levels of performance and user experience.</p>
        
        <p>The integration of edge functions with CDNs like Cloudflare Workers and Vercel Edge Functions is making it possible to run server-side logic at the edge, reducing latency and improving performance globally.</p>
        
        <h2>Conclusion</h2>
        <p>As we move through 2024, these trends will shape how we build and deploy web applications. The focus on performance, developer experience, and user satisfaction will continue to drive innovation in the web development space.</p>
      `,
      author: {
        id: '1',
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612c3c6?w=400&h=400&fit=crop&crop=face',
        bio: 'Senior Frontend Developer at TechCorp. Passionate about React, TypeScript, and modern web technologies.'
      },
      publishedAt: '2024-01-15',
      readTime: 8,
      category: 'Technology',
      tags: ['Web Development', 'Frontend', 'React', 'Performance'],
      likes: 142,
      comments: 23,
      views: 1250,
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&h=600&fit=crop',
      isLiked: false,
      isBookmarked: false
    };

    const mockComments = [
      {
        id: '1',
        author: {
          name: 'Mike Chen',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
        },
        content: 'Great article! I completely agree about the importance of SSR. We\'ve seen significant improvements in our SEO rankings since implementing Next.js.',
        publishedAt: '2024-01-15',
        likes: 12,
        isLiked: false
      },
      {
        id: '2',
        author: {
          name: 'Emma Davis',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
        },
        content: 'WebAssembly is definitely something I want to explore more. Have you worked with any specific WASM frameworks?',
        publishedAt: '2024-01-15',
        likes: 8,
        isLiked: false
      },
      {
        id: '3',
        author: {
          name: 'Alex Rodriguez',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
        },
        content: 'The component-driven development approach has been a game-changer for our team. Storybook integration made our workflow so much smoother.',
        publishedAt: '2024-01-16',
        likes: 5,
        isLiked: false
      }
    ];

    setPost(mockPost);
    setComments(mockComments);
    setIsLoading(false);
  }, [id]);

  const handleLike = () => {
    if (!post) return;
    
    const newLiked = !post.isLiked;
    setPost({
      ...post,
      isLiked: newLiked,
      likes: newLiked ? post.likes + 1 : post.likes - 1
    });

    toast({
      title: newLiked ? "Post liked!" : "Like removed",
      description: newLiked ? "Thanks for showing your support!" : "Like has been removed.",
    });
  };

  const handleBookmark = () => {
    if (!post) return;
    
    const newBookmarked = !post.isBookmarked;
    setPost({
      ...post,
      isBookmarked: newBookmarked
    });

    toast({
      title: newBookmarked ? "Post bookmarked!" : "Bookmark removed",
      description: newBookmarked ? "Post saved to your reading list." : "Post removed from reading list.",
    });
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: post?.title,
        text: 'Check out this interesting article',
        url: window.location.href,
      });
    } catch (err) {
      // Fallback to copying URL
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Post URL has been copied to your clipboard.",
      });
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now().toString(),
      author: {
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
      },
      content: newComment,
      publishedAt: new Date().toISOString(),
      likes: 0,
      isLiked: false
    };

    setComments([comment, ...comments]);
    setNewComment('');

    if (post) {
      setPost({ ...post, comments: post.comments + 1 });
    }

    toast({
      title: "Comment posted!",
      description: "Your comment has been added to the discussion.",
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric' 
    });
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks} weeks ago`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths} months ago`;
    
    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} years ago`;
  };

  if (isLoading || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Article Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover"
          />
          <div className="p-8">
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant="secondary">{post.category}</Badge>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime} min read
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Eye className="h-4 w-4 mr-1" />
                {post.views} views
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <Link
                    to={`/profile/${post.author.id}`}
                    className="font-medium text-gray-900 hover:text-blue-600"
                  >
                    {post.author.name}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {formatDate(post.publishedAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={post.isLiked ? "default" : "outline"}
                  size="sm"
                  onClick={handleLike}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  {post.likes}
                </Button>
                <Button
                  variant={post.isBookmarked ? "default" : "outline"}
                  size="sm"
                  onClick={handleBookmark}
                >
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Comments ({comments.length})
          </h2>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <div className="flex space-x-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
                alt="Your avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <Button type="submit" disabled={!newComment.trim()}>
                    Post Comment
                  </Button>
                </div>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-4">
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">
                          {comment.author.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatTimeAgo(comment.publishedAt)}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={comment.isLiked ? "text-blue-600" : ""}
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {comment.likes}
                      </Button>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail; 