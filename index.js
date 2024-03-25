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
      console.log('Department Added successfully!');
      questionUser();
    });
  });
}

function addingRole(res) { // Assuming `res` is passed as a parameter
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What role will you like to add?',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter Salary',
    },
    {
      type: 'list',
      name: 'department',
      message: 'Enter Department Please',
      choices: res.map((department) => department.name)
    },
  ]).then(answer => {
    const department = res.find(department => department.name === answer.department);
    const query = 'INSERT INTO role SET ?';
    connection.query(
      query,
      {
        title: answer.title,
        salary: answer.salary,
        department_id: department,
      },
      (err, res) => {
        if (err) throw err;
        console.log('Role added successfully!');
        questionUser();
      }
    );
  });
}
function addingEmployee() {
  connection.query("SELECT id, title FROM role", (err, results) => {
    if (err) {
      console.error(err);
      return;
    }

    const roles = results.map(({ id, title }) => ({
      name: title,
      value: id,
    }));
    connection.query(
      'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee',
      (err, results) => {
        if (err) {
          console.error(err);
          return;
        }

        inquirer
          .prompt([
            {
              type: "input",
              name: "first_name",
              message: "Enter the employee's first name",
            },
            {
              type: "input",
              name: "last_name",
              message: "Enter the employee's last name",
            },
            {
              type: "list",
              name: "role_id",
              message: "Enter the employee's role",
              choices: roles,
            },
          ])
          .then((answers) => {
            const sql =
              "INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)";
            const values = [
              answers.first_name,
              answers.last_name,
              answers.role_id,
            ];
            connection.query(sql, values, (err) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log('Employee Added successfully!');
              questionUser();
            });
          })
          .catch((err) => {
            console.error(err);
          });
      })
  })
}

function updatingEmployee() {
  connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee", (err, results) => {
    if (err) {
      console.error(err);
      return;
    }

    const employees = results.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'employee_id',
        message: 'Select the employee you will like to update:',
        choices: employees,
      },
      {
        type: 'input',
        name: 'new_first_name',
        message: 'Enter the new first name :',
      },
      {
        type: 'input',
        name: 'new_last_name',
        message: 'Enter the new last name :',
      },
    
    ])
    .then(answers => {
      const { employee_id, new_first_name, new_last_name, new_role_id } = answers;
      let sql = 'UPDATE employee SET ';
      const values = [];

      if (new_first_name) {
        sql += 'first_name = ?, ';
        values.push(new_first_name);
      }
      if (new_last_name) {
        sql += 'last_name = ?, ';
        values.push(new_last_name);
      }

      // Remove trailing comma and space
      sql = sql.replace(/,\s*$/, '');

      sql += ' WHERE id = ?';
      values.push(employee_id);

      connection.query(sql, values, (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Employee updated successfully!');
        questionUser();
      });
    })
    .catch(err => {
      console.error(err);
    });
  });
}

function updatingEmployeeDepartment() {
  connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee", (err, employeesResult) => {
    if (err) {
      console.error(err);
      return;
    }

    const employees = employeesResult.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    connection.query("SELECT id, name FROM department", (err, departmentsResult) => {
      if (err) {
        console.error(err);
        return;
      }

      const departments = departmentsResult.map(({ id, name }) => ({
        name: name,
        value: id,
      }));

      inquirer.prompt([
        {
          type: 'list',
          name: 'employee_id',
          message: 'Select the employee whose department you want to update:',
          choices: employees,
        },
        {
          type: 'list',
          name: 'new_department_id',
          message: 'Select the new department for the employee:',
          choices: departments,
        },
      ])
      .then(answers => {
        const { employee_id, new_department_id } = answers;
        const sql = 'UPDATE employee SET department_id = ? WHERE id = ?';
        const values = [new_department_id, employee_id];

        connection.query(sql, values, (err, result) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log('Employee department updated successfully!');
          questionUser();
        });
      })
      .catch(err => {
        console.error(err);
      });
    });
  });
}