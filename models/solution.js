const mongoose = require('mongoose');

let penaltySchema = new mongoose.Schema({
    supply: [Number],
    demand: [Number]
}, { _id: false });

let solutionSchema = new mongoose.Schema({
    supply: [Number],
    demand: [Number],
    distribution: [[Number]],
    penalty: [penaltySchema]
}, { _id: false });

let solutionsSchema = new mongoose.Schema({
    solution: [solutionSchema]
});

module.exports = mongoose.model('Solution', solutionsSchema);