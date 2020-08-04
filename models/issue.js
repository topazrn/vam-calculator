const mongoose = require('mongoose');

let issueSchema = new mongoose.Schema({
    description: String
});

module.exports = mongoose.model('Issue', issueSchema);