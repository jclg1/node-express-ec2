// Import necessary modules
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;

// MySQL Database Connection
const connection = mysql.createConnection({
  host: 'bikestore.cpncjvcbypex.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'password',
  database: 'bikestoredb',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Define your API routes here
app.get('/api/data', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
