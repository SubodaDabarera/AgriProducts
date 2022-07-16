const express = require('express')
const {update_item} = require("../controllers/itemController");

const addItem = require('../controllers/itemController').post_item
const getItem = require('../controllers/itemController').get_items
const updateitem = require('../controllers/itemController').update_item
const deleteItem = require('../controllers/itemController').delete_item

const router = express.Router();

router.post('/',addItem);
router.get('/',getItem);
router.put('/:id', updateitem)
router.delete('/:id', deleteItem)

module.exports = router;