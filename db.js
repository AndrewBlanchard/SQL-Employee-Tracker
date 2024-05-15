const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'pass',
    database: 'employee_db',
  });

  // Test the connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Export the connection
module.exports = connection;