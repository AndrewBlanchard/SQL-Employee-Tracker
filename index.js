const inquirer = require('inquirer');
const db = require('./db');

// Function to prompt the user with the main menu options
async function promptUser() {
    const { choice } = await inquirer.prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit',
        ],
      },
    ]);
  
    switch (choice) {
      case 'View all departments':
        viewAllDepartments();
        break;
      case 'View all roles':
        viewAllRoles();
        break;
      case 'View all employees':
        viewAllEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      case 'Exit':
        db.end(); // Close the database connection
        console.log('Goodbye!');
        return;
    }
  }

  // Function to view all departments
function viewAllDepartments() {
    db.query('SELECT * FROM department', (err, results) => {
        if (err) {
          console.error('Error retrieving departments:', err);
          return;
        }
    console.log('View all departments');
    promptUser();
    });
  }
  
  // Function to view all roles
  function viewAllRoles() {
    db.query(`
      SELECT role.id, role.title, department.name AS department, role.salary
      FROM role
      INNER JOIN department ON role.department_id = department.id
    `, (err, results) => {
      if (err) {
        console.error('Error retrieving roles:', err);
        return;
      }
      console.table(results);
      promptUser();
    });
  }
  
 // Function to view all employees
function viewAllEmployees() {
    db.query(`
      SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    `, (err, results) => {
      if (err) {
        console.error('Error retrieving employees:', err);
        return;
      }
      console.table(results);
      promptUser();
    });
  }
  
  
  // Function to add a department
async function addDepartment() {
    const { name } = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:',
      },
    ]);
  
    db.query('INSERT INTO department (name) VALUES (?)', [name], (err, result) => {
      if (err) {
        console.error('Error adding department:', err);
        return;
      }
      console.log('Department added successfully!');
      promptUser();
    });
  }
  
// Function to add a role
async function addRole() {
    const departments = await db.promise().query('SELECT * FROM department');
  
    const { title, salary, departmentId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the role:',
      },
      {
        type: 'number',
        name: 'salary',
        message: 'Enter the salary for the role:',
      },
      {
        type: 'list',
        name: 'departmentId',
        message: 'Select the department for the role:',
        choices: departments[0].map((department) => ({
          name: department.name,
          value: department.id,
        })),
      },
    ]);
  
    db.query(
      'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
      [title, salary, departmentId],
      (err, result) => {
        if (err) {
          console.error('Error adding role:', err);
          return;
        }
        console.log('Role added successfully!');
        promptUser();
      }
    );
  }
  
  // Function to add an employee
async function addEmployee() {
    const roles = await db.promise().query('SELECT * FROM role');
    const employees = await db.promise().query('SELECT * FROM employee');
  
    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter the first name of the employee:',
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter the last name of the employee:',
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Select the role for the employee:',
        choices: roles[0].map((role) => ({
          name: role.title,
          value: role.id,
        })),
      },
      {
        type: 'list',
        name: 'managerId',
        message: 'Select the manager for the employee:',
        choices: [
          { name: 'None', value: null },
          ...employees[0].map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          })),
        ],
      },
    ]);
  
    db.query(
      'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
      [firstName, lastName, roleId, managerId],
      (err, result) => {
        if (err) {
          console.error('Error adding employee:', err);
          return;
        }
        console.log('Employee added successfully!');
        promptUser();
      }
    );
  }
  
  
  // Function to update an employee role
async function updateEmployeeRole() {
    const employees = await db.promise().query('SELECT * FROM employee');
    const roles = await db.promise().query('SELECT * FROM role');
  
    const { employeeId, roleId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Select the employee to update:',
        choices: employees[0].map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        })),
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Select the new role for the employee:',
        choices: roles[0].map((role) => ({
          name: role.title,
          value: role.id,
        })),
      },
    ]);
  
    db.query(
      'UPDATE employee SET role_id = ? WHERE id = ?',
      [roleId, employeeId],
      (err, result) => {
        if (err) {
          console.error('Error updating employee role:', err);
          return;
        }
        console.log('Employee role updated successfully!');
        promptUser();
      }
    );
  }
  
  // Start the application
  promptUser();
  
db.query('SELECT * FROM department', (err, results) => {
    if (err) {
      console.error('Error retrieving departments:', err);
      return;
    }
    console.table(results);
  promptUser();
});