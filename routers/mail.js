const express = require('express');
const nodemailer = require('nodemailer');
const tls = require('tls');
const router = express.Router();
require('dotenv').config;

router.post('/orderConfirmation',(req,res)=>{
    console.log("Send Mail");


    // Create a transporter with custom TLS options
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: process.env.EMAIL,
        pass: 'pwazrifihrqmkhxj'
        },
        tls: {
        rejectUnauthorized: false
        }
    });
  
    // Rest of the code to send the email...    
    const mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: 'Your order just arrived !!',
        html: `<div>
                <h1><span  style="color:blue">PC</span> <span  style="color:red">S</span>olutions</h1>
                <h3>Hello ${req.body.name},</h3>
            <p style="font-size:16px;">We are happy to inform that your order has arrived!!</p>
            <ul style="font-size:14px;">
            <li><span style="font-weight:bold;">Brand : </span>${req.body.brand}</li>
            <li><span style="font-weight:bold;">Category : </span>${req.body.category}</li>
            <li><span style="font-weight:bold;">Description : </span>${req.body.description}</li>
            <li><span style="font-weight:bold;">Quantity : </span>${req.body.qty}</li>
            <li><span style="font-weight:bold;">Unit Price : </span>${req.body.unitPrice}</li>
            <li><span style="font-weight:bold;">Total Amount : </span>${req.body.totalAmount}</li>
            <li><span style="font-weight:bold;">Advance Payment : </span>${req.body.advancePayment}</li>
            </ul>
            <p style="font-size:16px;"><span style="font-weight:bold;">You have to pay more : </span><span style="color:red; font-weight:bold;">${req.body.remainPayment}</span> Rs</p>
            <p style="font-size:16px;">Now you can collect your item(s) from our premises.</p>
            <br>
            <p style="font-size:16px;">~ Thank You ~</p>
            </div>
        `
      };
    
    // Send the email
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log('Error sending email:', error);
        return res.json({Error:"Error"});
      } else {
        // console.log('Email sent:', info.response);
        return res.json({Status:"Success"});
      }
    });
    
})







module.exports = router;