let express = require('express');
let mysql = require('mysql');
var mycrypto=require('crypto');
var key="password";
var algo='aes256';
var jwt=require('jsonwebtoken');
var jwtkey='jwtkey';


let app = express();
app.use(express.json());
let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "react_db_gmit",
});

//for signup in mysql
// app.post("/newsignup",async (req,res)=>{
// let {email, mobile, password} = req.body;

// db.query('INSERT INTO gmit2018cse (email, mobile, password) VALUES (?,?,?)',
// [email, mobile, password],
// (err,result)=>{
//     if(err){
//         res.status(422).send({err:err})
//     }else{
//         res.status(201).send({message:'Your data inserted succesfully'})
//     }
// })
// });


// for signup using encryption

app.post("/newsignup",async (req,res)=>{
let {email, mobile, password} = req.body;
var myCipher= mycrypto.createCipher(algo,key);

    // encrypt the password Advanced Encryption Standard 256 using UTF8 & hex 


    var encpassword=myCipher.update(password,'utf8','hex')
    +myCipher.final('hex');

    db.query('INSERT INTO gmit2018cse (email, mobile, password) VALUES (?,?,?)',
    [email, mobile, encpassword],
    (err,result)=>{
        if(err){
            res.status(422).send({err:err})
        }else{
            res.status(201).send({message:'Your data inserted succesfully'});
            console.log("SignupSucessful"); 
        }
    });
      

    });

    app.listen(4550,()=>{
        console.log("server is running on port 4550");
        })