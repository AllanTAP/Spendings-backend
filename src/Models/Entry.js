const { DataTypes } = require('sequelize')
const database = require('../init/database')

const Entry = database.define('entry', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  date: DataTypes.DATE,
  type: DataTypes.INTEGER,
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  value: DataTypes.FLOAT,
  description: DataTypes.STRING
})

module.exports = Entry
