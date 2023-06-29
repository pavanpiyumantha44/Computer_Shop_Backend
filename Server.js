const  express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const verifyUser = require('./middleware/verifyUser');
const db = require('./config/dbConnection');
const app = express();
const customer = require('./routers/customer');
const brand = require('./routers/brand');
const home = require('./routers/home');
const category = require('./routers/category');
const items = require('./routers/items');
const employee = require('./routers/employee');
const orders = require('./routers/orders');
const repairs = require('./routers/repairs');
const settings = require('./routers/settings');
// const sales = require('./routers/sales');
const sales = require('./routers/sales');
const reports = require('./routers/reports');
const mail = require('./routers/mail');
const payment = require('./routers/payment');

require('dotenv').config();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods:["POST","GET","PUT","DELETE"],
        credentials:true
    }
));

app.use('/dashboard/home',home);
app.use('/dashboard/brands',brand);
app.use('/dashboard/category',category);
app.use('/dashboard/customer',customer);
app.use('/dashboard/items',items);
app.use('/dashboard/employee',employee);
app.use('/dashboard/orders',orders);
app.use('/dashboard/repairs',repairs)
app.use('/dashboard/settings',settings);
app.use('/billing',sales);
app.use('/dashboard/getReport',reports);
app.use('/mail',mail);
app.use('/payments/',payment);

app.get('/',verifyUser,(req,res)=>
{
    return res.json({Status:"Success", name:req.name});
})
const SECRET_KEY = process.env.SECRET_KEY;
app.post("/login",(req,res)=>{
    const sql = "SELECT * FROM user WHERE email = ? AND password =?"
    db.query(sql,[req.body.email, req.body.password],(err,data)=>{
        if(err) return res.json({Message:"Server side error"})
        if(data.length>0)
        {
            console.log("exist ooi..");
            const name = data[0].email;
            const token = jwt.sign({name},SECRET_KEY, {expiresIn:'1d'});
            res.cookie('token',token);
            return res.json({Status:"Success",Result:data});
        }else{
            return res.json({Message:"No record found!!"});
        }
    })
})

app.get('/logout', (req,res)=>
{
    res.clearCookie('token');
    return res.json({Status:"Success"});
})




const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT} ...`);
})