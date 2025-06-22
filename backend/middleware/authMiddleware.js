const jwt = require('jsonwebtoken');
const User = require('../models/User'); // adjust path

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("🔐 Incoming Token:", authHeader); // 👀 Log

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or malformed token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
