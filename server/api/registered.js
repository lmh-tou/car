const express = require('express')
const router = express.Router()

const DBHelper = require('../utils/DBHelper')
const sql = require('../sqlMap')

router.post('/add', (req, res) => {
  let conn = new DBHelper().getConn()
  let params = req.body
  if (params.radio == '1') {
    conn.query(sql.registered.searchName, [params.userName], (err, result) => {
      if (result.length != 0) {
        res.json({ code: 0, session: 1 })
      } else {
        conn.query(sql.registered.searchPhone, [params.phone], (err, result) => {
          if (result.length != 0) {
            res.json({ code: 2, session: 1 })
          } else {
            conn.query(
              sql.registered.add,
              [params.userName, params.password, params.phone],
              (err, result) => {
                res.json({ code: 1, session: 1 })
              }
            )
          }
        })
      }
    })
  } else {
    conn.query(sql.registered.searchSaleName, [params.userName], (err, result) => {
      if (result.length != 0) {
        res.json({ code: 0, session: 1 })
      } else {
        conn.query(sql.registered.searchSalePhone, [params.phone], (err, result) => {
          if (result.length != 0) {
            res.json({ code: 2, session: 1 })
          } else {
            conn.query(
              sql.registered.addSale,
              [params.userName, params.password, params.phone],
              (err, result) => {
                res.json({ code: 1, session: 1 })
              }
            )
          }
        })
      }
    })
  }
})

module.exports = router
