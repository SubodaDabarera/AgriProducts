const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:'Buyer'
    // },
    userId: {
        type: String
    },
    items: [{
        // itemId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Product'
        // },
        id: {
            type: String,
        },
        title: String,
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.'],
        },
        price: Number
    }],
    bill: {
        type: Number,
        required: true,
        default: 0
    }
});

Cart = mongoose.model('cart',CartSchema);

module.exports = Cart;