const mongoose = require('mongoose');

let nameSchema = new mongoose.Schema({
    first: String,
    last: String
}, { _id: false });

let userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: nameSchema
});

module.exports = mongoose.model('User', userSchema);