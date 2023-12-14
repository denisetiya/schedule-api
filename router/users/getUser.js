const express = require('express');
const user = express.Router();
const db = require('../../lib/mysql');
const jwt = require('jsonwebtoken');
const multer = require('multer');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./assets/users");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});



const upload = multer({ storage: storage });

user.put('/updateMahasiswa/:id', (req, res) => {
    const id = req.params.id
    const { username, email } = req.body
    const q = `UPDATE mahasiswa SET nama_mahasiswa = '${username}', email = '${email}' WHERE npm = ${id}`
    db.query(q, (err, result) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(result)
        }
    })
    
})
user.put('/updateDosen/:id', (req, res) => {
    const id = req.params.id
    const { username, email } = req.body
    const q = `UPDATE dosen SET nama_dosen = '${username}', email = '${email}' WHERE no_hp = ${id}`
    db.query(q, (err, result) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(result)
        }
    })
    
})

user.get('/mahasiswa/:npm', (req, res) => {
    const npm = req.params.npm
    const q = `SELECT * FROM mahasiswa WHERE npm = ${npm}`;
    db.query(q, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } 
        else if (result.length === 0) {
            res.status(200).send('npm tidak terdaftar')
        }
        else {
            res.status(200).send(result)
        }
    })
})

user.get('/dosen', (req, res) => {
 const q = `SELECT * FROM dosen`;
 db.query(q, (err, result) => {
     if (err) {
         res.status(500).send(err)
     }
     else {
         res.status(200).send(result)
     }
 })   
})

user.get('/dosen/:id', (req, res) => {
    const id = req.params.id;
    const q = `SELECT * FROM dosen WHERE no_hp = ${id}`;
    db.query(q, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } 
        else if (result.length === 0) {
            res.status(200).send('tidak terdaftar')
        }
        else {
            res.status(200).send(result)
        }
    })
})

user.put('/update-dosen/:id', upload.single("img"),(req, res) => {
    const id = req.params.id
    const{username,email} = req.body;
    const img_url = req.file.path
    const q = `UPDATE dosen SET nama_dosen = '${username}', email = '${email}', foto_dosen = '${img_url}' WHERE no_hp = ${id}`
    db.query(q, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } 
        else {
            res.status(200).send(result)
        }
    })
})

user.put('/update-mahasiswa/:id', upload.single("img"),(req, res) => {
    const id = req.params.id
    const img_url = req.file.path
    const{username,email} = req.body;
    const q = `UPDATE mahasiswa SET nama_mahasiswa = '${username}', email = '${email}',foto_mahasiswa = '${img_url}' WHERE npm = ${id}`
    db.query(q, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } 
        else {
            res.status(200).send(result)
        }
    })
})

module.exports = user