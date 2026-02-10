const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/connection.js');


const registerUser = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400).json({message: `Bad request: Please fill out both email and password fields`});
    }
    const existing = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existing.rows.length !== 0) {
        res.status(400).json({message: `User with email ${email} already exists`});
    }
    const hashed_password = await bcrypt.hash(password, 10);
    const newUser = await db.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *", [email, hashed_password]);
    return res.status(201).json(newUser.rows[0]);
};

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400).json({message: `Bad request: Please fill out both email and password fields`});
    }
    const existing = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existing.rows.length === 0) {
        res.status(400).json({message: `User with email ${email} does not exist`});
    }
    const user = existing.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        res.status(400).json({message: `Incorrect password`});
    }
    const token = jwt.sign(
        {user_id: user.id},       // Payload of the token (Just includes the user id for now)
        process.env.JWT_SECRET,   // Secret key for signing the token (stored in .env file)
        {expiresIn: '1h'}         // Option for the token (an expiration rule for 1 hour)
    );
    return res.status(200).json({token});
};

module.exports = {
    registerUser,
    loginUser
};