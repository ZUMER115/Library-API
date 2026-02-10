const router = require('express').Router();

const {
    registerUser,
    loginUser
} = require("../controllers/auth.controllers.js");

// Router for handling user registration 
router.post('/register', registerUser);

// Router for handling user login
router.post('/login', loginUser);

module.exports = router;