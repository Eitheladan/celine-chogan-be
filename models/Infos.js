const mongoose = require('mongoose');

const infosShema = mongoose.Schema({
    infos: {
        type: String,
        require: true
    },
    adresse: {
        numero: {
            type: String,
            require: true
        },
        rue: {
            type: String,
            require: true
        },
        CP: {
            type: Number,
            require: true
        },
        ville: {
            type: String,
            require: true
        }
    },
});

module.exports = mongoose.model('Infos', infosShema);