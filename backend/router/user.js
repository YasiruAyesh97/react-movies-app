const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const {User , validateUser} =require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const config = require("config");
const authentication  = require('../middleware/auth')

//get current user
router.get('/me',authentication, async (req, res)=>{
    //in middleware function
        //user get from req.head ( from json web tokan)
        // const decoded =jwt.verify(token,config.get('jwtPrivateKey'));
        //req.user=decoded;
        // then pass to the router function
    //-pwd => exclude password property
  try{
      const user =await User.findById(req.user._id).select('-password');
      res.send(user);

  }catch(e){
      res.status(500).send('Internal Server error')
  }

});


router.post('/', async (req, res) => {
    try{
        const {error} =validateUser(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        let user =await User.findOne({email:req.body.email});
        if(user) return res.status(400).send('User already registered');

        user =new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            isAdmin:true
        });
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt)
        user.password =hash;

        await user.save();
        //user.id also added

        const token = user.generateAuthToken();

        //access-control-expose-headers  for the show in console
        res.header('x-.auth-token',token).header("access-control-expose-headers",'x-.auth-token').send({

            name:user.name,
            email:user.email,
            password:user.password
        });
    }catch (e) {
        res.status(500).send('Internal Server error')
    }

});

module.exports =router;