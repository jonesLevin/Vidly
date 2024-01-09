const express = require('express');
const router = express.Router();
const { Genre, validate } = require('../models/genre');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    const genres = await Genre.find();

    res.send(genres);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('Genre with given id not found.');

    res.send(genre);
});

// Should only be called by an authenticated user
router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({
        name: req.body.name
    });

    genre = await genre.save();
    res.send(genre)
});

// Should be called by an authenticated user
router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = await Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, { new: true });
    if (!genre) return res.status(404).send('Invalid genre.');

    res.send(genre);
});

router.delete('/:id', auth, async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre) return res.status(404).send('Genre with given id not found');

    res.send(genre);
});

module.exports = router;