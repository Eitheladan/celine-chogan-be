const Infos = require('../models/Infos');

exports.getInfos = (req, res, next) => {
    Infos.find()
        .then(infos => res.status(200).json(infos))
        .catch(error => res.status(400).json({
            error
        }));

};

exports.updateInfos = (req, res, next) => {
    Infos.updateOne({
            _id: req.params.id
        }, {
            ...req.body,
            _id: req.params.id
        })
        .then(() => res.status(200).json({
            message: 'Infos Modifié'
        }))
        .catch(error => res.status(400).json({
            error
        }));
};