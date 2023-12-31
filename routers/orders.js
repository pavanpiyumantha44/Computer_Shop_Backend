const express = require('express');
const db = require('../config/dbConnection');
const router = express.Router();

router.get('/',(req,res)=>{
    // const sql = "SELECT * FROM orders";
    const sql = "SELECT ord1.*, cus.name AS cusName, cus.email AS cusEmail, cus.mobile AS cusMobile, brd.name AS brandName, cat.name AS categoryName FROM orders AS ord1 INNER JOIN customer AS cus ON ord1.cusID = cus.cusID INNER JOIN brand AS brd ON ord1.brandID = brd.bID INNER JOIN category AS cat ON ord1.catID = cat.cID;"
    db.query(sql,(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success",Result:result});
    })
})
router.get('/read/:id',(req,res)=>{
    const id= req.params.id;
    const sql = "SELECT ord1.*, cus.name AS cusName, cus.email AS cusEmail, cus.mobile AS cusMobile, brd.name AS brandName, cat.name AS categoryName FROM orders AS ord1 INNER JOIN customer AS cus ON ord1.cusID = cus.cusID INNER JOIN brand AS brd ON ord1.brandID = brd.bID INNER JOIN category AS cat ON ord1.catID = cat.cID WHERE ord1.ordID=?;";
    db.query(sql,[id],(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success",Result:result})
    })
})
router.post('/add',(req,res)=>{
    console.log("Inserting order...");
    const sql = "INSERT INTO orders(cusID,brandID,catID,description,ordQty,advance,unitPrice,totalPrice,status,isActive) VALUES(?)";
    const values = [
        req.body.cusID,
        req.body.brand,
        req.body.category,
        req.body.description,
        req.body.quantity,
        req.body.advance,
        req.body.unitPrice,
        Number(req.body.unitPrice*req.body.quantity),
        1,
        1,
    ];
    db.query(sql,[values],(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
            console.log(err);
        return res.json({Status:"Success"});
    })
})
router.put('/confirmOrder/:id',(req,res)=>{
    console.log("Confirming order!!");
    const id = req.params.id;
    const sql = "UPDATE orders SET status=? WHERE ordID=?";
    db.query(sql,[0,id],(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success"});
    })
});

router.put('/update/:id',(req,res)=>{
    console.log("Updating Order!!");
    const id = req.params.id;
    const sql = "UPDATE orders SET brandID=?, catID=?, description=?, ordQty=?, advance=?, unitPrice=?, status=? WHERE ordID=?";
    db.query(sql,[req.body.brand,req.body.category,req.body.description,req.body.quantity,req.body.advance,req.body.unitPrice,req.body.status,id],(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success"});
    })
})
router.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    const sql ="DELETE FROM orders WHERE ordID=?";
    db.query(sql,[id],(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success"});
    })
})

router.get('/advancePayment',(req,res)=>{
    const sql = "SELECT ord1.*, cus1.name AS cusName, cus1.nic AS cusNIC, cat1.name AS categoryName, brd1.name AS brandName FROM orders AS ord1 INNER JOIN customer AS cus1 on ord1.cusID = cus1.cusID INNER JOIN category AS cat1 ON ord1.catID = cat1.cID INNER JOIN brand AS brd1 ON ord1.brandID = brd1.bID WHERE ord1.advance>0 AND ord1.isAdvancePaid=0 AND ord1.status=0;";
    db.query(sql,(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success",Result:result});
    })
})

router.get('/fullPayment',(req,res)=>{
    const sql = "SELECT ord1.*, cus1.name AS cusName, cus1.nic AS cusNIC, cat1.name AS categoryName, brd1.name AS brandName FROM orders AS ord1 INNER JOIN customer AS cus1 on ord1.cusID = cus1.cusID INNER JOIN category AS cat1 ON ord1.catID = cat1.cID INNER JOIN brand AS brd1 ON ord1.brandID = brd1.bID WHERE ord1.status=0;";
    db.query(sql,(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success",Result:result});
    })
})



module.exports = router;