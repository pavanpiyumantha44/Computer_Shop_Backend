const express = require('express');
const db  =  require('../config/dbConnection');
const router = express.Router();


router.get('/',(req,res)=>{
    const sql = "SELECT * FROM category";
    db.query(sql,(err,result)=>{
        if(err)
            return res.json({Error:"Error"})
        return res.json({Status:"Success",Result:result});
    })
})

router.get('/read/:id/',(req,res)=>{
    console.log('getting category...');
    const sql = "SELECT * FROM category WHERE cID=?";
    const id = req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({Error:"Error"});
        return res.json({Status:"Success",Result:result});
    })
})

router.post('/add',(req,res)=>{
    const sql = "INSERT INTO category(name,status,created_date) values(?)";
    const date =  new Date();
    const values = [
        req.body.name,
        req.body.status,
        date
    ]
    db.query(sql,[values],(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success"});
    })
});

router.put('/update/:id',(req,res)=>{
    console.log('updating category!!');
    const id = req.params.id;
    const sql = "UPDATE category SET name=?, status=? WHERE cID=?";
    db.query(sql,[req.body.name,req.body.status,id],(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success"});
    })
})
router.delete('/delete/:id',(req,res)=>{
    console.log("Deleting Category!!");
    const sql = "DELETE FROM category WHERE cID=?";
    const id = req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success"});
    })
})

module.exports = router;