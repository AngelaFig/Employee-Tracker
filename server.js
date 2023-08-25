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

// db.promise().query('SELECT * FROM department')
// .then((rows)=> console.log(rows))
// .catch((err)=>console.log(err));


const inputs = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ["View all Departments",'Add a Department', 'View all Roles','Add a Role', 'View all Employees',
        'Add an Employee', 'Add an Employee Role', 'Quit'],
        name: "startOptions"
    },
    // {
    //     type:'input',
    //     message: 'Enter the name of the Department',
    //     name: 'inputDepartmentName',
    //     when: (response)=>(response.startOptions === 'Add a Department')
    // },
    // {
    //     type:'input',
    //     message: 'Enter the name of the Role',
    //     name: 'inputRoleName',
    //     when: (response)=>(response.startOptions === 'Add a Role')
    // },
];

function startQuestions(){
    return inquirer.prompt(inputs).then((response)=>{
        if(response.startOptions === 'Quit'){
            return console.log('No further Question');
        }
        else if(response.startOptions === "View all Departments") {
            viewDepartments();
        }
        else if(response.startOptions ==='Add a Department'){
            addDepartment()
        }
        else if(response.startOptions ==='View all Roles'){
            viewRoles()
        }
        else if(response.startOptions ==='Add a Role'){
            addRole()
        }
        else if(response.startOptions ==='View all Employees'){
            viewEmployees()
        }
        else if(response.startOptions ==='Add an Employee'){
            addEmployee()
        }
        else if(response.startOptions ==='Add an Employee Role'){
            addEmployeeRole()
        }
        else{
            console.log(response)
            return startQuestions();
        }
    });
}

function viewDepartments(){
    db.query('SELECT * FROM department',(err,res)=>{
        if(err) throw err
        console.table(res)
        startQuestions();
    })
}


function viewRoles(){
    db.query('SELECT * FROM role',(err,res)=>{
        if(err) throw err
        console.table(res)
        startQuestions();
    })
}

function viewEmployees(){
    db.query('SELECT * FROM employee',(err,res)=>{
        if(err) throw err
        console.table(res)
        startQuestions();
    })
}

function addDepartment(){
    inquirer.prompt([
        {
        type:'input',
        message: 'Enter the name of the Department',
        name: 'inputDepartmentName',
    },
    ]).then((data)=>{
        db.query('INSERT into department SET ?', 
        {
            name: data.inputDepartmentName
        })
        console.log('department successfully added!')
        startQuestions();
    })
}

function addRole(){
    db.query('SELECT * FROM department',(err, res)=>{
        if(err) throw err
        inquirer.prompt([
            {
                type: 'input',
                name: 'roleTitle',
                message: 'Add Role Title'
             },
             {
                type: 'input',
                name: 'salary',
                message: 'Add Salary'
             },
             {
                type:'list',
                name:'departmentOptions',
                message: 'Select Department to add Role',
                choices:res.map(department => department.name)
             }

        ]).then(data =>{
            // takes answer from departmentOptions questions and finds a matching department name in res, converts back to
            // object with its id
            let chosenDepartment = res.find(department => department.name === data.departmentOptions)
            db.query('INSERT INTO role SET ?',{
                
                title: data.roleTitle,
                salary:data.salary,
                department_id: chosenDepartment.id
            })
            startQuestions();
        })
    })
}

// function addEmployee(){
//     db.query('SELECT * FROM role',(err, res)=>{
//         if(err) throw err
//         inquirer.prompt([
//             {
//                 type: 'input',
//                 name: 'employeeName',
//                 message: 'Add Employee Name'
//              },
//              {
//                 type: 'input',
//                 name: 'salary',
//                 message: 'Add Salary'
//              },
            //  {
            //     type:'list',
            //     name:'departmentOptions',
            //     message: 'Select Department to add Role',
            //     choices:res.map(department => department.name)
            //  }

    //     ]).then(data =>{
    //         // takes answer from departmentOptions questions and finds a matching department name in res, converts back to
    //         // object with its id
    //         let chosenDepartment = res.find(department => department.name === data.departmentOptions)
    //         db.query('INSERT INTO role SET ?',{
                
    //             title: data.employeeName,
    //             salary:data.salary,
    //             department_id: chosenDepartment.id
    //         })
    //         startQuestions();
    //     })
    // })
// }

startQuestions();