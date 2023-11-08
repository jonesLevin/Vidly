const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('../models/genre');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        min: 0,
        default: 10
    },
    dailyRentalRate: {
        type: Number,
        min: 0,
        default: 1
    }
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().required().min(2).max(50),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).default(10),
        dailyRentalRate: Joi.number().min(0).default(1)
    });

    return schema.validate(movie);
}

module.exports.Movie = Movie;
module.exports.validate = validateMovie;
module.exports.movieSchema = movieSchema;