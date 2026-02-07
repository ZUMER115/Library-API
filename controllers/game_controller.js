const db = require('../db/connection.js');

// Get all games
const getAllGames = async (req, res) => {
    const query = await db.query('SELECT * FROM games ORDER BY id ASC');
    return res.status(200).json(query.rows);
};

// Create a new game
const createGame = async (req, res) => {
    const { game, developer, release_date } = req.body;
    if (!game || !developer || !release_date) {
        return res.status(400).json({message: `Bad request. Please include all fields (game, developer, release_date).`});
    }
    const query = await db.query(`INSERT INTO games (game, developer, release_date) VALUES ($1, $2, $3) RETURNING *`, [game, developer, release_date]);
    return res.status(201).json(query.rows[0]);
};

// Update an existing game
const updateGame = async (req, res) => {
    const { id } = req.params;
    const { game, developer, release_date } = req.body;
    
    if (!game || !developer || !release_date) {
        return res.status(400).json({message: `Bad request: Please include all fields (game, developer, release_date).`});
    }
    const query = await db.query(`UPDATE games SET game = $1, developer = $2, release_date = $3 WHERE id = $4 RETURNING *`, [game, developer, release_date, id]);
    if (query.rows.length === 0) {
        return res.status(404).json({message: `Game with id ${id} not found.`});
    }
    return res.status(200).json(query.rows[0]);

};

// Delete an existing game
const deleteGame = async (req, res) => {
    const { id } = req.params;
    const query = await db.query(`DELETE FROM games WHERE id = $1 RETURNING *`, [id]);
    if (query.rows.length === 0) {
        return res.status(404).json({message: `Game with id ${id} not found.`});
    }
    return res.status(200).json(query.rows[0]);

};

module.exports = {
    getAllGames,
    createGame,
    updateGame,
    deleteGame
};