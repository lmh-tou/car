const express = require('express')
const router = express.Router()

const DBHelper = require('../utils/DBHelper')
const sql = require('../sqlMap')
const moment = require('moment')

router.post('/list', (req, res) => {
  let conn = new DBHelper().getConn()
  conn.query(sql.admin.list, (err, result) => {
    result.forEach((item) => {
      item.time = moment(item.time).format('YYYY-MM')
    })
    res.json({ data: result, session: 1 })
  })
})

router.post('/agree', (req, res) => {
    let conn = new DBHelper().getConn()
    conn.query(sql.admin.agree, [req.body.id], (err, result) => {
        res.json({data: result, session: 1})
    })
})

module.exports = router
