const express = require('express');
const db = require('../config/dbConnection');
const router = express.Router();

router.get('/',(req,res)=>{
    console.log('getting brands...')
    const sql = "SELECT * FROM brand";
    db.query(sql,(err,result)=>{
        if(err)
            res.json({Error:"Error"});
        res.json({Status:"Success",Result:result});
    })
})
router.get('/read/:id',(req,res)=>{
    console.log('Getting specific brand');
    const sql = "SELECT * from brand where bID=?";
    const id = req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success",Result:result});
    })
})
router.post('/create',(req,res)=>{
    console.log('adding brand');
    const sql = "INSERT INTO brand(name,status,created_date) VALUES(?)";
    const date = new Date();
    const values = [
        req.body.name,
        req.body.status,
        date
    ]
    db.query(sql,[values],(err,result)=>{
        if(err)
            res.json({Error:"Error"});
        res.json({Status:"Success"});
    })
})
router.put('/update/:id',(req,res)=>{
    console.log('Updating brand');
    const id = req.params.id;
    const sql = "UPDATE brand SET name=?, status=? WHERE bID=?";
    db.query(sql,[req.body.name,req.body.status,id],(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success"});
    })
})
router.delete('/delete/:id',(req,res)=>{
    console.log('Deleting brand')
    const id = req.params.id;
    const sql = "DELETE FROM brand WHERE bID=?";
    db.query(sql,[id],(err,result)=>{
        if(err)
            res.json({Error:"Error"});
        res.json({Status:"Success"});
    })
})

module.exports = router;