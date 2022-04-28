const News = require('../models/News');
const fs = require('fs');

exports.getAllNews = (req, res, next) => {
    News.find().sort({
            "_id": -1
        })
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
            const filename = news.image;
            console.log(filename)
            fs.unlink(`images/${filename}`, () => {
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

        }).catch(error => res.status(500).json({
            error
        }));
};

exports.createNews = (req, res, next) => {
    let date = Date();
    const news = new News({
        // opérateur spread JS
        ...req.body,
        image: req.file.filename,
        date: date,
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