const router = require('express').Router();
// Import controller callback functions for CRUD operations
const {
    getAllGames,
    createGame,
    updateGame,
    deleteGame
} = require('../controllers/game_controller.js');


// CRUD routes for games
router.get('/', getAllGames);
router.post('/', createGame);
router.put('/:id', updateGame);
router.delete('/:id', deleteGame);

// Export the router instance for use within server.js
module.exports = router;
