const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()

const connection = mysql.createConnection(process.env.DATABASE_URL)


module.exports = connection