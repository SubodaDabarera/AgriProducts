const express = require('express')
const router = express.Router()
const emailConfirmController = require('../controllers/emailController')

router.post('/confirmEmail', emailConfirmController.confirmPayment)
router.get('/viewConfirmedEmail', emailConfirmController.viewConfirmEmail)

module.exports = router;