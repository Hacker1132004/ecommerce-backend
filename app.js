require('dotenv').config();
const express = require('express');
const app = express();

// Your routes and middleware here

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
