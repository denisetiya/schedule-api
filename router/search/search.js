const express = require('express')
const search = express.Router()
const db = require('../../lib/mysql')


search.get('/search/:title', (req, res) => {
  const title = req.params.title
  const q = `SELECT * FROM v_jadwal WHERE nama_matkul LIKE '%${title}%' OR dosen_pengampu LIKE '%${title}%' OR kelas LIKE '%${title}%'`
  db.query(q, (err, result) => {
    if (err) {
      res.status(500).send(err)
    }
    else {
      res.status(200).send(result)
    }
  })

})

module.exports = search