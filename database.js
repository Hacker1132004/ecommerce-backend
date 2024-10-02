const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // This will be provided by Render
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;
