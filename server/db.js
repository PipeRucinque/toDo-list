// En esete archivo se configura la conexion a postgres y la base de datos pernToDo

const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: 'pipe881006',
    host: 'localhost',
    port: process.env.POSTGRES_PORT,
    database : 'perntodo'
})

module.exports = pool