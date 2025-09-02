const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.refresh_token;

    console.log("Access token from cookie:", token); // Debugging line
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // This contains user data including _id
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};
module.exports = { authenticate };
