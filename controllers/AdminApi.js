const express = require('express');
const router = express.Router();
const RegModel = require('../models/registration_schema')
const ImgModel = require('../models/images_schema.js')
const ContModel = require('../models/contactUs_schema')


router.get('/viewalluser',(req , res)=>{
RegModel.find()
.then(user =>{
    res.status(200).send(user);
})
.catch(err =>{
    res.status(500).send({ message: err.message || 'Error in Fetch Users ' })
})


router.delete('/remove/:nid', (req, res) => {
    RegModel.findOneAndRemove({ "email": req.params.nid })
        .then(deleteddocument => {
            if (deleteddocument != null) { 
                res.status(200).send('DOCUMENT DELETED successfully!' + deleteddocument);
            }
            else {
                res.status(404).send('INVALID EMAIL ID ' + req.params.nid);
            }
        })
        .catch(err => {
            return res.status(500).send({ message: "DB Problem..Error in Delete with id " + req.params.nid });
        })
})


router.get("/ViewallUserImg",(req, res) => {
    ImgModel.find()
        .then((getalldocumentsfrommongodb) => {
          res.status(200).send(getalldocumentsfrommongodb);
        }) //CLOSE THEN
        .catch((err) => {
          res
            .status(500)
            .send({ message: err.message || "Error in Fetch User Images " });
        }); //CLOSE CATCH
    } //CLOSE CALLBACK FUNCTION BODY Line 110
  );

  router.get('/allquery', (req, res) => {
    ContModel.find()
          .then(getalldocumentsfrommongodb => {
                res.status(200).send(getalldocumentsfrommongodb);
          }) //CLOSE THEN
          .catch(err => {
                res.status(500).send({ message: err.message || 'Error in Fetch Employee ' })
          });//CLOSE CATCH
} //CLOSE CALLBACK FUNCTION BODY Line 110      
);//CLOSE GET METHOD Line 109

router.get('/search/:empid', (req, res) => {
    // "empid" : parseInt(req.params.empid) Convert empid String to Int
    RegModel.find({ "email": (req.params.empid) },
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

})



module.exports = router;