const sql = require('mssql');
// TODO add config public
const config = require('./config');
const validator = require('validator')
const clrs = require('colors');
// const fs = require('fs');
const slug = require('slug');
const uploadDir = __dirname + '/uploads/';
const jimp = require('jimp');

require('dotenv').config();

// Basic SQL cmnds: https://www.codecademy.com/articles/sql-commands

const getScene = async (req, res, pool) => {
    try {
        console.log(clrs.bgYellow(req.params, req.body))
        const result = await pool.request().query`select * from VP3D.VILNIUS3D_SCENES where id = ${req.params.id}`;
        console.log(result)
        sql.close();
        res.status(200).json({ message: 'Scene updated',  success: true, scene: result.recordset[0] });
        // res.json(result.recordset);
    } catch (err) {
        sql.close();

        res.status(400).send(err);
    }
};

const getScenes = async (req, res) => {
    (async () => {
        try {
            await sql.connect(config);
            const result = await sql.query`select * from VP3D.VILNIUS3D_SCENES`;
            console.log(result)
            sql.close();
            res.json(result.recordset);
        } catch (err) {
            sql.close();
            res.status(400).send(err);
        }
    })();
};

const addFile = (file, req, res, pool=null) => {
    const fullPath = `${uploadDir}/${file.name}`;
    // Move file
    file.mv(`${fullPath}`, (err, succ) => {
        if (err) {
            sql.close();
            throw err;
        };

        jimp.read((`${fullPath}`), (err, image) => {
            if (err) throw err;

            image      
                // .resize(600, jimp.AUTO) // resize
                .quality(90) // set JPEG quality
                .crop( 0, 0, 600, 600 )
                // .greyscale()    
                .write(`${fullPath}`); // save

            if (pool) {
                getScene(req, res, pool)   
            }  else {
                sql.close();
                res.status(200).json({ message: 'Scene created',  success: true });
            }
        });
    });  

};

const saveScene = async (req, res) => {
    console.log(req.body); // request body, like email
    const file = req.files.imgFile;
    console.log(clrs.bgMagenta(file, req.body))

    try {

        const imgUrl = `uploads/${file.name}`;
        const pool = await sql.connect(config);
        const slugString = slug(req.body.title).toLowerCase();
        const result = await pool.request()
            .input('title', sql.NVarChar, req.body.title)
            .input('description', sql.NVarChar, req.body.description)
            .input('scene', sql.NVarChar, req.body.scene)
            .input('slug', sql.NVarChar, slugString)
            .input('img', sql.NVarChar, imgUrl)
            .query`
                insert into VP3D.VILNIUS3D_SCENES (
                    title,
                    description,
                    scene,
                    slug,
                    img
                )
                values (
                    @title,
                    @description,
                    @scene,
                    @slug,
                    @img
                    )
            `;
        console.log('U', result);
        addFile(file, req, res);
    } catch (err) {
        console.log(err);
        sql.close();
        res.status(400).send(err);
    }
};


const updateScene = async (req, res) => {
    console.log(clrs.green('UPDATE', req.params.id, req.body));
    const slugString = slug(req.body.title).toLowerCase();
    try {
        const pool = await sql.connect(config);
        if (req.files) {
            const file = req.files.imgFile;
            console.log('File', file)
            const imgUrl = `uploads/${file.name}`;
            const result = await pool.request()
                .query`
                    update VP3D.VILNIUS3D_SCENES
                    set
                        title = ${req.body.title},
                        description = ${req.body.description},
                        scene = ${req.body.scene},
                        slug = ${slugString},
                        img = ${imgUrl}
                    where id = ${req.params.id}
                    `;

                    addFile(file, req, res, pool);
        } else {
            const result = await pool.request()
                .query`
                    update VP3D.VILNIUS3D_SCENES
                    set
                        title = ${req.body.title},
                        description = ${req.body.description},
                        scene = ${req.body.scene},
                        slug = ${slugString}
                    where id = ${req.params.id}
                `;
                console.log('result', result);
                
                if (result.rowsAffected[0] === 1) {
                    getScene(req, res, pool);
                } else {
                    res.status(204);
                }

        }

    } catch (err) {
        console.log(err)
        sql.close();
        res.status(400).send(err);
    }
};

const deleteScene = function (req, res) {
    console.log(clrs.red('DELETE', req.params.id, req.params, req.body));
    (async () => {
        try {
            await sql.connect(config);
            console.log('DELETE by ID', req.body, req.params.id)
            const result = await sql.query`delete from VP3D.VILNIUS3D_SCENES where id = ${req.params.id}`;
            console.log(clrs.green(result))
            sql.close();
            res.status(200).send({ message: 'Scene deleted', success: true });
        } catch (err) {
            console.log(err)
            sql.close();
            res.status(200).send({ message: 'Scene deleted', success: false });
        }
    })();
};

module.exports = { getScenes, saveScene, updateScene, deleteScene }; 