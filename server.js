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
)