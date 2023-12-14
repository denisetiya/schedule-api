const express = require('express')
const pass = express.Router()
const db = require('../../lib/mysql')


pass.post('/change-password', (req, res) => {
    const { npm,Lastpassword, password } = req.body
    const q = `SELECT * FROM mahasiswa WHERE npm = ${npm} and password = '${Lastpassword}'`
    db.query(q, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } 
        else if (result.length === 0) {
            res.status(200).send('npm tidak terdaftar')
        }
        else {
            const q = `UPDATE mahasiswa SET password = '${password}' WHERE npm = '${npm}'`
            db.query(q, (err, result) => {
                if (err) {
                    res.status(500).send(err)
                }
                else {
                    res.status(200).send(result)
                }
            })
        }
    })   
})

pass.post('/cek-passwordMhs/:id', (req, res) => {
    const id = req.params.id
    const { password } = req.body
    const q = `SELECT * FROM mahasiswa WHERE npm = ${id} and password = '${password}'`
    db.query(q, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } 
        else if (result.length === 0) {
            res.status(250).send('password tidak sesuai')
        }
        else {
            res.status(200).send(result)
        }
    })

})

pass.put('/update-passwordMhs/:id', (req, res) => {
    const id = req.params.id
    const { password } = req.body
    const q = `UPDATE mahasiswa SET password = '${password}' WHERE npm = '${id}'`
    db.query(q, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } 
        else {
            res.status(200).send(result)
        }
    })
})

pass.post('/cek-passwordDsn/:id', (req, res) => {
    const id = req.params.id
    const { password } = req.body
    const q = `SELECT * FROM dosen WHERE no_hp = ${id} and password = '${password}'`
    db.query(q, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } 
        else if (result.length === 0) {
            res.status(250).send('password tidak sesuai')
        }
        else {
            res.status(200).send(result)
        }
    })
})

pass.put('/update-passwordDsn/:id', (req, res) => {
    const id = req.params.id
    const { password } = req.body
    const q = `UPDATE dosen SET password = '${password}' WHERE no_hp = '${id}'`
    db.query(q, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } 
        else {
            res.status(200).send(result)
        }
    })
})

module.exports = pass