const express = require('express')
const mk = express.Router()
const db = require('../lib/mysql')



mk.get('/mk', (req, res) => {
  const q = 'SELECT * FROM matakuliah'
  db.query(q, (err, result) => {
    if (err) {
      res.status(500).send(err)
    }
    else {
      res.status(200).send(result)
    }
  })
})

mk.get('/gedung', (req, res) => {
  const q = 'SELECT * FROM gedung'
  db.query(q, (err, result) => {
    if (err) {
      res.status(500).send(err)
    }
    else {
      res.status(200).send(result)
    }
  })
})

mk.get('/dosen', (req, res) => {
  const q = 'SELECT id, concat(gelar_depan ," ", nama_dosen, " ", gelar_belakang) as nama, email, no_hp FROM dosen'
  db.query(q, (err, result) => {
    if (err) {
      res.status(500).send(err)
    }
    else {
      res.status(200).send(result)
    }
  })
})


mk.get('/ruangan', (req, res) => {
  const q = 'SELECT * FROM ruangan'
  db.query(q, (err, result) => {
    if (err) {
      res.status(500).send(err)
    }
    else {
      res.status(200).send(result)
    }
  })
})



module.exports = mk