const express = require('express')
const router = express.Router()
// const paymentController = require('../controllers/paymentController')
const mobilePaymentController = require('../controllers/mobilePaymentController')

router.post('/makeMobilePayment', mobilePaymentController.makeMobilePayment);
router.get('/viewMobilePayments', mobilePaymentController.viewMobilePayment);

module.exports = router;
