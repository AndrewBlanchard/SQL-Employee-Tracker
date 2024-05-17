const db = require('../db');

class DepartmentQueries {
    async getAllDepartments() {
      const [rows] = await db.promise().query('SELECT * FROM department');
      return rows;
    }
  
    async addDepartment(name) {
      const [result] = await db.promise().query('INSERT INTO department (name) VALUES (?)', [name]);
      return result.insertId;
    }
  }

module.exports = {
    viewAllDepartments: new DepartmentQueries().getAllDepartments,
    addDepartment: new DepartmentQueries().addDepartment,
  };
