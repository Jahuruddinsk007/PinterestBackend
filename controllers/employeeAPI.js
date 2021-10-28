// IMPORT EXPRESS SERVER
const express = require('express');

// USE Router FOR EXPRESS SERVER
const router = express.Router();

//IMPORT EMPLOYEE MODEL AND BIND IT
const EmpModel = require('../models/employee_model');
//const EmpModel = require('../models/employee_schema');

// URL :- localhost:3000/emp/register  (USING POSTMAN POST)
/*
{
  "empid":500,
  "name":"Sachin22",
  "position":"Captain",
  "office":"Mumbai",
  "salary":300000
}
*/
// post is used to INSERT DOCUMENT/RECORD
// CALLBACK using lambda 



router.post('/register', (req, res) => {
  //Create Object of Employee Model Class
  // And Receive value from request body and Store value within the Object
  var empobj = new EmpModel({
    empid: req.body.empid,
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary,
  });
  //INSERT/SAVE THE RECORD/DOCUMENT
  empobj.save((err, inserteddocument) => {
    if (!err) {
      res.send('DOCUMENT INSERED IN MONGODB DATABASE' + '<br\>' + inserteddocument);
    }
    else {
      console.log('Error in Employee Save :' + JSON.stringify(err, undefined, 2));
    }
  });
});



// router.post('/register', (req, res) => {
//   UserModel.find({$or:[{ "email": req.body.uemail },{"mobile":req.body.umobile}]})
//       .then(response => {
//           if (response.length > 0) {
//               return res.send({message:"Email Id or Mobile No Already exits in our Database Please Register with Other Credentials"})
//           }
//           else {
//               const UserObj = new UserModel({
//                   name: req.body.uname,
//                   email: req.body.uemail,
//                   mobile: req.body.umobile,
//                   dob: req.body.udob,
//                   gender: req.body.ugender,
//                   password: req.body.upass,
//                   status: 0,
//               })
//               UserObj.save()
//                   .then(inserteddocument => {
//                       res.status(200).send({message:"Registration Successfull"});
//                   })
//                   .catch(err => {
//                       res.status(500).send({ message: err.message || 'Error in User Save ' })
//                   });
//           }
//       })
//       .catch(err => {
//           console.log(err)
//       })

// });


 
// BROWSER URL :- localhost:3000/emp/viewall 
// get IS USED FOR FETCHING DOCUMENTS FROM MONGODB
// CALLBACK using lambda 
router.get('/viewall', (req, res) => {
  EmpModel.find((err, getalldocumentsfrommongodb) => {
    if (!err) {
      res.send(getalldocumentsfrommongodb);
    }
    else {
      console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2));
    }
  });
});

// localhost:3000/emp/search/10
//SEARCH EMPLOYEE BY EMPID
// CALLBACK function for get method using lambda 
router.get('/search/:empid', (req, res) => {
  // "empid" : parseInt(req.params.empid) Convert empid String to Int
  EmpModel.find({ "empid": parseInt(req.params.empid) },
    // CALLBACK function for find method using lambda 
    (err, getsearchdocument) => {
      if (!err) { //Check Document find or not using document length
        if (getsearchdocument.length > 0)
          res.send(getsearchdocument);
        else
          res.send('INVALID EMP ID');
      }
      else {
        console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2));
      }
    });
});


//SHOULD BE EXPORTED
module.exports = router;