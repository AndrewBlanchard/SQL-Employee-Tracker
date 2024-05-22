const db = require('../db');

async function viewAllRoles() {
  try {
    const [rows] = await db.promise().query(`
      SELECT role.id, role.title, department.name AS department, role.salary
      FROM role
      INNER JOIN department ON role.department_id = department.id
    `);
    console.log('\nAll Roles:');
    console.table(rows);
  } catch (error) {
    console.error('Error viewing roles:', error);
  }
}

async function addRole(title, salary, departmentId) {
  try {
    const [result] = await db.promise().query(
      'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
      [title, salary, departmentId]
    );
    console.log(`\nRole '${title}' added successfully with ID: ${result.insertId}`);
    return result.insertId;
  } catch (error) {
    console.error('Error adding role:', error);
    throw error;
  }
}

module.exports = {
  viewAllRoles,
  addRole,
};