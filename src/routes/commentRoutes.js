const express = require("express");
const router = express.Router();

const {
  createComment,
  getComments,
} = require("../controllers/commentController");

const { protect } = require("../middleware/authMiddleware");

// Add Comment
router.post("/:postId", protect, createComment);

// Get All Comments of a Post
router.get("/:postId", getComments);

module.exports = router;