const express = require('express');
const db = require('../config/dbConnection');
const router = express.Router();
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
})

const upload = multer({
    storage:storage
})


router.get('/',(req,res)=>{
    const sql = "SELECT * FROM item";
    db.query(sql,(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success",Result:result});
    })
})
router.get('/create/getBrands',(req,res)=>{
    const sql = "SELECT * FROM brand";
    db.query(sql,(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success",Result:result});
    })
})

router.get('/create/getCategory',(req,res)=>{
    const sql = "SELECT * FROM category";
    db.query(sql,(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success",Result:result});
    })
})
router.get('/read/:id',(req,res)=>{
    const sql = "SELECT * FROM item WHERE itemID=?";
    const id = req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success",Result:result});
    })
})

router.post('/create',upload.single('image'),(req,res)=>{
    const date = new Date();
    const sql = "INSERT INTO item(catID,bID,name,description,qty,unitPrice,image,status,added_date) values(?)";
    const values = [
        req.body.catID,
        req.body.bID,
        req.body.name,
        req.body.description,
        req.body.quantity,
        req.body.unitPrice,
        req.file.filename,
        req.body.status,
        date
    ]
    db.query(sql,[values],(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success"});
    })

    // console.log(req.file);

})

router.put('/update/:id',(req,res)=>{
    const sql = "UPDATE item SET name=? , qty=?, price =? unitPrice=?, status=? WHERE itemID=?";
    const id = req.params.id;

    db.query(sql,[req.body.name,req.body.qty,req.body.price,req.body.unitPrice,req.body.status,id],(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success"});
    })
})

// router.put('/updateOne/:id',(req,res)=>{
//     const id = req.params.id;
//     const sql = "UPDATE item SET qty=? WHERE itemID=?";
    
//     console.log(req.body.remainQty);
//     // db.query(sql,[req.body.remain,id],(err,result)=>{
//     //     if(err)
//     //         return res.json({Error:"Error"});
//     //     return res.json({Status:"Success"});
//     // })
// })

router.delete('/delete/:id',(req,res)=>{
    const sql = "DELETE FROM item WHERE itemID=?";
    const id = req.params.id;

    db.query(sql,[id],(err,result)=>{
        if(err)
            return res.json({Error:"Error"});
        return res.json({Status:"Success"});
    })
})

module.exports = router;