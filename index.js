const db = require('./db');

db.query('SELECT * FROM department', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    console.log('Query results:', results);
  });