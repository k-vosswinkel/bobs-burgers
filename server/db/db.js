const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://xhlfjtaylianhk:726c5b2d4e70255ea54ce484b4fe885ea9bf82c25b7018f8158182b9a8d8043c@ec2-54-221-207-184.compute-1.amazonaws.com:5432/deoavqeifn1u8u`,
  {
    logging: false
  }
)
module.exports = db
