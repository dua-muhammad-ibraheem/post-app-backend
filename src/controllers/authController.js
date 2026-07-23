const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
// ================= REGISTER =================
const registerUser = async (req, res) => {
  try {

     console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= LOGIN =================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const user = await User.findOne({ email });
   console.log("Stored Password:", user.password);
    console.log("User Found:", user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    console.log("Entered Password:", password);
    console.log("Stored Password:", user.password);

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    console.log("Password Match:", isPasswordMatch);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

  const token = jwt.sign(
  {
    id: user._id,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

user.password = undefined;

res.status(200).json({
  success: true,
  message: "Login successful",
  token,
  user,
});
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
