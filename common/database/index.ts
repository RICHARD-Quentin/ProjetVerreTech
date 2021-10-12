import {Options, Sequelize } from 'sequelize'
import * as Models from "./models/init-models";
import Config from "./config/config";

const options:Options = Config.development;

const sequelize = new Sequelize(options);
var models = Models.initModels(sequelize);

export {models,sequelize}
export default models