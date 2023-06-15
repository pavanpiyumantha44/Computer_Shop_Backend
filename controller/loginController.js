const db = require('../config/dbConnection');

const Signup = (req,res)=>{
    const sql = "INSERT INTO admin(name,email,password) VALUES(?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql,[values],(err,data)=>{
        if(err){
            return res.josn("Error");
        }
        return res.josn(data);
    })
}

module.exports = Signup;