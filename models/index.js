'use strict'

const fs = require('fs')
const path = require('path')
const { Sequelize, DataTypes, Op } = require('sequelize')
// const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.json')[env]
const db = {}

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: 'dev.cnuh6ufclt3g.ap-northeast-1.rds.amazonaws.com',
    username: 'awsuserds',
    password: 'awsaurora',
    port: process.env.DATABASE_PORT,
    database: 'vender',
    dialect: 'mysql',
    dialectOptions: {
      timezone: 'Asia/Taipei',
      useUTC: false
    },
    timezone: 'Asia/Taipei',
    operatorsAliases: false

    // poll: {
    //   max: config.db.pool.max,
    //   min: config.db.pool.min,
    //   acquire: config.db.pool.acquire,
    //   idle: config.db.pool.idle
    // }
  }
)

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize
db.Sequelize = Sequelize

db.vender_cuisine_dish_rawData = require('./vender_cuisine_dish_rawData.js')(
  sequelize,
  Sequelize
)
db.vender_cuisine_type_rawData = require('./vender_cuisine_type_rawData.js')(
  sequelize,
  Sequelize
)
db.vender_input_data = require('./vender_input_data.js')(
  sequelize,
  Sequelize
)
db.vender_restaurant_keyword_rawData =
  require('./vender_restaurant_keyword_rawData.js')(
    sequelize,
    Sequelize
  )
db.vender_restaurant_review_rawData =
  require('./vender_restaurant_review_rawData.js')(
    sequelize,
    Sequelize
  )
db.vender_suitable_purpose_rawData =
  require('./vender_suitable_purpose_rawData.js')(
    sequelize,
    Sequelize
  )
db.vender_enum =
  require('./vender_enum.js')(
    sequelize,
    Sequelize
  )
db.vender_item =
  require('./vender_item.js')(
    sequelize,
    Sequelize
  )

module.exports = db
