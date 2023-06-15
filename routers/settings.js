const express = require("express");
const db = require('../config/dbConnection');
const router = express.Router();

router.get('/admin',(req,res)=>{
    const sql = "SELECT * FROM user";
    db.query(sql,(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success",Result:result});
    })
})

router.put('/admin/update',(req,res)=>{
    const sql = "UPDATE user SET email=?, password=? WHERE role=0";
    db.query(sql,[req.body.username,req.body.password],(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success"});
    })
})


module.exports = router;