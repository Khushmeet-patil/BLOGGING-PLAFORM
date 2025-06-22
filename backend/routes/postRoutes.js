const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
  likePost,
  commentPost
} = require('../controllers/postController');

// Public Routes
router.get('/', getAllPosts);
router.get('/:id', getSinglePost);

// Protected Routes
router.post('/', authMiddleware, createPost);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);
router.post('/like/:id', authMiddleware, likePost);
router.post('/comment/:id', authMiddleware, commentPost);

module.exports = router;
