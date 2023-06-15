const express = require('express');
const db = require('../config/dbConnection');
const router = express.Router();

router.get('/',(req,res)=>{
    const sql = "SELECT * FROM customer";
    db.query(sql,(err,result)=>{
        if(err) return res.json({Error:"Error"});
        return res.json({Status:"Success",Result:result});
    })
});

router.post('/add',(req,res)=>{
    console.log('adding...');
    const sql = "INSERT INTO customer(name,nic,email,mobile,address,created_date) values(?)";
    const date = new Date();
    const values = [
        req.body.name,
        req.body.nic,
        req.body.email,
        req.body.mobile,
        req.body.address,
        date
    ]
    db.query(sql,[values],(err,result)=>{
        if(err) return res.json({Error:"Error"});
        return res.json({Status:"Success"});
    })
})

router.get('/read/:id',(req,res)=>{
    console.log('getting...');
    const id = req.params.id;
    const sql = "SELECT * FROM customer WHERE cusID=?";
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({Error:"Error"});
        return res.json({Status:"Success",Result:result});
    })
})

router.put('/update/:id',(req,res)=>{
    console.log('updating...');
    const id = req.params.id;
    const sql = "UPDATE customer SET `name`=?, `nic`=?, `email`=?, `mobile`=?, `address`=?  WHERE cusID=? ";
    db.query(sql,[req.body.name,req.body.nic,req.body.email,req.body.mobile,req.body.address,id],(err,result)=>{
        if(err) return res.json({Error:"Error"});
        return res.json({Status:"Success"});
    })
});

router.delete('/delete/:id',(req,res)=>{
    console.log('deleting...');
    const id = req.params.id;
    const sql = "DELETE FROM customer WHERE cusID=? ";
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({Error:"Error"});
        return res.json({Status:"Success"});
    })
});






module.exports = router;

