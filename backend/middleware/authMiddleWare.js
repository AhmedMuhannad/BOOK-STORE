const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

exports.protect = async (req, res, next) => {
    try {
        let token;
        token = req.cookies.jwt;
        
        if (!token) {
            return res.status(401).json({ 
                message: "Not authorized, no token provided" 
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Find user and exclude password field
            req.user = await User.findById(decoded.userId).select("-password");
            
            if (!req.user) {
                return res.status(401).json({ 
                    message: "Not authorized, user not found" 
                });
            }
            
            next();
        } catch (jwtError) {
            console.error("JWT verification error:", jwtError.message);
            return res.status(401).json({ 
                message: "Not authorized, token failed" 
            });
        }
    } catch (err) {
        console.error("Auth middleware error:", err.message);
        return res.status(500).json({ 
            message: "Server error in authentication" 
        });
    }
};

exports.admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(401).json({ 
            message: "Not authorized as admin" 
        });
    }
};