const mongoose = require('mongoose');

const newsShema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now,
        require: true
    }
});

module.exports = mongoose.model('News', newsShema);