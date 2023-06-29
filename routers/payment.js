const express = require("express");
const db = require('../config/dbConnection');
const router = express.Router();

router.post('/repair',(req,res)=>{
    console.log('Repair Payment Added!!');
    const sql = "INSERT INTO payment(repair_ID,totalAmount,paidAmount) VALUES(?)";
    const values=[
        req.body.repID,
        req.body.totalAmount,
        Number(req.body.userPaidAmount)
    ]
    db.query(sql,[values],(err,reuslt)=>{
        if(err)
            // return res.json({Error:"Error"});
            console.log(err);
        return res.json({Status:"Success"});
    })
})

module.exports = router;
