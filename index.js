const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');
require("dotenv").config();

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL Username
    user: process.env.DB_USER,
    // TODO: Add MySQL Password
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log(`Connected to the company_db database.`)
);

db.query('SELECT * FROM company_db', function (err, results) {
  console.log(results);
});


const menu = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'menu',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
      }
    ])
    .then((data) => {
      if (data.menu === "View All Employees") {
        getEmp().then((employeeData) => {
          console.table(employeeData[0])
          menu();
        })
      } else if (data.menu === 'Add Employee') {
        addEmp().then((empData) => {
          console.table(empData[0])
          menu();
        })
      } else if (data.menu === 'Update Employee Role') {
        updateRole().then((emplData) => {
          console.table(emplData[0])
          menu();
        })
      } else if (data.menu === "View All Roles") {
        getRole().then((roleData) => {
          console.table(roleData[0])
          menu();
        })
      } else if (data.menu === 'Add Role') {
        addRole().then((rolData) => {
          console.table(rolData[0])
          menu();
        })
      } else if (data.menu === "View All Departments") {
        getDepartment().then((deptData) => {
          console.table(deptData[0])
          menu();
        })
      } else if (data.menu === 'Add Department') {
        addDept().then((depData) => {
          console.table(depData[0])
          menu();
        })
      }
    });
};

const getEmp = () => {
  return db.promise().query('SELECT * FROM employee;')
};

const getRole = () => {
  return db.promise().query('SELECT * FROM role;')
};

const getDepartment = () => {
  return db.promise().query('SELECT * FROM departments;')
};


const addEmp = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'empId',
        message: 'What is the new employees id?',
      },
      {
        type: 'input',
        name: 'firstName',
        message: 'What is the new employees first name?',
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'What is the new employees last name?',
      },
      {
        type: 'input',
        name: 'empRole',
        message: 'What is the new employees role_id?',
      },
      {
        type: 'input',
        name: 'empMan',
        message: 'What is the managers id for this employee?',
      }
    ]).then((data) => {
      return db.promise().query('INSERT INTO employees (id, first_name, last_name, role_id, manager_id) VALUES' + (data.empId, data.firstName, data.lastName, data.empRole, data.empMan))
    })
};

const updateRole = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'roleEmp',
        message: 'What is the employees id?',
      },
      {
        type: 'input',
        name: 'empRole',
        message: 'What is the employees new role id?',
      },
    ])
    .then((data) => {
      return db.promise().query('UPDATE employee SET role_id = ' + (data.empRole) + ' WHERE id = ' + (data.roleEmp))
    })
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'newId',
        message: 'What is the new role id?',
      },
      {
        type: 'input',
        name: 'newTitle',
        message: 'What is the new title?',
      },
      {
        type: 'input',
        name: 'newSalary',
        message: 'What is the salary?',
      },
      {
        type: 'input',
        name: 'newRole',
        message: 'What is the department id?',
      },
    ])
    .then((data) => {
      return db.promise().query('INSERT INTO role (id, title, salary, department_id) VALUES ' + (data.newId, data.newTitle, data.newSalary, data.newRole))
    })
};

const addDept = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'newDept',
        message: 'What is the new department?',
      },
      {
        type: 'input',
        name: 'newDeptId',
        message: 'What is the new department id?',
      },
    ])
    .then((data) => {
      return db.promise().query('INSERT INTO department (id, name) VALUES '(data.newDeptId, data.newDept))
    })
};



menu();


