const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly').
    then(() => console.log('Connected to mongodb...')).
    catch(err => console.error('Could not connect to db...', err));

const genres = require('./routes/genre');
const movies = require('./routes/movie');
const customers = require('./routes/customer');
const rentals = require('./routes/rental');

app.use(express.json());

app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/api/customers', customers);
app.use('/api/rentals', rentals);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));