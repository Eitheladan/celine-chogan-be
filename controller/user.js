const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
                prenom: req.body.prenom,
                nom: req.body.nom
            });
            user.save()
                .then(() => res.status(201).json({
                    message: 'Utilisateur créé !'
                }))
                .catch(error => res.staus(400).json({
                    error
                }))
        })
        .catch(error => res.staus(500).json({
            error
        }));
};

exports.login = (req, res, next) => {
    console.log('Je me log')
    console.log(req.body)
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    error: 'Utilisateur non trouvé !'
                });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    console.log('Validation password')
                    if (!valid) {
                        console.log('Invalid password');
                        return res.status(402).json({
                            error: 'Mot de passe incorrect !'
                        });
                    }
                    console.log('le token')
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({
                                userId: user._id,
                                userEmail: user.email,
                            },
                            'RANDOM_TOKEN_SECRET', {
                                expiresIn: '24h'
                            }
                        )

                    });
                    console.log('Donnée de l utilisateur ' + user);
                })
                .catch(error => res.status(500).json({
                    error
                }), );
        })
        .catch(error => res.status(500).json({
            error
        }));
};

exports.infos = (req, res, next) => {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userEmail = decodedToken.userEmail;
    User.findOne({
            email: userEmail
        })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    error: 'Utilisateur non trouvé !'
                });
            }
            res.status(200).json({
                email: user.email,
                nom: user.nom,
                prenom: user.prenom
            })
        })
        .catch(error => res.status(500).json({
            error
        }));
}