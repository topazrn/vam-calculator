const mongoose = require('mongoose');

let supplierSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Supplier', supplierSchema);