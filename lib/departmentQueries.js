const db = require('../db');

async function viewAllDepartments() {
  try {
    const [rows] = await db.promise().query('SELECT * FROM department');
    console.log('\nAll Departments:');
    console.table(rows);
  } catch (error) {
    console.error('Error viewing departments:', error);
  }
}

async function addDepartment(name) {
  try {
    const [result] = await db.promise().query('INSERT INTO department (name) VALUES (?)', [name]);
    console.log(`\nDepartment '${name}' added successfully with ID: ${result.insertId}`);
    return result.insertId;
  } catch (error) {
    console.error('Error adding department:', error);
    throw error;
  }
}

module.exports = {
  viewAllDepartments,
  addDepartment,
};