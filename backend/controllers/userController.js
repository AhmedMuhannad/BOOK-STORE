const User = require("../models/user");
const jwt = require("jsonwebtoken");

// const generateToken = require("../utils/generateToken");
exports.authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    // set jwt as http-only cookie
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      _id: user._id,
      accessToken,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).json({
      status: "failed",
    });
  }
};

exports.authRefreshToken = async (req, res) => {
  console.log("Cookies received:", req.cookies); // Debug: see all cookies
  console.log("Refresh token:", req.cookies.refresh_token); // Debug: specific cookie

  const { refresh_token } = req.cookies;
  if (!refresh_token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(refresh_token, process.env.JWT_SECRET);
    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "user already exist." });
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "user have been created",
    });
  }
  // res.send("register user")
};

exports.logoutUser = async (req, res) => {
  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({ message: "logout user" });
};

exports.getUserProfile = async (req, res) => {
  res.send("get user");
};

exports.updateUserProfile = async (req, res) => {
  res.send("update user");
};

exports.getUsers = async (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      code: "It is working",
    },
  });
};

exports.deleteUser = async (req, res) => {
  res.send("delete users");
};

exports.getUserById = async (req, res) => {
  res.send("get user by id");
};
