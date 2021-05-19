const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const {Movie , validateMovie} =require('../models/movie');
const {Genre , validateGenre} =require('../models/genre');
const moment = require("moment");

router.get('/' ,async (req, res) => {
    //https://mongoosejs.com/docs/queries.html

    const movie =await Movie.find().sort("title");
    res.send(movie);
});

router.post('/new', async (req, res) => {

    const {error}=validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("Invalid genre.");

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        publishDate: moment().toJSON()
    });
    await movie.save();

    res.send(movie);

});
router.get('/:id',async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie)
        return res.status(404).send("The movie with the given ID was not found.");

    res.send(movie);
});

router.delete('/:id',async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);

    if (!movie)
        return res.status(404).send("The movie with the given ID was not found.");

    res.send(movie);
});
router.put('/:id', async (req, res) => {

    const m = await Movie.findById(req.params.id);
    if (!m)
        return res.status(404).send("The movie with the given ID was not found.");

    const {error}=validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("Invalid genre.");

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        publishDate: moment().toJSON()
    });
    await movie.save();

    res.send(movie);

});

module.exports =router;