require('dotenv').config();  // Load environment variables
const express = require('express');
const pool = require('./database');  // PostgreSQL connection file

const app = express();

app.use(express.json());  // Parse JSON bodies

// Example route
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce Backend!');
});

// Database-related route (example)
app.get('/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
