const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');  // Importiere die DB-Verbindung

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/posts', (req, res) => {
  const sql = 'SELECT * FROM posts ORDER BY created_at DESC';
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Fehler beim Abrufen der Posts:', err);
      res.status(500).json({ message: 'Fehler beim Abrufen der Posts' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Route zum Empfangen und Speichern von Posts
app.post('/posts', (req, res) => {
  const { content } = req.body;

  if (content) {
    const postQuery = 'INSERT INTO posts (user_id, content) VALUES (?, ?)';
    
    // Aktuell setzen wir user_id = 1 (später dynamisch durch Login ersetzen)
    db.query(postQuery, [1, content], (err, result) => {
      if (err) {
        console.error('Fehler beim Einfügen des Posts:', err);
        res.status(500).json({ message: 'Fehler beim Speichern des Posts!' });
      } else {
        res.status(201).json({ 
          message: 'Post erfolgreich gespeichert!',
          postId: result.insertId,
          content
        });
      }
    });
  } else {
    res.status(400).json({ message: 'Post-Inhalt fehlt!' });
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
