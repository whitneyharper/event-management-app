const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        lowercase: true,
        require: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    password: {
        type: String,
    }

});

module.exports = mongoose.model('User', userSchema)