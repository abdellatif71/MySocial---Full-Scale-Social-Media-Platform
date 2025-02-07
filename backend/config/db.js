const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // Dein MySQL Benutzername (standardmäßig 'root')
  password: '',         // Dein MySQL Passwort (leer lassen, wenn kein Passwort gesetzt ist)
  database: 'social_media_db'  // Name deiner Datenbank
});

db.connect((err) => {
  if (err) {
    console.error('Fehler bei der Datenbankverbindung:', err);
    return;
  }
  console.log('Mit der Datenbank verbunden!');
});

module.exports = db;
