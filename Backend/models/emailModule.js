const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailSchema = new Schema({
        customerEmailAddress: {
            type: String,
            required: true
        },
        confirmationCode: {
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

module.exports = mongoose.model('EmailConfirm', emailSchema)