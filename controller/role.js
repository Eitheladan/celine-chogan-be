const Role = require('../models/Role');

exports.createRole = (req, res, next) => {
    const roleObject = JSON.parse(req.body.role)
    roleObject.save()
        .then(() => res.status(201).json({
            message: 'Objet Enregistré'
        }))
        .catch(error => res.status(400).json({
            error
        }));
}