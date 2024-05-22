const db = require('../db');

async function viewAllEmployees() {
  try {
    const [rows] = await db.promise().query(`
      SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    `);
    console.log('\nAll Employees:');
    console.table(rows);
  } catch (error) {
    console.error('Error viewing employees:', error);
  }
}

async function addEmployee(firstName, lastName, roleId, managerId) {
  try {
    const [result] = await db.promise().query(
      'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
      [firstName, lastName, roleId, managerId]
    );
    console.log(`\nEmployee '${firstName} ${lastName}' added successfully with ID: ${result.insertId}`);
    return result.insertId;
  } catch (error) {
    console.error('Error adding employee:', error);
    throw error;
  }
}

async function updateEmployeeRole(employeeId, roleId) {
  try {
    const [result] = await db.promise().query(
      'UPDATE employee SET role_id = ? WHERE id = ?',
      [roleId, employeeId]
    );
    console.log(`\nEmployee with ID ${employeeId} updated successfully with new role ID: ${roleId}`);
    return result.affectedRows;
  } catch (error) {
    console.error('Error updating employee role:', error);
    throw error;
  }
}

module.exports = {
  viewAllEmployees,
  addEmployee,
  updateEmployeeRole,
};