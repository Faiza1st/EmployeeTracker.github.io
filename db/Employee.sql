DROP DATABASE IF EXIST employeesdb;
CREATE DATABASE employeesdb;

USE employeesdb;

-- Create the department table with primary key department_id
CREATE TABLE department (
    department_id INT AUTO_INCREMENT,
    role VARCHAR(30) NOT NULL,
    PRIMARY KEY (department_id)
);

INSERT INTO department(role)
VALUE ("Sales"), ("Engineering"), ("Finance"), ("Legal");

-- Create the role table reference department id
CREATE TABLE role (
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10, 2),
    department_id INT,
    PRIMARY KEY (id)
    REFERENCES department(id) 
    ON DELETE SET NULL 
);


-- Create the employee table and the interconnection to role id
CREATE TABLE employee (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    INDEX role_ind (role_id),
    CONSTRAINT fk_role 
    FOREIGN KEY (role_id) 
    REFERENCES role(id) 
    ON DELETE SET NULL,
);
-- Create the manager table and connect the reference to employee id
CREATE TABLE manager (
    manager_id INT AUTO_INCREMENT,
    manager VARCHAR(30),
    PRIMARY KEY (manager_id)
    FOREIGN KEY (manager_id) 
    REFERENCES employee(id) 
    ON DELETE SET NULL
)