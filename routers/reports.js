const express = require('express');
const db = require('../config/dbConnection');
const router = express.Router();

router.post('/sales',(req,res)=>{
    const startDate = req.body.startDate+" 00:00:00";
    const endDate = req.body.endDate+" 23:59:59";
    // console.log(req.body);

    const sql = `SELECT * FROM sales WHERE added_Date >='${startDate}' AND added_Date <='${endDate}'`;
    db.query(sql,(err,result)=>{
        if(err)
            // console.log(err);
            return res.json({Error:"Error"});
        return res.json({Status:"Success",Result:result});
    })
})

module.exports = router;