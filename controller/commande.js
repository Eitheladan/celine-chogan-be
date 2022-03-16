const mailer = require("../app");

exports.sendCommande = (req, res, next) => {
    console.log(req.body)
    mailer.commandeMail(req.body.name, req.body.email, req.body.from, req.body.commande)
}