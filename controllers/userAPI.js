const express = require('express');
const router = express.Router();
const UserModel = require('../models/registration_schema');
const ImagesModel = require('../models/images_schema');
const ContactUsModel = require('../models/contactUs_schema');



var nodemailer = require("nodemailer");


var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "jskmacookair007@gmail.com",
        pass: "Jahir@001",
    },
});



router.post('/register', (req, res) => {
    UserModel.find({ $or: [{ "email": req.body.uemail }, { "mobile": req.body.umobile }] })
        .then(response => {
            if (response.length > 0) {
                return res.send({ message: "Email Id or Mobile No Already exits in our Database Please Register with Other Credentials" })
            }
            else {
                const UserObj = new UserModel({
                    name: req.body.uname,
                    email: req.body.uemail,
                    mobile: req.body.umobile,
                    img_path: req.body.img_path,
                    dob: req.body.udob,
                    gender: req.body.ugender,
                    password: req.body.upass
                })

                var mailOptions = {
                    from: "jskmacookair007@gmail.com",
                    to: req.body.uemail,
                    subject: "Registration Sucessfull",
                    text: " your email : " + req.body.uemail + " and your password is : " + req.body.upass,
                };


                UserObj.save()
                    .then(inserteddocument => {
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                                res.status(200).send("errokkshr");
                            } else {
                                // console.log('Email sent: ' + info.response);
                                res.status(200).send({ message: "Registration Successfull and mail send sucessfully" });
                            }
                        });
                    })
                    .catch(err => {
                        res.status(500).send({ message: err.message || 'Error in User Save ' })
                    });
            }
        })
        .catch(err => {
            console.log(err)
        })

});



router.post('/login', (req, res) => {
    // console.log(req.body.userid);
    UserModel.find({ "email": req.body.userid })
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

router.post('/upload', (req, res) => {
    // console.log(req.body.descrip);
    const ImgObj = new ImagesModel({
        title: req.body.title,
        catagory: req.body.catagory,
        descrip: req.body.descrip,
        img_path: req.body.img_path,
        authorid: req.body.authorid,
        authorname: req.body.authorname,
        authoremail: req.body.authoremail
        
    })
    ImgObj.save()
        .then(inserteddocument => {
            res.status(200).send('IMAGE INSERED IN MONGODB DATABASE' + '<br\>' + inserteddocument);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'Error in Image Upload ' })
        });

});



router.post('/contactUs', (req, res) => {
    const ContactUsObj = new ContactUsModel({
        vname: req.body.vname,
        vmobile: req.body.vmobile,
        vemail: req.body.vemail, 
        vcomment: req.body.vcomment
        
    })
    ContactUsObj.save()
        .then(inserteddocument => {
            res.status(200).send('Your query is submited! Thank You😊' + '<br\>' + inserteddocument);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'Error in server' })
        });

});



router.get('/searchimg/:catagory', (req, res) => {
    ImagesModel.find({ "catagory": req.params.catagory })
        .then(getsearchdocument => {
            if (getsearchdocument.length > 0) {
                res.send(getsearchdocument);
            }
            else {
                return res.status(404).send({ message: "Note not found with id " + req.params.catagory });
            }
        })
        .catch(err => {
            return res.status(500).send({ message: "DB Problem..Error in Retriving with id " + req.params.catagory });
        })
}
);



router.get("/ViewallUserImg", (req, res) => {
    ImagesModel.find()
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


router.get('/viewall:uid', (req, res) => {
    ImagesModel.find({ "authorid": req.params.uid })
        .then(getalldocumentsfrommongodb => {
            res.status(200).send(getalldocumentsfrommongodb);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'Error in Fetch Images ' })
        })
})

router.delete('/remove/:nid', (req, res) => {
    ImagesModel.findOneAndRemove({ "_id": req.params.nid })
        .then(deleteddocument => {
            if (deleteddocument != null) {
                res.status(200).send('DOCUMENT DELETED successfully!' + deleteddocument);
            }
            else {
                res.status(404).send('INVALID Image ID ' + req.params.nid);
            }
        })
        .catch(err => {
            return res.status(500).send({ message: "DB Problem..Error in Delete with id " + req.params.nid });
        })
})

router.get('/update/:uid', (req, res) => {
    UserModel.find({ "_id": req.params.uid })
        .then(getdocument => {
            res.status(200).send(getdocument);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'Error in Fetch User Details ' })
        })

})

router.post('/update', (req, res) => {

    UserModel.findByIdAndUpdate(req.body.uid, {
        $set: {
            "name": req.body.uname, "mobile": req.body.umobile, "dob": req.body.udob, "gender": req.body.ugender,
            "password": req.body.upass
        }
    }, { new: true })
        .then(inserteddocument => {
            res.status(200).send('DOCUMENT INSERED IN MONGODB DATABASE' + '<br\>' + inserteddocument);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'Error in Customer Save ' })
        });


})

module.exports = router;

