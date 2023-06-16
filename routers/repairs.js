const express = require("express");
const db = require('../config/dbConnection');
const router = express.Router();

router.get('/',(req,res)=>{
    // const sql = "SELECT * FROM repair";
    const sql = "SELECT repair1.*, cus.name AS cusName, cus.nic AS cusNIC, cat.name AS categoryName FROM repair AS repair1 INNER JOIN customer AS cus ON repair1.cusID = cus.cusID INNER JOIN category AS cat ON repair1.catID = cat.cID;";
    db.query(sql,(err,result)=>{
        if(err)
        return res.json({Error:"Error"});
        return res.json({Status:"Success",Result:result});
    })
})
router.get('/active',(req,res)=>{
    const sql = "SELECT repair1.*, cus.name AS cusName, cus.nic AS cusNIC, cat.name AS categoryName FROM repair AS repair1 INNER JOIN customer AS cus ON repair1.cusID = cus.cusID INNER JOIN category AS cat ON repair1.catID = cat.cID where repair1.status=0";
    db.query(sql,(err,result)=>{
        if(err)
        return res.json({Error:"Error"});
        return res.json({Status:"Success",Result:result});
    })
})

router.get('/completedRepairs/:id',(req,res)=>{
    const id = req.params.id;
    const sql = "SELECT repair1.*, cus.name AS cusName, cus.nic AS cusNIC, cus.email AS cusEmail, cat.name AS categoryName, repitem.*, itm1.description AS itemdesc FROM repair AS repair1 INNER JOIN customer AS cus ON repair1.cusID = cus.cusID INNER JOIN category AS cat ON repair1.catID = cat.cID INNER JOIN repair_items AS repitem ON repair1.repID = repitem.repair_ID INNER JOIN item AS itm1 ON repitem.item_ID = itm1.itemID WHERE repair1.repID=?";
    db.query(sql,[id],(err,result)=>{
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
    const sql = "UPDATE repair SET repair_details=?,service_charge=?, status=? WHERE repID=?";
    db.query(sql,[req.body.issue,req.body.service_charge,1,id],(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success"});
    })
})

router.post('/addedItems',(req,res)=>{
    const records = [];
    for(var i=0; i<req.body.length; i++)
    {
        records.push(req.body[i]);
    }
    const values = records.map((record) => [record.repairID, record.itemID, record.qty]);
    const sql = "INSERT INTO repair_items(repair_ID,item_ID,item_qty) VALUES ?";
    db.query(sql, [values], (error, results) => {
        if (error)
        {
            console.error('Error inserting records:', error);
        } 
        else 
        {
            console.log(`${results.affectedRows} records inserted`);
            return res.json({Status:"Success"});
        }
});

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
});

module.exports = router;