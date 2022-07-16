const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/paymentController')

router.post('/makePayment', paymentController.makePayment);
router.get('/viewPayments', paymentController.viewPayments);

module.exports = router;