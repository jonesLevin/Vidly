const express = require('express');
const router = express.Router();
const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');

router.get('/', async (req, res) => {
    const movies = await Movie.find();

    res.send(movies);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('Movie with given id not found.');

    res.send(movie);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Validate the genreid provided is valid
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(404).send('Invalid genre id.');

    let movie = new Movie({
        title: req.body.title,
        genre: genre,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    movie = await movie.save();

    res.send(movie);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(404).send('Invalid genre id.');

    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        genre: genre,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, { new: true })

});

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).send('Invalid movie id');

    res.send(movie);
});

module.exports = router;