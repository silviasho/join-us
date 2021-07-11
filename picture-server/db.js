const mysql2 = require("mysql2/promise")


const pool = mysql2.createPool(
    {

        host: 'localhost',
        port: 3306,
        user: 'root',
        database: 'join_us',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    }
)

module.exports = pool