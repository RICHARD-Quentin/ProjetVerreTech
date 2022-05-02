import {Options, Dialect, Sequelize } from 'sequelize'
require('dotenv').config()
const mysql:Dialect = "mysql"

export default
{
  development :{
    username: process.env.DEV_USERNAME,
    password: process.env.DEV_PWD,
    database: process.env.DEV_DB,
    host: process.env.DEV_HOST,
    dialect: mysql

    },
  test: {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PWD,
    database: process.env.TEST_DB,
    host: process.env.TEST_HOST,
    dialect: mysql
  },
  production: {
    username: process.env.PROD_USERNAME,
    password: process.env.PROD_PWD,
    database: process.env.PROD_DB,
    host: process.env.PROD_HOST,
    dialect: mysql,
    logging: false
  }
}
