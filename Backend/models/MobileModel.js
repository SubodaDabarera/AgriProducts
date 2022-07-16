const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mobilePayment = new Schema({
        email: {
            type: String,
            required: true
        },
        mobileNumber: {
            type: Number,
            required: true
        },
        pinNumber: {
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

module.exports = mongoose.model('Mobile', mobilePayment)