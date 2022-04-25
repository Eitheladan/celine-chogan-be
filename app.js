const express = require('express');
const app = express();
const cors = require('cors');
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

app.use(cors());

// définition d'un dossier static pour les images

app.use(express.static(__dirname + '/images'));

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

const dotenv = require('dotenv');
dotenv.config();

// connection aux models mongoose

const db = require("./models");
console.log("DB=>", db);

// connection à la BDD MongoDb

mongoose.connect("mongodb+srv://Admin:DEB8aE8dk2awChL@clustereithel.n2ri2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

// Contre les attaques de type sql injection
app.use(helmet());

// Contre les attaques de types DDoS
// Create the rate limit rule
const apiRequestLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100 // limit each IP to 100 requests per windowMs
})
app.use(apiRequestLimiter)

// Configuration pour envoie de mail

const nodemailer = require('nodemailer');
const hbs = require("nodemailer-express-handlebars")

let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
});

const handlebarOptions = {
    viewEngine: {
        extName: '.handlebars',
        partialsDir: 'views/patials',
        layoutsDir: 'views/layouts',
        defaultLayout: '',
    },
    viewPath: 'views/templates',
    extName: '.handlebars',
};
transporter.use('compile', hbs(handlebarOptions));

exports.commandeMail = (name, email, from, commande) => transporter.sendMail({
    from: 'Vue Mailer',
    to: 'celine.moccatti@gmail.com',
    subject: "Commande de produit Chogan",
    template: "commande",
    context: {
        name: name,
        email: email,
        from: from,
        commande: commande,
    }
});


// Routes

const routeNews = require('./routes/news');
app.use('/api/news', routeNews);

const routeUser = require('./routes/user.js');
app.use('/api/user', routeUser);

const routeInfos = require('./routes/infos');
app.use('/api/infos', routeInfos);

const routeMailer = require('./routes/mailer.js');
app.use('/api/mailer', routeMailer);

// const routeRole = require('./routes/role.js');
// app.use('/api/role', routeRole);

// Création des roles dans la bdd, du user Admin et des infos Admin

const Role = db.role;
const User = db.user;
const Infos = db.infos;

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                _id: 2,
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'user' to role collection");
            });

            new Role({
                _id: 1,
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection");
            });
        }
    });
    User.estimatedDocumentCount((err, count) => {
        bcrypt.hash("admin", 10).then(hash => {
            if (!err && count === 0) {
                new User({
                    nom: "admin",
                    prenom: "admin",
                    email: "admin",
                    password: hash,
                    roles: [{
                        _id: 1
                    }],
                }).save(err => {
                    if (err) {
                        console.log("error", err);
                    }
                    console.log("added 'admin' to user collection");
                });
            }

        });
    });
    Infos.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Infos({
                infos: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil vel illum asperiores dignissimos cumque quibusdam et fugiat voluptatem nobis suscipit explicabo, eaque consequatur nesciunt, fugit eligendi corporis laudantium adipisci soluta? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt totam dolorum, ducimus obcaecati, voluptas facilis molestias nobis ut quam natus similique inventore excepturi optio ipsa deleniti fugit illo. Unde, amet! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum illo necessitatibus perspiciatis! Aperiam perferendis labore temporibus, eos culpa corporis recusandae quas, fuga voluptatibus nesciunt odit libero tenetur neque consequatur ea.",
                adresse: {
                    numero: 5,
                    rue: "Rue de la mairie",
                    CP: 29870,
                    ville: "TREGLONOUS"
                },
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'infos admin' to infos collection");
            });
        }
    });
}

let PORT = process.env.PORT || 3030

// set port, listen for requests
app.listen(PORT, () => {
    console.log(`Server is running on port 3030.`);
});