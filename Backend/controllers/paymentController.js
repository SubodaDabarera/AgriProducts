const express = require('express')
const creditCardModel = require('../models/creditCardModel')

const makePayment = async (req, res) => {

    try {
        const result = await creditCardModel.create({
            email: req.body.email,
            cardNumber : req.body.cardNumber,
            amount : req.body.amount,
            CVC_number : req.body.CVC_number,
            holderName: req.body.holderName
        })

        res.status(200).json(result)
    }catch (err){
        console.log(err);
        console.log("Credit card details are not correctly entered")
        res.status(500).json(err);
    }

}

//view payments for given email address
const viewPayments = async (req, res) => {

    const email = req.body.email;

    try{
        const results = await creditCardModel.find({email})
        res.status(200).json(results);
    }catch (err){
        console.log("View payment is not success")
        res.status(500).json(err)
    }
}

module.exports = {makePayment, viewPayments};