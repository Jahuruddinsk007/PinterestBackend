const schema_mongoose = require('mongoose');

const CustomerSchema = schema_mongoose.Schema(
    {
        custid: { type: Number },
        name: { type: String },
        mobile: { type: Number },
        addr: { type: String }
    },
    {
        timestamps: true
    }
);

module.exports = schema_mongoose.model('customers', CustomerSchema);