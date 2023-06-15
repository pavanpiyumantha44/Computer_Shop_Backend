const mysql = require('mysql');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'computer_shop'
});

if(db)
{
    console.log("Database is connected!!");
}

module.exports = db;