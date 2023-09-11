const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3001;

// Use CORS middleware
app.use(cors());

// Initialize database
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQLite database.');
});

// Create table
db.run('CREATE TABLE clicks (count INT)', (err) => {
  if (err) {
    return console.error(err.message);
  }
  // Initialize count to 0
  db.run('INSERT INTO clicks (count) VALUES (?)', [0]);
});

// Get click count
app.get('/clicks', (req, res) => {
  db.get('SELECT count FROM clicks', [], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ count: row.count });
  });
});

// Update click count
app.post('/clicks/:action', (req, res) => {
  const action = req.params.action;
  if (action !== 'increment' && action !== 'decrement') {
    return res.status(400).json({ error: 'Invalid action' });
  }

  db.get('SELECT count FROM clicks', [], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const newCount = action === 'increment' ? row.count + 1 : row.count - 1;
    db.run('UPDATE clicks SET count = ?', [newCount], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ count: newCount });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
