const express= require("express");
const config = require('config');
const connectdb= require('./config/db');

const cors= require('cors');

const app=express();
const PORT = process.env.PORT || 5000;

connectdb();

app.use(express.json());
app.use(cors());
app.use('/api/user/register',require('./Routes/Api/User/UserRegistration'));
app.use('/api/user/login',require('./Routes/Api/User/UserLogin'));
app.use('/api/welcome',require('./Routes/Api/welcome'));

app.get('/',(req,res)=>{
    res.send("Hello From Server");
    
})

app.listen(PORT,()=>{
    console.log(`Your Server Is Running On PORT ${PORT}`);
});