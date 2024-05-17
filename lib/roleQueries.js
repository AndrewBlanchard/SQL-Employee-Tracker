const db = require('../db');
class RoleQueries {
    async getAllRoles() {
      const [rows] = await db.promise().query(`
        SELECT role.id, role.title, department.name AS department, role.salary
        FROM role
        INNER JOIN department ON role.department_id = department.id
      `);
      return rows;
    }
  
    async addRole(title, salary, departmentId) {
      const [result] = await db.promise().query(
        'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
        [title, salary, departmentId]
      );
      return result.insertId;
    }
  }

module.exports = {
    viewAllRoles: new RoleQueries().getAllRoles,
    addRole: new RoleQueries().addRole,
  };