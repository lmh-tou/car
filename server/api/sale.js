const express = require('express')
const router = express.Router()

const DBHelper = require('../utils/DBHelper')
const sql = require('../sqlMap')

router.post('/list', (req, res) => {
  let conn = new DBHelper().getConn()
  conn.query(sql.sale.list, [req.body.saleUserName], (err, result) => {
    res.json({ data: result, session: 1 })
  })
})

router.post('/save', (req, res) => {
  let conn = new DBHelper().getConn()
  let params = req.body
  conn.query(sql.sale.searchPhone, [params.phone], (err, result) => {
    if (result.length != 0) {
      res.json({ code: 0, session: 1 })
    } else {
      conn.query(
        sql.sale.save,
        [params.password, params.phone, params.name, params.address, params.userName],
        (err, result) => {
          res.json({ session: 1 , code: 1})
        }
      )
    }
  })
})

module.exports = router
