const express = require('express')
const router = express.Router()

const DBHelper = require('../utils/DBHelper')
const sql = require('../sqlMap')

router.post('/userList', (req, res) => {
  let conn = new DBHelper().getConn()
  conn.query(sql.user.list, [req.body.userName], (err, result) => {
    res.json({ data: result, session: 1 })
  })
})

router.post('/save', (req, res) => {
  let conn = new DBHelper().getConn()
  let params = req.body
  conn.query(sql.user.save, [params.password, params.phone, params.name, params.address, params.userName], (err, result) => {
    res.json({ session: 1 })
  })
})

module.exports = router
