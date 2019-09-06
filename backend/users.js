const sql = require('mssql');
const config = require('./config');
require('dotenv').config();

// Basic SQL cmnds: https://www.codecademy.com/articles/sql-commands


const addDBUsersData = (name, uid, img) => {
  
};

const getDBUser = async (profile) => {
    try {
        console.log('ASYNC');
        await sql.connect(config);
        const result = await sql.query`select * from VP3D.VILNIUS3D_USERS`;
        // const result = await sql.query`
        // insert into VP3D.VILNIUS3D_USERS (
        //         name,
        //         email,
        //         uid,
        //         role
        //     )
        //     values ( 
        //             ${profile.displayName},
        //             ${profile.emails[0].value},
        //             ${profile.id.trim()},
        //             'sAdmin'
        //         )
        // `;
        console.log('3D DB', result.recordset);
        sql.close();
        return result.recordset[0];
    } catch (err) {
        // ... error checks
        console.error(err);
    }
};

const getDBUsers = (req, res, next) => {
    (async () => {
        try {
            await sql.connect(config);
            const result = await sql.query`select * from VP3D.VILNIUS3D_USERS`;
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
            const result = await sql.query`delete from VP3D.VILNIUS3D_USERS where email is ${req.body.email}`;
            
            // TODO implement delete response

            sql.close();
        } catch (err) {
            res.send(401, err);
        }      
    })();
};

const createDBUser = (req, res, next) => {
    console.log('U', req.body);
    (async () => {
        try {
            let pool = await sql.connect(config);
            const result = await pool.request()
                .input('email', sql.NVarChar, req.body.email)
                .query`
                insert into VP3D.VILNIUS3D_USERS (
                    name,
                    email,
                    uid,
                    role
                )
                values ( 
                    '',
                    @email,
                    '',
                    'admin'
                    )
            `;
            sql.close();
            res.status(200).send({ message: 'user created'})
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }      
    })();
};

module.exports = { getDBUser, getDBUsers, deleteDBUser, createDBUser }; 