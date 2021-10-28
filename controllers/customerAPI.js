const express = require('express');
const router = express.Router();
const CustModel = require('../models/customer');

// URL :- localhost:5000/cust/register  (USING POSTMAN POST)
/*
{
  "custid":500,
  "name":"Sachin22",
  "mobile":1234567890,
  "addr":"Mumbai",
}

*/

router.post('/register', (req, res) => {

    const custobj = new CustModel({
        custid: req.body.custid,
        name: req.body.name,
        mobile: req.body.mobile,
        addr: req.body.addr,
    });
    custobj.save()
        .then(inserteddocument => {
            res.status(200).send('DOCUMENT INSERED IN MONGODB DATABASE' + '<br\>' + inserteddocument);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'Error in Customer Save ' })
        });
});

// BROWSER URL :- localhost:5000/cust/viewall 

router.get('/viewall', (req, res) => {
    CustModel.find()
        .then(getalldocumentsfrommongodb => {
            res.status(200).send(getalldocumentsfrommongodb);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'Error in Fetch Customer ' })
        });
});

// localhost:5000/cust/search/10

router.get('/search/:custid', (req, res) => {
    CustModel.find({ "custid": parseInt(req.params.custid) })
        .then(getsearchdocument => {
            if (getsearchdocument.length > 0) {
                res.send(getsearchdocument);
            }
            else {
                return res.status(404).send({ message: "Note not found with id " + req.params.custid });
            }
        }) 
        .catch(err => {
            return res.status(500).send({ message: "DB Problem..Error in Retriving with id " + req.params.custid });
        })
});

router.get('/searchbyname/:name', (req, res) => {
    CustModel.find({ "name": req.params.name })
        .then(getsearchdocument => {
            if (getsearchdocument.length > 0) {
                res.send(getsearchdocument);
            }
            else {
                return res.status(404).send({ message: "Note not found with id " + req.params.name });
            }
        }) 
        .catch(err => {
            return res.status(500).send({ message: "DB Problem..Error in Retriving with id " + req.params.name });
        })
});

module.exports = router;