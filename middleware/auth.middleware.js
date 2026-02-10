// Code that handles the authorization of users using JWT tokens (Generated in controllers/auth.controllers.js) and checks if the token is valid for protected routes

// Each protected route will use this middleware upon each request to check if the user is authorized to access the route/resource (ie. if they have a valid token)

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization; // The authorization header is sent by the client in the request headers and should contain the token in the form "Bearer token"
    if (!authHeader) {
        return res.status(401).json({message: `Unauthorized: No token provided`});
    }
    const token = authHeader.split(' ')[1]; // The token is expected to be in the form "Bearer token", so within the authorization header, we split the string by space and take the token part.
    try {
        jwt.verify(token, process.env.JWT_SECRET); // Compares the token with the secret key to check validity
        next(); // If the token is valid, we call next() to continue to the next middleware in the stack
    } catch (err) {
        return res.status(403).json({message: `Forbidden: You shall not pass! Invalid token ${token}`});
    }
};

module.exports = {authenticateToken};