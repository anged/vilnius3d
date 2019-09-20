const sql = require('mssql');
const config = require('./config');
const pool = new sql.ConnectionPool(config);

pool.connect().then(pool => {
    return pool
  })
  .catch(err => console.log('Connection failed: ', err));

module.exports = { sql, pool };