const mongoose = require('mongoose');

let supplySchema = new mongoose.Schema({
    supplierId: mongoose.Schema.Types.ObjectId,
    unit: Number
}, { _id: false });

let demandSchema = new mongoose.Schema({
    demanderId: mongoose.Schema.Types.ObjectId,
    unit: Number
}, { _id: false });

let problemSchema = new mongoose.Schema({
    supply: [supplySchema],
    demand: [demandSchema],
    cost: [[Number]],
    dateIn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Problem', problemSchema);