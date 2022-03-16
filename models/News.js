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
});

module.exports = mongoose.model('News', newsShema);