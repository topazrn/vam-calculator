const mongoose = require('mongoose');

let problemSchema = new mongoose.Schema({
    supply: [Number],
    demand: [Number],
    cost: [[Number]],
    dateIn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Problem', problemSchema);