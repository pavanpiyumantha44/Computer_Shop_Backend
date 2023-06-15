const express = require('express');
const db = require('../config/dbConnection');
const router = express.Router();

router.get('/',(req,res)=>{
    const sql = "SELECT * FROM user WHERE role!= 0";
    db.query(sql,(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success",Result:result});
    })
})
router.post('/add',(req,res)=>{
    const sql = "INSERT INTO user(name,nic,address,mobile,email,password,role,isActive) VALUES(?)";
    const values = [
        req.body.name,
        req.body.nic,
        req.body.address,
        req.body.mobile,
        req.body.email,
        req.body.password,
        req.body.position,
        req.body.isActive
    ]
    db.query(sql,[values],(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success"});
    })
})

router.get('/read/:id',(req,res)=>{
    const id = req.params.id;
    const sql = "SELECT * FROM user WHERE id = ?";
    db.query(sql,[id],(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success",Result:result});
    })
})
router.put('/update/:id',(req,res)=>{
    const id = req.params.id;
    const sql = "UPDATE user SET name=?, nic=?, address=?, mobile=?, email=?, password=? WHERE id=?"
    db.query(sql,[req.body.name,req.body.nic,req.body.address,req.body.mobile,req.body.email,req.body.password,id],(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success"});
    })
})

router.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    const sql = "DELETE FROM user WHERE id=?";
    db.query(sql,[id],(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success"});
    })
})
module.exports = router;