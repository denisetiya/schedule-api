const express = require('express');
const ruangan = express.Router();
const db = require('../lib/mysql');


ruangan.get('/ruangan', (req, res) => {

  const q = 'SELECT * FROM ruangan limit 20';


  db.query(q, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    } else if (result.length === 0) {
      return res.status(200).send('Tidak ada ruangan');
    } else {
      return res.status(200).json(result);
    }
  })

})

ruangan.get('/ruangan/:hari/:jam', (req, res) => {
  const { hari, jam } = req.params;


  if (!hari || !jam) {
    return res.status(400).send('Invalid input parameters');
  }

  const q = `
      SELECT
      v_ruang.nama_ruangan,
      v_ruang.nama_gedung,
      MAX(
        CASE
          WHEN v_ruang.hari = ? AND TIME(?) BETWEEN v_ruang.awal AND v_ruang.akhir THEN ''
          ELSE 'available'
        END
      ) AS status
    FROM v_ruang
    WHERE nama_gedung = 'Sains dan Teknologi B'
    GROUP BY v_ruang.nama_ruangan, v_ruang.nama_gedung;
  `;

  db.query(q, [hari, jam], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    } else if (result.length === 0) {
      return res.status(200).send('Tidak ada ruangan');
    } else {
      return res.status(200).json(result);
    }
  });
});

ruangan.post('/ruangan-view/', (req, res) => {
  const { id } = req.body;
  console.log(id);
  const q = `select * from ruangan where nama_ruangan = '${id}'`;

  db.query(q, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }else {
      return res.status(200).json(result);
    }
  })
  
})

module.exports = ruangan;
