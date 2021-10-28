const schema_mongoose = require('mongoose');

const ImagesSchema = schema_mongoose.Schema(
    {
        title: { type: String },
        catagory: { type: String },
        descrip: { type: String },
        img_path: { type: String },
        authorid: { type: String },
        authorname: { type: String },
        authoremail: { type: String }
        
    },
    {
        timestamps: true
    }
);

module.exports = schema_mongoose.model('images', ImagesSchema);