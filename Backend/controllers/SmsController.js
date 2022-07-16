const express = require('express')
const SmsSchema = require('../models/SMSModel')
const Nexmo = require("nexmo");

const confirmOTP = async (req, res) => {

    console.log(req.body)

    const mobileNumber = req.body.customerMobileNumber;
    const OTP_code = req.body.OTPCode;

    async function sendSMS() {
        const nexmo = new Nexmo({
            apiKey: process.env.NEXMO_API_KEY,
            apiSecret: process.env.NEXMO_API_SECRET
        })

        const from = "Agri products"
        const to = mobileNumber; //'94767846632'
        const text = `Agro Product OTP key is : ${OTP_code}  `

        await nexmo.message.sendSms(from, to, text);
    }

    sendSMS().then(() => console.log("SMS successfully sent!!!"))

    try {
        const result = await SmsSchema.create({
            customerEmailAddress: req.body.customerEmailAddress,
            customerMobileNumber : req.body.customerMobileNumber,
            OTPCode : req.body.OTPCode,
            amount : req.body.amount,
        })

        res.status(200).json(result)
    }catch (err){
        console.log(err);
        console.log("SMS confirmation is not successful")
        res.status(500).json(err);
    }
}

//view payment info of mobile users
const viewConfirmedSMS = async (req, res) => {

    console.log("view called")

    const customerEmailAddress = req.body.customerEmailAddress;
    const customerMobileNumber = req.body.customerMobileNumber;

    try{
        const results = await SmsSchema.find({customerMobileNumber})
        res.status(200).json(results);
    }catch (err){
        console.log("View mobile payment is not success")
        res.status(500).json(err)
    }
}

module.exports = {confirmOTP, viewConfirmedSMS}