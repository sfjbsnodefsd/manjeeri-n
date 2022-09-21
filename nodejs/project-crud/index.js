const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser')

app.use(bodyparser.json())

var mysqlConnection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "root",
    database : "employeedb"
})

mysqlConnection.connect((err) => {
    if(!err){
        console.log('successful connection')
    }else{
        console.log('connection failed')
    }
})

app.listen(3000,()=> console.log('Express running at http://localhost:3000'))

app.get('/getemployees',(req,res)=>{
    mysqlConnection.query("select * from employee",(err, rows, fields) => {
        if(!err){
            console.log(rows)
        } else{
            console.log(err)
        }
    })
})

// get employee details by id

app.get('/getemployee/:id', (req,res) => {
    mysqlConnection.query("select * from employee where empid = ?", [req.params.id] ,(err,rows,fields)=>{
        if(!err){
            console.log(rows)
        } else{
            console.log(err)
        }
    })
})

// delete employee by id
app.delete('/deleteEmployee/:id', (req,res) => {
    mysqlConnection.query('delete from employee where empid = ?', [req.params.id] ,(err,rows,fields) => {
        if(!err){
           res.send('Employee deleted successfully.')
        } else{
            console.log(err)
        }
    })
})