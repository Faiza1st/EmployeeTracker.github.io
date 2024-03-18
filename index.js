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
