const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const {
  createPost,
  getPosts,
  getMyPosts,
  updatePost,
  deletePost,
  likePost,
} = require("../controllers/postController");

const { protect } = require("../middleware/authMiddleware");

router.post(
  "/create",
  protect,
  upload.single("image"),
  createPost
);

router.get("/myposts", protect, getMyPosts);

router.get("/", getPosts);

router.put("/:id", protect, updatePost);

router.delete("/:id", protect, deletePost);

router.put("/like/:id", protect, likePost);

module.exports = router;