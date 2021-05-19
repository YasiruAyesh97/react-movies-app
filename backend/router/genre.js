const authentication  = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const {Genre , validateGenre} =require('../models/genre');
const moment = require("moment");


// 1. route
// 2.middleware
// 3.route handler


router.post("/", async (req, res) => {
    let genres =await Genre.find().sort("name");

    res.send(genres);
});

router.post("/add",[authentication,admin] ,  async (req, res) => {


    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();

    res.send(genre);
});

module.exports = router;