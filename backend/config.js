require('dotenv').config();

const {
    VILNIUS3D_DB_USER,
    VILNIUS3D_DB_P,
    VILNIUS3D_SERVER,
    VILNIUS3D_DB
} = process.env

module.exports = {
    user: VILNIUS3D_DB_USER,
    password: VILNIUS3D_DB_P,
    server: VILNIUS3D_SERVER,
    database: VILNIUS3D_DB
}