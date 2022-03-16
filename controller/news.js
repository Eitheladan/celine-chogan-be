const News = require('../models/News');
const fs = require('fs');

exports.getAllNews = (req, res, next) => {
    News.find()
        .then(news => res.status(200).json(news))
        .catch(error => res.status(500).json({
            error
        }));
}

exports.getOneNews = (req, res, next) => {
    News.findOne({
            _id: req.params.id
        })
        .then(news => res.status(200).json(news))
        .catch(error => res.status(400).json({
            error
        }));

};

exports.deleteNews = (req, res, next) => {
    console.log(req.params.id);
    News.findOne({
            _id: req.params.id
        })
        .then(news => {
            console.log(news);
            // const filename = news.image;           
            News.deleteOne({
                    _id: req.params.id
                })
                .then(() => res.status(200).json({
                    message: 'Objet supprimé !'
                }))
                .catch(error => res.status(400).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }))
};

exports.createNews = (req, res, next) => {
    console.log(req.body);
    console.log(req.file.filename)
    const newsObject = JSON.parse(JSON.stringify(req.body));
    console.log(newsObject);
    delete newsObject;
    console.log(req.file);
    const news = new News({
        // opérateur spread JS
        ...newsObject,
        image: req.file.filename,
    });
    news.save()
        .then(() => res.status(201).json({
            message: 'Objet Enregistré'
        }))
        .catch(error => res.status(400).json({
            error
        }));
};

exports.updateNews = (req, res, next) => {
    const newsObject = req.file ? {
        ...JSON.parse(JSON.stringify(req.body)),
        image: req.file.filename,
    } : {
        ...req.body
    };
    News.updateOne({
            _id: req.params.id
        }, {
            ...newsObject,
            _id: req.params.id
        })
        .then(() => res.status(200).json({
            message: 'Objet Modifié'
        }))
        .catch(error => res.status(400).json({
            error
        }));
};