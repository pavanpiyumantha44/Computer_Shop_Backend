const jwt = require("jsonwebtoken");
require('dotenv').config;


const verifyUser = (req,res,next)=>{
    const token = req.cookies.token;
    const SECRET_KEY = process.env.SECRET_KEY;
    if(!token)
    {
        res.json({Message:"We need token please provide it"});
    }else{
        jwt.verify(token,SECRET_KEY,(err,decoded)=>{
            if(err)
            {
                return res.json({Message:"Authentication Error"})
            }
            else{
                req.name = decoded.name
                next();
            }
        })
    }
};

module.exports = verifyUser;