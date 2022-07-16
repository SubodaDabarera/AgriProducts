const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creditCardSchema = new Schema({
        email: {
            type: String,
            required: true
        },
        cardNumber: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        CVC_number: {
            type: Number,
            required: true
        },
        holderName:{
            type:String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('CreditCard', creditCardSchema)