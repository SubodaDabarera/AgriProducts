const express = require('express');
const addToCart = require('../controllers/cartController').add_to_cart;
const getCartItems = require('../controllers/cartController').get_cart_items;
const router = express.Router();

router.get('/:id',getCartItems);
router.post('/:id' , addToCart);
// router.get('/getItems',getCartItems);
// router.post('/' , addToCart);



module.exports = router;