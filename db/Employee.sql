CREATE DATABASE employeesdb;

USE employeesdb;

CREATE TABLE department (
    department_id INT AUTO_INCREMENT,
    role VARCHAR(30),
    PRIMARY KEY (department_id)
);

INSERT INTO department(role)
VALUE ("Sales"), ("Engineering"), ("Finance"), ("Legal");

CREATE TABLE role (
role_id INT AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL(10, 2),
department_id INT,
PRIMARY KEY (role_id)
);

INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 13000, 2), ("Software Engineer", 12000, 2), ("Saleperson", 88000,1), ("Legal Team", 25000, 4), ("lawyer", 2400, 2);

CREATE TABLE employee (
id INT AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT NULL,
manager_id INT NULL,
PRIMARY KEY (id)
);

CREATE TABLE manager (
manager_id INT AUTO_INCREMENT,
manager VARCHAR(30),
PRIMARY KEY (manager_id)
)