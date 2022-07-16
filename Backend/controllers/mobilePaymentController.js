const express = require('express')
const mobilePaymentModel = require('../models/MobileModel')

const makeMobilePayment = async (req, res) => {
    try{
        const result = await mobilePaymentModel.create({
            email: req.body.email,
            mobileNumber : req.body.mobileNumber,
            pinNumber : req.body.pinNumber,
            amount : req.body.amount,
        })

        res.status(200).json(result)
    }catch (err){
        console.log(err)
        console.log("mobile payment is not success")
        res.status(500).json(err);
    }
}

//view payment info for a given mobile number or email
const viewMobilePayment = async (req, res) => {
    const email = req.body.email;
    try{
        const results = await mobilePaymentModel.find({email})
        res.status(200).json(results);
    }catch (err){
        console.log("View mobile payment is not success")
        res.status(500).json(err)
    }
}

module.exports = {makeMobilePayment, viewMobilePayment}