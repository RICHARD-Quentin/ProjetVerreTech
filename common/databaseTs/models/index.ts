import { Sequelize } from "sequelize";
import { initModels } from "./init-models";

const env = process.env.NODE_ENV || "development";
const config = {
    "development": {
        "username": "u552287327_groupeA",
        "password": "FenrirProject2021",
        "database": "u552287327_VerreTechStore",
        "host": "31.220.106.154",
        "dialect": "mysql"
    },
    "test": {
        "username": "u552287327_groupeA",
        "password": "FenrirProject2021",
        "database": "u552287327_VerreTechStore",
        "host": "31.220.106.154",
        "dialect": "mysql"
    },
    "production": {
        "username": "u552287327_groupeA",
        "password": "FenrirProject2021",
        "database": "u552287327_VerreTechStore",
        "host": "31.220.106.154",
        "dialect": "mysql"
    }
};

const sequelize = new Sequelize({
    username: "u552287327_groupeA",
    password: "FenrirProject2021",
    database: "u552287327_VerreTechStore",
    host: "31.220.106.154",
    dialect: "mysql"
});

const models = initModels(sequelize)

export default models;