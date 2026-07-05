const { protect } = require("../middleware/authMiddleware");

const express = require("express");
const router = express.Router();

const { createPost } = require("../controllers/postController");

router.post("/create", protect, createPost);

module.exports = router;