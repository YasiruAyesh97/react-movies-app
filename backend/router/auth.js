const jwt =require('jsonwebtoken');
const config =require('config');

const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const {User , validateUser} =require('../models/user');
const bcrypt = require('bcrypt');
const Joi =require('joi-browser');

//loggin
router.post('/', async (req, res) => {
    const {error} =validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let user =await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Invalid email or password');

    const validPassword =await bcrypt.compare(req.body.password,user.password)
    if(!validPassword) return res.status(400).send('Invalid password');
        //get("application setting name")  acctual value is in enviroment variable
    const token = user.generateAuthToken();

    res.send(token);

});
function validate(login){
    const schema ={
        email :Joi.string().min(5).max(255).required(),
        password :  Joi.string().min(5).max(1024).required(),
    }
    return Joi.validate(login,schema);
}

module.exports =router;