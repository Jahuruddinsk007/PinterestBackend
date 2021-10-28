// IMPORT EXPRESS SERVER
const { request } = require('express');
const express = require('express');

// USE Router FOR EXPRESS SERVER
const router = express.Router();

//IMPORT EMPLOYEE MODEL AND BIND IT
//const EmpModel = require('../models/employee_model');
const EmpModel = require('../models/employee_schema');

// URL :- localhost:4500/emp/register  (USING POSTMAN POST)
/*
{
  "empname": "Chandan",
  "empemail": "chan@gmail.com",
  "empmobile": "9831125144",
  "empdob": "05/09/1984",
  "emppass": "abcd",
  "empgender": "Male",
  "empcountry": "India",
  "empaddress": "Kol",
}
*/
// post is used to INSERT DOCUMENT/RECORD
// CALLBACK using lambda 
router.post('/register', (req, res) => {

  //Create Object of Employee Model Class
  // And Receive value from request body and Store value within the Object
  const empobj = new EmpModel({
    empname: req.body.empname,
    empemail: req.body.empemail,
    empmobile: req.body.empmobile,
    empdob: req.body.empdob,
    emppass: req.body.emppass,
    empgender: req.body.empgender,
    empcountry: req.body.empcountry,
    empaddress: req.body.empaddress,
  });//CLOSE EmpModel
  //INSERT/SAVE THE RECORD/DOCUMENT
  empobj.save()
    .then(inserteddocument => {
      res.status(200).send('DOCUMENT INSERED IN MONGODB DATABASE' + '<br\>' + inserteddocument);
    })//CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Employee Save ' })
    });//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY Line 27
);//CLOSE POST METHOD Line 26





// router.post('/login1', (req, res) => {
//   // console.log(req.body.empemail)
//   console.log("hi")
//   console.log(req.body.emppass)

//   EmpModel.find({ "empemail": req.body.empemail })
//     .then(getsearchdocument => {
//       if (getsearchdocument.length > 0) {
//         res.send(getsearchdocument);
//       }
//       else {
//         return res.status(200).send({ message: "Note not found with id " + req.body.empemail });
//       }
//     }) //CLOSE THEN
//     .catch(err => {
//       return res.status(500).send({ message: "DB Problem..Error in Retriving with id " + req.body.empemail });
//     })
  
// }//CLOSE CALLBACK FUNCTION BODY Line 27
// );



router.post('/login', (req, res) => {
  // console.log(req.body.userid);
  EmpModel.find({ "empemail": req.body.empemail })
      .then(getsearchdocument => {
          if (getsearchdocument.length > 0) {
              // console.log(getsearchdocument);
              res.send(getsearchdocument);
          }
          else {
              return res.status(404).send({ message: "Email-Id : " + req.body.empemail + " not found" });
          }
      })
      .catch(err => {
          console.log(err);
          return res.status(500).send({ message: "DB Problem..Error in Retriving with id " + req.body.empemail });
      })
})




// => localhost:4500/emp/remove/30     (USING POSTMAN DELETE)
//DELETE A DOCUMENT FROM MONGODB USING EMPID
//EmpModel.findOneAndRemove({"empid" : parseInt(req.params.empid)})

// => localhost:4500/emp/remove/abc@gmail.com     (USING POSTMAN DELETE)
//DELETE A DOCUMENT FROM MONGODB USING EMAILID
router.delete('/remove/:emailid', (req, res) => {
  EmpModel.findOneAndRemove({ "empemail": req.params.emailid })
    .then(deleteddocument => {
      if (deleteddocument != null) {
        res.status(200).send('DOCUMENT DELETED successfully!' + deleteddocument);
      }
      else {
        res.status(404).send('INVALID EMP ID ' + req.params.empid);
      }
    }) //CLOSE THEN
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in Delete with id " + req.params.empid });
    })//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY Line 60
); //CLOSE Delete METHOD Line 59


// localhost:4500/emp/10
//SEARCH EMPLOYEE BY EMPID
// "empid" : parseInt(req.params.empid) Convert empid String to Int
// EmpModel.find({"empid" : parseInt(req.params.empid)})

// localhost:4500/emp/abc@gmail.com
//SEARCH EMPLOYEE BY EMPEMAIL
// CALLBACK function for get method using lambda 
// router.get('/search/:emailid', (req, res) => {
//   EmpModel.find({ "empemail": req.params.emailid })
//     .then(getsearchdocument => {
//       if (getsearchdocument.length > 0) {
//         res.send(getsearchdocument);
//       }
//       else {
//         return res.status(404).send({ message: "Note not found with id " + req.params.empid });
//       }
//     }) //CLOSE THEN
//     .catch(err => {
//       return res.status(500).send({ message: "DB Problem..Error in Retriving with id " + req.params.empid });
//     })//CLOSE CATCH


    

// }//CLOSE CALLBACK FUNCTION BODY Line 88
// );//CLOSE GET METHOD Line 87 

router.get('/login', (req, res) => {
  // console.log(req.body.userid);
  EmpModel.find({ "empemail": req.params.emailid })
      .then(getsearchdocument => {
          if (getsearchdocument.length > 0) {
              // console.log(getsearchdocument);
              res.send(getsearchdocument);
          }
          else {
              return res.status(404).send({ message: "Email-Id : " + req.body.userid + " not found" });
          }
      })
      .catch(err => {
          console.log(err);
          return res.status(500).send({ message: "DB Problem..Error in Retriving with id " + req.body.userid });
      })
})


// BROWSER URL :- localhost:4500/emp 
// get IS USED FOR FETCHING DOCUMENTS FROM MONGODB
// CALLBACK using lambda 
router.get('/', (req, res) => {
  EmpModel.find()
    .then(getalldocumentsfrommongodb => {
      res.status(200).send(getalldocumentsfrommongodb);
    }) //CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Fetch Employee ' })
    });//CLOSE CATCH
} //CLOSE CALLBACK FUNCTION BODY Line 110      
);//CLOSE GET METHOD Line 109  




//SHOULD BE EXPORTED
module.exports = router;