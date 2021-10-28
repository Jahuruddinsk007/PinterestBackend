const schema_mongoose = require('mongoose');

const UserSchema = schema_mongoose.Schema(
    {
        name : {type:String},
        email : {type:String},
        mobile : {type:Number},
        img_path:{type:String},
        dob : {type:String},
        gender : {type:String},
        password : {type:String}
       
        
    },
    {
        timestamps: true
    }
);
module.exports = schema_mongoose.model('registrations', UserSchema);