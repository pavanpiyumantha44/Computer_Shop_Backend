const express = require('express');
const db = require('../config/dbConnection');
const router = express.Router();

router.post('/add',(req,res)=>{            

    const records = [];
    for(var i=0; i<req.body.length; i++){
        records.push(req.body[i]);
    }
    const sql = 'INSERT INTO sales (invoiceID, itemID, name, description, qty, unitPrice, total) VALUES ?';
    const values = records.map((record) => [record.invoiceID, record.id, record.name, record.desc, record.qty, record.price, record.tot]);

    db.query(sql, [values], (error, results) => {
    if (error) {
        console.error('Error inserting records:', error);
    } else {
        console.log(`${results.affectedRows} records inserted`);
        return res.json({Status:"Success"});
    }

    // db.end(); // Close the database connection
});

      
})


router.get('/lastID',(req,res)=>{
    const sql = "SELECT * FROM sales ORDER BY added_Date DESC LIMIT 1";
    db.query(sql,(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success",Result:result});
    })
})

router.put('/updateQty',(req,res)=>{
    
    // const sql = "UPDATE items SET qty=? WHERE itemID=?";
    //console.log(req.body.qty);
    const records = [];
    for(var i=0; i<req.body.length; i++){
        records.push(req.body[i]);
    }
    records.forEach(data => {
        const { id, remain } = data;
        const query = `UPDATE item SET qty = '${remain}' WHERE itemID = ${id}`;
      
        db.query(query, (error, results) => {
          if (error) {
            console.error(`Error updating data for ID ${id}: ${error}`);
          } else {
            // console.log(`Data updated successfully for ID ${id}`);
            console.log("Qty Updated!!");
            // return res.json({Status:"Success"});
          }
        });
      });

})


module.exports = router;