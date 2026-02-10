const router = require('express').Router();

const { authenticateToken } = require('../middleware/auth.middleware.js');

// Import controller callback functions for CRUD operations
const {
    getAllGames,
    createGame,
    updateGame,
    deleteGame
} = require('../controllers/game_controller.js');

router.use(authenticateToken); // Apply the authentication middleware to all routes in this router, so that only authenticated users can access these routes

// CRUD routes for games
router.get('/', getAllGames);
router.post('/', createGame);
router.put('/:id', updateGame);
router.delete('/:id', deleteGame);

// Export the router instance for use within server.js
module.exports = router;
