const { Pool } = require('pg');

// Create a new pool instance with the database connection configuration
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Export the pool instance for use within the api callback functions
module.exports = pool;


