const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const smsSchema = new Schema({
        customerEmailAddress: {
            type: String,
            required: true
        },
        customerMobileNumber: {
            type: String,
            required: true
        },
        OTPCode: {
            type: Number,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('SMSConfirmation', smsSchema)