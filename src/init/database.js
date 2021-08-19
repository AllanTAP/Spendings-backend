const { Sequelize } = require('sequelize')

const db = process.env.DATABASE_NAME
const user = process.env.DATABASE_USERNAME
const password = process.env.DATABASE_PASSWORD

const sequelize = new Sequelize(db, user, password, {
  host: process.env.DATABASE_HOST,
  dialect: 'postgres',
  port: process.env.DATABASE_PORT,
  logging: console.log
})

module.exports = sequelize
