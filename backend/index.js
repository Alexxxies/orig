const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql =require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());

//connect Mysqldb
const db =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database:'southern_jade_db',
    port: 3306
});

//check database connection

db.connect(err => {
    if(err){console.log('err')}
    console.log('Database Successfully Connected!')
})
 
//get all data 
app.get('/admins',(req,res)=>{
    //console.log('Get all admins');
    let  qrr= `SELECT * FROM admin`
    db.query(qrr,(err,results)=> {
        if(err){
          console.log(err,'errs');  
        }
        if(results.length>0){
            res.send({
                message:'All admins data',
                data:results
            });
        };
    });
});


// get single data by ID

app.get('/admins/:Admin_ID',(req,res)=>{
    //console.log(req.params.Admin_ID);
    let qrId = req.params.Admin_ID;
    let qr = `SELECT * FROM admin where Admin_ID = ${qrId}`
    db.query(qr,(err,results)=>{
        if(err){
            console.log(err);
        }
        if(results.length>0)
        {
            res.send({
                message:"Get data by ID",
                data:results
            })
        } else{
            res.send({
                message:"Data not found"
            })
        }
    })
})

//DISPLAY DATA
app.post('/admins',(req,res)=>{
    //console.log(req.body,'Succesfully Display Data');
    let Username = req.body.Username;
    let Email = req.body.Email; 
    let qr = `insert into admin(Username,Email) 
    value('${Username}','${Email}')`;
    db.query(qr,(err,results)=>{
        if(err){console.log(err)}
        // if(results.length>0){
        //     res.send({
        //          message:"Successfully created"
        //     });
        // }else{
        //     res.send({
        //         message:"Something wrong.."
        //     })
        // }
        res.send({
            message:"Datta added succesfully",
            data:results
        })
    })
})


//Updata data 
app.put('/admins/:Admin_ID',(req,res)=>{
    //console.log(req.body,"updated data")
    
    let uID = req.params.Admin_ID;
    let Username = req.body.Username;
    let Email = req.body.Email; 
    let Password = req.body.Password;

    let qr = `UPDATE admin set Username = '${Username}', 
    Email = '${Email}', Password = '${Password}' where Admin_ID = ${uID}`;
    db.query(qr, (err, results)=>{
        if (err) {console.log(err) }
        res.send({
            message:"Updated Succesfully",
            data:results
        })
    })
})

//Delete data
app.delete('/admins/:Admin_ID', (req,res)=>{
    let uID= req.params.Admin_ID;
    let qr = `delete from admin where Admin_ID ='${uID}'`;
    db.query(qr,(err,results)=>{
        if(err){console.log(err)}
        res.send({
            message:"Succes fully Deleted"
        })
    })
})




app.listen(3000, ()=>{
    console.log("Server is running on 3000 PORT");

})