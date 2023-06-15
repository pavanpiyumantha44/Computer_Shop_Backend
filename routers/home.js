const express  = require("express");
const router = express.Router();
const db = require('../config/dbConnection');

router.get('/getCusCount',(req,res)=>{
    const sql1 = "SELECT COUNT(*) as count FROM customer";
    db.query(sql1,(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success",Result:result});
    })
})
router.get('/getOrderCount',(req,res)=>{
    const sql = "SELECT COUNT(*) as ORDcount FROM orders";
    db.query(sql,(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success",Result:result});
    })
})
router.get('/repairCount',(req,res)=>{
    const sql = "SELECT COUNT(*) as repair FROM repair";
    db.query(sql,(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success",Result:result});
    })
})

module.exports = router;
