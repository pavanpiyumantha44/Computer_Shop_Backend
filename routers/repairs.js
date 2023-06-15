const express = require("express");
const db = require('../config/dbConnection');
const router = express.Router();

router.get('/',(req,res)=>{
    const sql = "SELECT * FROM repair";
    db.query(sql,(err,result)=>{
        if(err)
        return res.json({Error:"Error"});
        return res.json({Status:"Success",Result:result});
    })
})
router.get('/active',(req,res)=>{
    const sql = "SELECT * FROM repair where status=0";
    db.query(sql,(err,result)=>{
        if(err)
        return res.json({Error:"Error"});
        return res.json({Status:"Success",Result:result});
    })
})
router.post('/add',(req,res)=>{
    console.log("Adding new repair")
    const date = new Date();
    const sql = "INSERT INTO repair(cusID,catID,receive_date,status,isActive) VALUES(?)";
    const values = [
        req.body.cusID,
        req.body.catID,
        date,
        0,
        1
    ]
    db.query(sql,[values],(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
            //console.log(err);
        return res.json({Status:"Success"});
    })
})
router.put('/update/:id',(req,res)=>{
    const id = req.params.id;
    const sql = "UPDATE repair SET repair_details=?, added_items=?, service_charge=?, status=? WHERE repID=?";
    db.query(sql,[req.body.issue,req.body.added_items,req.body.service_charge,1,id],(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success"});
    })
})
router.delete('/delete/:id',(req,res)=>{
    console.log("deleting...");
    const id = req.params.id;
    const sql = "DELETE FROM repair WHERE repID=?";
    db.query(sql,[id],(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success"});
    })
})
module.exports = router;