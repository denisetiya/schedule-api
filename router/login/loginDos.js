const express = require('express');
const logDos = express.Router();
const db = require('../../lib/mysql');

logDos.post('/login-dosen', (req, res) => {
    const { noHp, password } = req.body; 
    
    const q = `SELECT * FROM dosen WHERE no_hp = ${noHp} AND password = '${password}'`;
    db.query(q, (err, result) => {
        if (err) {
            res.status(401).send({ error: 'Phone number or Password is incorrect' });
        } else {
            if (result.length === 0) {
                res.status(401).send({ error: 'Phone number or Password is incorrect' });
            }
            else {
                res.status(200).send({ result, message: 'Login Success' });
            }
        }
    });
});

module.exports = logDos;
