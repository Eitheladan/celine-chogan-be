const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./User");
db.role = require("./Role");
db.news = require("./News");
db.infos = require("./Infos");

db.ROLES = ["user", "admin"];

module.exports = db;