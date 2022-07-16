const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require("nodemailer");
require('dotenv').config();

const PORT = process.env.PORT || 12345;
app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongodb Connection Success!');
});

// email service
app.use('/api/emailService', require('./routes/emailRoute'))

// mobile payment service
app.use('/api/mobileService', require('./routes/mobilePaymentRoutes')) 

// payment service
app.use('/api/creditCard', require('./routes/paymentRoutes'))

// sms service
app.use('/api/SmsService', require('./routes/SmsRoutes'))

// Farmer
const ItemRoutes = require('./routes/itemRoutes');
app.use('/item', ItemRoutes );

// Buyer
const CartRoutes = require('./routes/cartRoute');
app.use('/cart',CartRoutes);
// const ItemRoutes = require('./routes/itemRoute');
// app.use('/item', ItemRoutes );

// Authentication
const userRouter = require("./routes/userRoutes");
app.use("/api/users", userRouter);


app.listen(PORT,()=>{
    console.log(`App is running on ${PORT}`);
});