const fs = require('fs');
const Sequelize = require("sequelize"); 
const initModels = require("./models/init-models");

let rawdata = fs.readFileSync("config/config.json");
let data = JSON.parse(rawdata);

var sequelize = new Sequelize(data.development);

var models = initModels(sequelize);

module.exports.default = models;

