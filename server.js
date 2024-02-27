const express = require('express');
const { default: inquirer } = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');

const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Maffnjan74@',
      database: 'employee_db'
    });

    connection.connect(err => {
        if (err) throw err;
        console.log('connected as id' + connection.threadID);
        afterConnection();
    });

afterConnection = () => {
    console.log("*****************************************************")
    console.log("*                                                   *")
    console.log("*                  Employee Manager                 *")
    console.log("*                                                   *")
    console.log("*****************************************************")
    userPrompt();
};

const userPrompt = () => {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'choice',
            massage: 'WHAT WILL YOU LIKE TO DO?',
            choices: [ 'View all departments',
            'View all employees',
            'View all roles',
            'Add a department',
            'Add a employye',
            'Add a role',
            'Update an employee',
            'Update an employee role',
            'Update an employee manager',
            'Update an employee department',
            'Exit']
        }
    ]) .then(answers => {
        const {choices} = answers;
        if (choices === "View all departments") {
            showDepartments();
          }
          if (choices === "View all roles") {
            showRoles();
          }
          if (choices === "View all employees") {
            showEmployees();
          }
          if (choices === "Add a department") {
            addDepartment();
          }
          if (choices === "Add a role") {
            addRole();
          }
          if (choices === "Add an employee") {
            addEmployee();
          }
          if (choices === "Update an employee role") {
            updateEmployee();
          }
          if (choices === "Update an employee manager") {
            updateManager();
          }
          if (choices === "View employees by department") {
            employeeDepartment();
          }
           switch(answers.option) {
            case 'Exit':
            // Exit the application
            console.log("Exiting application...");
            return;
    }});
};