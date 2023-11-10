const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    password: {
        type: string,
        required: true,
        minlength: 5,
        maxlength: 255
    }
}));

const validateUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(50),
        email: Joi.string().email().required().min(5).max(50),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(user);
}

module.exports.User = User;
module.exports.validateUser = validateUser;