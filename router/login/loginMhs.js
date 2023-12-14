const express = require('express');
const logMhs = express.Router();
const db = require('../../lib/mysql');

logMhs.post('/login-mahasiswa', (req, res) => {
    const { npm, password } = req.body;
    const q = `SELECT * FROM mahasiswa WHERE npm = ${npm} AND password = '${password}'`;
    db.query(q, (err, result) => {
        if (err) {
            res.status(401).send({ error: 'Npm or Password is incorrect' });
        } else {
            if (result.length === 0) {
                res.status(401).send({ error: 'Npm or Password is incorrect' });
            }
            else {
                res.status(200).send({ result, message: 'Login Success' });
            }
        }
    }); 
});

module.exports = logMhs;
