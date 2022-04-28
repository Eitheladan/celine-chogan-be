const mailer = require("../app");

exports.sendCommande = (req, res, next) => {
    mailer.commandeMail(req.body.name, req.body.email, req.body.from, req.body.commande)
}