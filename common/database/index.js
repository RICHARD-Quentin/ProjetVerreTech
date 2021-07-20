const fs = require('fs');
const Sequelize = require("sequelize"); 
const initModels = require("./models/init-models");

console.log(__dirname)
let rawdata = fs.readFileSync(__dirname+"\\config\\config.json");
let data = JSON.parse(rawdata);

var sequelize = new Sequelize(data.development);
var models = initModels(sequelize);


module.exports = models;

