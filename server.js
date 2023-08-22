const inquirer = require('inquirer');
const mysql = require('mysql2');
const fs = require('fs/promises');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Chagolon1!',
        database: 'positions_db'
    },
    console.log('Connected to positions_db database.')
);

db.promise().query('SELECT * FROM positions_db')
.then((rows)=> console.log(rows))
.catch((err)=>console.log(err));



// db.promise().query('SELECT department_name FROM department')
// .then((name)=>{
//     let departmentArray = []
//     name[0].forEach(element =>{
//         departmentArray.push(element.department_name)
//     });
//     console.log(departmentArray)
// }) 
// .catch((err)=>console.log(err));


const inputs = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ["View all Departments", 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role',
        'Add an Employee', 'Add and Employee Role', 'Quit'],
        name: "startOptions"
    },
    {
        type:'input',
        message: 'Enter the name of the Department',
        name: 'inputDepartmentName',
        when: (response)=>(response.startOptions === 'Add a Department')
    },
    {
        type:'input',
        message: 'Enter the name of the Role',
        name: 'inputRoleName',
        when: (response)=>(response.startOptions === 'Add a Role')
    },
]

