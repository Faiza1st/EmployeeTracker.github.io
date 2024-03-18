const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Maffnjan74@',
  database: 'employees_db'
});

connection.connect(err => {
  if (err) throw err;
  console.log('connected as id' + connection.threadID);
  afterConnection();
});

const afterConnection = () => {
  console.log("*****************************************************")
  console.log("*                                                   *")
  console.log("*                  Employee Manager                 *")
  console.log("*                                                   *")
  console.log("*****************************************************")
  questionUser();
};

function questionUser() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'WHAT WILL YOU LIKE TO DO?',
      choices: ['View all departments',
        'View all employees',
        'View all roles',
        'Add a department',
        'Add an employee',
        'Add a role',
        'Update an employee',
        'Update an employee role',
        'Update an employee manager',
        'Update an employee department',
        'Exit'
      ]
    }]).then(answer => {
      const { choice } = answer;
      switch (choice) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addingDepartment();
          break;
        case 'Add a role':
          addingRole();
          break;
        case 'Add an employee':
          addingEmployee();
          break;
        case 'Update an employee':
          updatingEmployee();
          break; // Added case for Update an employee
        case 'Update an employee role':
          updatingEmployeeRole();
          break;
        case 'Update an employee manager':
          updatingManager();
          break;
        case 'Update an employee department':
          updatingEmployeeDepartment();
          break;
        case 'Exit':
          console.log("Exit Application");
          return;
      }
    });
};

function viewDepartments() {
  console.log('Showing All Departments');
  const query = 'SELECT * FROM department';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    questionUser();
  });
}

function viewEmployees() {
  console.log('Showing all Employees');
  const query = 'SELECT * FROM employee';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    questionUser();
  });
}

function viewRoles() {
  console.log('Showing all Roles');
  const query = 'SELECT * FROM role';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    questionUser();
  });
}

function addingDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'addingDep',
      message: 'What department will you like to add?',
    }
  ]).then(answer => {
    const query = `INSERT INTO department (name) VALUES ("${answer.addingDep}")`; 
    connection.query(query, (err, res) => {
      if (err) throw err;
      questionUser();
    });
  });
}

