const schema_mongoose = require('mongoose');

const ContactUsSchema = schema_mongoose.Schema(
    {
        vname : {type:String},
        vmobile : {type:Number},
        vemail : {type:String},
        vcomment : {type:String}
        
       
        
    },
    {
        timestamps: true
    }
);
module.exports = schema_mongoose.model('contactUs', ContactUsSchema);