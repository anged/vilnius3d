const sql = require('mssql');
const config = require('./config');
const validator = require('validator')
const clrs = require('colors');
const fs = require('fs');
const https = require('https');
const uploadDir = __dirname + '/uploads/users/';

require('dotenv').config();

// Basic SQL cmnds: https://www.codecademy.com/articles/sql-commands

const saveUserImage = async (url, id) => {
    const filePath = `${uploadDir}${id}.jpg`
    const fileStream = fs.createWriteStream(filePath);
    // save cropped s100-c size
    await https.get(url, (res) => {
        res.pipe(fileStream);
    });
}

const addDBFullUserData = async (pool, profile) => {
    const { displayName, id, emails } = profile;
    const imgUrl = `uploads/users/${id}.jpg`;
    const result = await pool.request()
        .query`
            update VP3D.VILNIUS3D_USERS
            set
                name = ${displayName},
                uid = ${id},
                role = 'admin',
                img = ${imgUrl}
            where email = ${emails[0].value}
            `;
};

const getDBUser = async (profile) => {
    try {
        console.log('ASYNC');
        const pool = await sql.connect(config);
        let result = await pool.request().query`select * from VP3D.VILNIUS3D_USERS where email = ${profile.emails[0].value} `;

        // As we're registering  user only by email,
        // we must assgin full properties for authorized user at first authentication 
        if (result.recordset[0] && result.recordset[0].name || result.recordset[0] && validator.isEmpty(result.recordset[0].name, { ignore_whitespace: true })) {
            console.log(clrs.bgRed('NAME IS EMPTY 1'), result.recordset[0].name);
            await addDBFullUserData(pool, profile);
            await saveUserImage(profile._json.picture, profile.id)
            // select renewed user with full data
            result = await pool.request().query`select * from VP3D.VILNIUS3D_USERS where email = ${profile.emails[0].value} `;
        }

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
    // TODO check if user exists with email
    console.log('U', req.body);
    (async () => {
        try {
            const pool = await sql.connect(config);
            const currentUser = await pool.request().query`select * from VP3D.VILNIUS3D_USERS where email = ${req.body.email}`;
            console.log(currentUser)
            if (currentUser.recordset[0]) {
                sql.close();
                res.status(200).send({ message: 'User exists', success: false });
            } else {
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
                console.log('U', result);
                sql.close();
                res.status(200).send({ message: 'User created', success: true });
            }

        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    })();
};

module.exports = { getDBUser, getDBUsers, deleteDBUser, createDBUser }; 