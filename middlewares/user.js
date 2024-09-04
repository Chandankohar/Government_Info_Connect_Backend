const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

// Checks user is logged in based on passed token and set the user in request
exports.isLoggedIn = async (req, res, next) => {
    // token could be found in request cookies or in reqest headers
    const token = req.cookies.usertoken || req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Login first to access this page',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        // Handle JWT verification error
        console.error('user JWT verification error:', error);
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
        });
    }
};
exports.adminisLoggedIn = async (req, res, next) => {
    const token = req.cookies.admintoken || req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Login first to access this page',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = await Admin.findById(decoded.id);
        next();
    } catch (error) {
        // Handle JWT verification error
        console.error('admin JWT verification error:', error);
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
        });
    }
};

