const Post = require('../models/Post');

// Create a post
exports.createPost = async (req, res) => {
  const { title, content, image, category } = req.body;
  try {
    const newPost = await Post.create({
      title,
      content,
      image,
      category,
      author: req.user._id,
    });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: 'Post creation failed', error: err.message });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name email').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch posts', error: err.message });
  }
};

// Get single post by ID
exports.getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch post', error: err.message });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  const { title, content, image, category } = req.body;
  try {
    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, image, category },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Post update failed', error: err.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Post deletion failed', error: err.message });
  }
};

// Like a post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (!post.likes.includes(req.user._id)) {
      post.likes.push(req.user._id);
    } else {
      post.likes.pull(req.user._id);
    }

    await post.save();
    res.json({ message: 'Post liked/unliked', likes: post.likes.length });
  } catch (err) {
    res.status(500).json({ message: 'Like action failed', error: err.message });
  }
};

// Comment on a post
exports.commentPost = async (req, res) => {
  const { comment } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.comments.push({ text: comment, author: req.user._id });
    await post.save();
    res.json({ message: 'Comment added' });
  } catch (err) {
    res.status(500).json({ message: 'Comment action failed', error: err.message });
  }
};
