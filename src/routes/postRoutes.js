const express = require("express");
const router = express.Router();

const {
  createPost,
  getPosts,
  deletePost,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

router.post("/create", protect, createPost);

router.get("/", getPosts);

router.delete("/:id", protect, deletePost);
module.exports = router;