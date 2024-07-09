const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Create a connection pool using mysql2
const pool = mysql.createPool({
  connectionLimit: 10, // Adjust based on your application's needs
  host: 'localhost',
  user: 'root',
  password: 'mysql12345',
  database: 'students'
});

// Route to fetch data from MySQL using connection pool
app.get('/', (req, res) => {
  const query = 'SELECT * FROM student1';
  pool.query(query, (err, data) => {
    if (err) {
      console.error('Error querying MySQL: ' + err.stack);
      return res.status(500).json({ error: 'Error querying database' });
    }
    res.json(data);
  });
});

// Route to insert data into MySQL using connection pool
app.post('/create', (req, res) => {
  const values = [req.body.name, req.body.email];
  const query = 'INSERT INTO student1 (`name`, `email`) VALUES (?, ?)';
  pool.query(query, values, (err, data) => {
    if (err) {
      console.error('Error querying MySQL: ' + err.stack);
      return res.status(500).json({ error: 'Error querying database' });
    }
    res.json(data);
  });
});

// Route to update data in MySQL using connection pool
app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const query = 'UPDATE student1 SET `name` = ?, `email` = ? WHERE `id` = ?';
  const values = [name, email, id];
  
  pool.query(query, values, (err, data) => {
    if (err) {
      console.error('Error querying MySQL: ' + err.stack);
      return res.status(500).json({ error: 'Error querying database' });
    }
    res.json(data);
  });
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM student1 WHERE id = ?;';
  const values = [id];
  
  pool.query(query, values, (err, data) => {
    if (err) {
      console.error('Error querying MySQL: ' + err.stack);
      return res.status(500).json({ error: 'Error querying database' });
    }
    res.json(data);
  });
});

app.listen(8080, () => {
  console.log("Server has been started");
});
