const Post = require("../models/postModel");

const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const post = await Post.create({
      title,
      description,
      user: "6a4924376a454956ad54d93d", // hina User ID
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPost,
};