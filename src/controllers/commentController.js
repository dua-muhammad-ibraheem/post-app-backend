const Comment = require("../models/commentModel");

// ================= CREATE COMMENT =================
const createComment = async (req, res) => {
   console.log(req.body);
  try {
    const { text } = req.body;
    const { postId } = req.params;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Comment cannot be empty",
      });
    }

    const comment = await Comment.create({
      text,
      post: postId,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET COMMENTS =================
const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({
      post: postId,
    })
      .populate("user", "username profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createComment,
  getComments,
};