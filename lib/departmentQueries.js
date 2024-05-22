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
async function updateDepartment(departmentId, newName) {
  try {
    const [result] = await db.promise().query('UPDATE department SET name = ? WHERE id = ?', [newName, departmentId]);
    if (result.affectedRows === 0) {
      console.log(`\nDepartment with ID ${departmentId} not found.`);
    } else {
      console.log(`\nDepartment with ID ${departmentId} updated successfully to '${newName}'.`);
    }
    return result.affectedRows;
  } catch (error) {
    console.error('Error updating department:', error);
    throw error;
  }
}

module.exports = {
  viewAllDepartments,
  addDepartment,
  updateDepartment,
};