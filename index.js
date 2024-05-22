const inquirer = require('inquirer');
const db = require('./db');
const { viewAllDepartments, addDepartment } = require('./lib/departmentQueries');
const { viewAllRoles, addRole } = require('./lib/roleQueries');
const { viewAllEmployees, addEmployee, updateEmployeeRole } = require('./lib/employeeQueries');

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
      await viewAllDepartments();
      break;
    case 'View all roles':
      await viewAllRoles();
      break;
    case 'View all employees':
      await viewAllEmployees();
      break;
      case 'Add a department':
        const { departmentName } = await inquirer.prompt([
          {
            type: 'input',
            name: 'departmentName',
            message: 'Enter the department name:',
            validate: (input) => {
              if (input.trim() === '') {
                return 'Please enter a valid department name.';
              }
              return true;
            },
          },
        ]);
        await addDepartment(departmentName);
        break;
    case 'Add a role':
      const { title, salary, departmentId } = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the role title:',
          validate: (input) => {
            if (input.trim() === '') {
              return 'Please enter a valid role title.';
            }
            return true;
          },
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the role salary:',
          validate: (input) => {
            if (isNaN(input) || parseFloat(input) <= 0) {
              return 'Please enter a valid salary.';
            }
            return true;
          },
        },
        {
          type: 'input',
          name: 'departmentId',
          message: 'Enter the department ID:',
          validate: (input) => {
            if (isNaN(input) || parseInt(input) <= 0) {
              return 'Please enter a valid department ID.';
            }
            return true;
          },
        },
      ]);

      await addRole(title, salary, departmentId);
      break;
    case 'Add an employee':
      const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        {
          type: 'input',
          name: 'firstName',
          message: 'Enter the employee\'s first name:',
          validate: (input) => {
            if (input.trim() === '') {
              return 'Please enter a valid first name.';
            }
            return true;
          },
        },
        {
          type: 'input',
          name: 'lastName',
          message: 'Enter the employee\'s last name:',
          validate: (input) => {
            if (input.trim() === '') {
              return 'Please enter a valid last name.';
            }
            return true;
          },
        },
        {
          type: 'input',
          name: 'roleId',
          message: 'Enter the employee\'s role ID:',
          validate: (input) => {
            if (isNaN(input) || parseInt(input) <= 0) {
              return 'Please enter a valid role ID.';
            }
            return true;
          },
        },
        {
          type: 'input',
          name: 'managerId',
          message: 'Enter the employee\'s manager ID (leave blank if none):',
          validate: (input) => {
            if (input.trim() !== '' && (isNaN(input) || parseInt(input) <= 0)) {
              return 'Please enter a valid manager ID or leave it blank.';
            }
            return true;
          },
        },
      ]);
      await addEmployee(firstName, lastName, roleId, managerId || null);
      break;
    case 'Update an employee role':
      const { employeeId, newRoleId } = await inquirer.prompt([
        {
          type: 'input',
          name: 'employeeId',
          message: 'Enter the ID of the employee you want to update:',
          validate: (input) => {
            if (isNaN(input) || parseInt(input) <= 0) {
              return 'Please enter a valid employee ID.';
            }
            return true;
          },
        },
        {
          type: 'input',
          name: 'newRoleId',
          message: 'Enter the new role ID for the employee:',
          validate: (input) => {
            if (isNaN(input) || parseInt(input) <= 0) {
              return 'Please enter a valid role ID.';
            }
            return true;
          },
        },
      ]);
      await updateEmployeeRole(employeeId, newRoleId);
      break;

    case 'Exit':
      db.end(); // Close the database connection
      console.log('Goodbye!');
      return;
  }

  const { updateDepartment } = require('./lib/departmentQueries');

// Update department with ID 1 to have a new name
updateDepartment(1, 'New Department Name')
  .then((affectedRows) => {
    console.log(`\n${affectedRows} department(s) updated.`);
  })
  .catch((error) => {
    console.error('Error updating department:', error);
  });

  promptUser();
}

// Start the application
promptUser();