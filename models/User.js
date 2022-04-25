const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    prenom: {
        type: String,
        required: true,
    },
    nom: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: [{
        type: Schema.Types.ObjectId,
        ref: 'Roles'
    }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);