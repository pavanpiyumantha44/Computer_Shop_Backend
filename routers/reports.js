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

router.get('/mostSold',(req,res)=>{
    console.log("Getting most sold items");
    const sql = "SELECT sales1.itemID,itm1.name AS ItemName, brd1.name AS brandName, COUNT(*) AS item_count FROM sales as sales1 INNER JOIN item AS itm1 ON sales1.itemID=itm1.itemID INNER JOIN brand as brd1 ON itm1.bID = brd1.bID GROUP BY itemID ORDER BY item_count DESC LIMIT 5;";
    db.query(sql,(err,result)=>{
        if(err)
            res.json({Error:"Error"});
        return res.json({Status:"Success",Result:result});
    })
})

router.get('/lowestQty',(req,res)=>{
    console.log("Getting Lowest items qty");
    const sql = "SELECT itm1.itemID,itm1.name AS ItemName, itm1.qty AS itemQty,itm1.description AS itemDesc, brd1.name AS brandName, cat1.name AS categoryName FROM item AS itm1 INNER JOIN brand as brd1 ON itm1.bID = brd1.bID INNER JOIN category AS cat1 ON itm1.catID = cat1.cID GROUP BY itemID ORDER BY itm1.qty ASC LIMIT 5;";
    db.query(sql,(err,result)=>{
        if(err)
            res.json({Error:"Error"});
        return res.json({Status:"Success",Result:result});
    })
})

router.get('/totalRepairEarning',(req,res)=>{
    console.log("Getting Lowest items qty");
    const sql = "SELECT sum(totalAmount) AS total FROM `payment` GROUP BY repair_ID;";
    db.query(sql,(err,result)=>{
        if(err)
            res.json({Error:"Error"});
        return res.json({Status:"Success",Result:result});
    })
})

router.get('/totalTechnicianEarning',(req,res)=>{
    console.log("Getting Lowest items qty");
    const sql = "SELECT SUM(service_charge) AS total FROM repair WHERE status = 1;";
    db.query(sql,(err,result)=>{
        if(err)
            res.json({Error:"Error"});
        return res.json({Status:"Success",Result:result});
    })
})

module.exports = router;