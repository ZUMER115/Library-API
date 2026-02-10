// Add express framework to 'express' variable and create our server within the 'app' variable
const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT;

// Middleware for parsing JSON request bodies
app.use(express.json());

// Import and use the game routes for all requests to '/games' resource 
app.use('/games', require('./routes/game_routes.js'));

// Import and use the auth routes for all requests to '/auth' resource
app.use('/auth', require('./routes/auth_routes.js'));



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
