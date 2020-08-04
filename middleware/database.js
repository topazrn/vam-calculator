const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/indomaret-transporting', { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    if (error) {
        console.log('Connection to mongodb failed');
    } else {
        console.log('Connection to mongodb successful');
    }
});

module.exports = mongoose;