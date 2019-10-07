const { sql, pool } = require('./dbPool');
const validator = require('validator')
const clrs = require('colors');
const uploadDir = __dirname + '/uploads/users/';
const download = require('image-downloader')


require('dotenv').config();

// Basic SQL cmnds: https://www.codecademy.com/articles/sql-commands

const saveUserImage = async (url, id) => {
    const dest = `${uploadDir}${id}.jpg`
    // save cropped s100-c size
    try {
        const { filename, image } = await download.image({ url, dest })
        console.log(filename) // => /path/to/dest/image.jpg
        return;
    } catch (e) {
        console.error(e)
    }

}

const addDBFullUserData = async (profile) => {
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
    await pool;

    try {
        let result = await pool.request().query`select * from VP3D.VILNIUS3D_USERS where email = ${profile.emails[0].value} `;

        // As we're registering  user only by email,
        // we must assgin full properties for authorized user at first authentication 
        if (result.recordset[0] && !result.recordset[0].name || result.recordset[0] && validator.isEmpty(result.recordset[0].name, { ignore_whitespace: true })) {
            console.log(clrs.bgRed('NAME IS EMPTY 1'), result.recordset[0].name);
            await saveUserImage(profile._json.picture, profile.id);
            await addDBFullUserData(profile);
            // select renewed user with full data
            result = await pool.request().query`select * from VP3D.VILNIUS3D_USERS where email = ${profile.emails[0].value} `;
        }
        console.log('3D DB', result.recordset);
        return result.recordset[0];
    } catch (err) {
        // ... error checks
        console.error(err);
    }
};

const getDBUsers = async (req, res, next) => {
    await pool;

    try {
        const result = await pool.request().query`select * from VP3D.VILNIUS3D_USERS`;
        res.json(result.recordset);
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
};

const deleteDBUser = async (req, res, next) => {
    await pool;

    try {
        console.log('DELETE by ID', req.body.role, req.params.id)
        // sAdmin user can not be deleted
        const result = await pool.request().query`delete from VP3D.VILNIUS3D_USERS where id = ${req.params.id} and role <> 'sAdmin'`;
        console.log(clrs.green(result))
        res.status(200).send({ message: 'User deleted', success: true });
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
};

const createDBUser = async (req, res, next) => {
    await pool;

    // TODO check if user exists with email
    console.log('U', req.body);
        try {
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
                res.status(200).send({ message: 'User created', success: true });
            }

        } catch (err) {
            res.status(400).send(err);
        }
};

module.exports = { getDBUser, getDBUsers, deleteDBUser, createDBUser }; 