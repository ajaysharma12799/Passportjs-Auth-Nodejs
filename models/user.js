const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        min: 3,
        max: 30,
        required: true
    },
    password: {
        type: String,
        trim: true,
        min: 5,
        max: 1024,
        required: true
    },
    email: {
        type: String,
        trim: true,
        min: 10,
        max: 50,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('User', userSchema);