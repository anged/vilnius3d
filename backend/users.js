const sql = require('mssql');
const config = require('./config');
require('./env');

// Basic SQL cmnds: https://www.codecademy.com/articles/sql-commands


const authenticateDBUser = (req, res, next) => {
    (async () => {
        try {
            await sql.connect(config);
            const result = await sql.query`select * from ${proccess.env.VILNIUS_SDE_USERS} where email is ${req.user.email}`;
            if (result.recordset.length === 0) {
                res.send(401, "Not authorized");
            } else {
                //  user for token
                req.authUser = {
                    name: req.user.name,
                    id: req.user.googleId,
                    img: req.user.image
                }
                next();
            }

            sql.close();
        } catch (err) {
            res.send(401, err);
        }      
    })();
};

const getDBUsers = (req, res, next) => {
    (async () => {
        try {
            await sql.connect(config);
            const result = await sql.query`select * from ${proccess.env.VILNIUS_SDE_USERS}`;
            sql.close();
            res.json(result.recordset);
        } catch (err) {
            res.send(401, err);
        }      
    })();
};

const deleteDBUser = (req, res, next) => {
    (async () => {
        try {
            await sql.connect(config);
            const result = await sql.query`delete * from ${proccess.env.VILNIUS_SDE_USERS} where email is ${req.user.email}`;
            
            // TODO implement delete

            sql.close();
        } catch (err) {
            res.send(401, err);
        }      
    })();
};

const createDBUser = (req, res, next) => {
    (async () => {
        try {
            await sql.connect(config);
            const result = await sql.query`delete * from ${proccess.env.VILNIUS_SDE_USERS} where email is ${req.user.email}`;

            // TODO implement delete

            sql.close();
        } catch (err) {
            res.send(401, err);
        }      
    })();
};

exports.modules = { authenticateDBUser, getDBUsers, deleteDBUser, createDBUser }; 