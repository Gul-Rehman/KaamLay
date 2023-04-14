const express = require("express");
const User = require("../../Models/User");
// const {check , validationResult}= require('express-validator');
// const {check, validationResult}= require('express-validator');
// const gravatar= require('gravatar');
// const bcrypt= require('bcryptjs');
// const jwt= require('jsonwebtoken');
// const config=require('config');
const auth = require("../../Middlewares/auth");

// const User= require('../../Models/User');
// const jwtSecret= config.get('jwtSecret');

const router = express.Router();

router.get("/", auth, async (req, res) => {
  //   const { name, email, password } = req.body;
  try {
    const result = await User.findOne({ _id: req.user.id });
    if (!result) {
      return res.json({ msg: "No User Found" });
    }
    res.send(result);
  } catch (err) {
    console.error(err.message);
    return res.status(400).send("Server Error");
  }
  // try{
  //     let user= await User.findOne({email});
  //     if(user){
  //         return res.status(400).json({errors:[{msg:"User Already Exists"}]});
  //     }
  //     console.log(name, email,password);
  //     const avatar= gravatar.url(email,{
  //         s:"200",
  //         r:"pg",
  //         d:"mm"
  //     })

  //     user = new User({
  //         name,
  //         email,
  //         password,
  //         avatar
  //     })
  //     console.log(user.id);
  //     const salt= await bcrypt.genSalt(10);
  //     user.password=await bcrypt.hash(password,salt);
  //     const result=await user.save();

  //     const payload={
  //         user:{
  //             id:user.id
  //         }
  //     }

  //     jwt.sign({result},jwtSecret,(err,token)=>{
  //         if(err){
  //             res.send('Cant Proceed Please Try After Some Time');
  //         }
  //         else{
  //         res.send({result,auth:token});
  //     }
  //     })

  // }
  // catch(err){
  //     console.error(err.message);
  //     res.status(400).send('Server Error');
  // }
});

module.exports = router;
