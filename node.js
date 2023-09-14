// Import necessary modules
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser'); // Import body-parser
const app = express();
const port = process.env.PORT || 3306;

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

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
app.post('/api/insert-data', (req, res) => {
  const { description, color, dateIn, receiptNote } = req.body;

  const query = 'INSERT INTO work_orders (description, color, dateIn, receiptNote) VALUES (?, ?, ?, ?)';
  const values = [description, color, dateIn, receiptNote];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into the database:', err);
      res.status(500).json({ error: 'Database error' });
      return;
    }

    res.json({ message: 'Data inserted successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
