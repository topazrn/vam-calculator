const mongoose = require('mongoose');

let demanderSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Demander', demanderSchema);