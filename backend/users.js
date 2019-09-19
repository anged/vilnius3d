const sql = require('mssql');
const config = require('./config');
const validator = require('validator')
const clrs = require('colors');
const fs = require('fs');
const https = require('https');
const uploadDir = __dirname + '/uploads/users/';
const download = require('image-downloader')


require('dotenv').config();

// Basic SQL cmnds: https://www.codecademy.com/articles/sql-commands

const saveUserImage = async (url, id) => {
    const dest = `${uploadDir}${id}.jpg`
    // save cropped s100-c size
    try {
        const { filename, image } = await download.image({url, dest})
        console.log(filename) // => /path/to/dest/image.jpg
        return;
      } catch (e) {
        console.error(e)
      }

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
        if (result.recordset[0] && !result.recordset[0].name || result.recordset[0] && validator.isEmpty(result.recordset[0].name, { ignore_whitespace: true })) {
            console.log(clrs.bgRed('NAME IS EMPTY 1'), result.recordset[0].name);
            await saveUserImage(profile._json.picture, profile.id);
            await addDBFullUserData(pool, profile);
            // select renewed user with full data
            result = await pool.request().query`select * from VP3D.VILNIUS3D_USERS where email = ${profile.emails[0].value} `;
        }

        console.log('3D DB', result.recordset);

        sql.close();
        return result.recordset[0];
    } catch (err) {
        sql.close();
        // ... error checks
        console.error(err);
    }
};

const getDBUsers = async (req, res, next) => {

    try {
        await sql.connect(config);
        const result = await sql.query`select * from VP3D.VILNIUS3D_USERS`;
        sql.close();
        res.json(result.recordset);
    } catch (err) {
        sql.close();
        console.log(err)
        res.status(400).send(err);
    }
};

const deleteDBUser = (req, res, next) => {
    (async () => {
        try {
            await sql.connect(config);
            console.log('DELETE by ID', req.body.role, req.params.id)
            // sAdmin user can not be deleted
            const result = await sql.query`delete from VP3D.VILNIUS3D_USERS where id = ${req.params.id} and role <> 'sAdmin'`;
            console.log(clrs.green(result))
            // TODO implement delete response
            sql.close();
            res.status(200).send({ message: 'User deleted', success: true});
        } catch (err) {
            console.log(err)
            sql.close();
            res.status(400).send(err);
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
                res.status(200).send({ message: 'User exists', success: false, userExists: true });
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
            sql.close();
            res.status(400).send(err);
        }
    })();
};

module.exports = { getDBUser, getDBUsers, deleteDBUser, createDBUser }; 