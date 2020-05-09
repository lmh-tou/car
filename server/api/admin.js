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
    res.json({ data: result, session: 1 })
  })
})

router.post('/Returnlist', (req, res) => {
  let conn = new DBHelper().getConn()
  conn.query(sql.admin.returnList, (err, result) => {
    result.forEach((item) => {
      item.time = moment(item.time).format('YYYY-MM')
    })
    res.json({ data: result, session: 1 })
  })
})

router.post('/returnCar', (req, res) => {
  let conn = new DBHelper().getConn()
  conn.query(sql.admin.returnCar, [req.body.id], (err, result) => {
    res.json({ data: result, session: 1 })
  })
})

router.post('/apply', (req, res) => {
  let conn = new DBHelper().getConn()
  conn.query(sql.admin.apply, [req.body.id], (err, result) => {
    res.json({ data: result, session: 1 })
  })
})

router.post('/userList', (req, res) => {
  let conn = new DBHelper().getConn()
  conn.query(sql.admin.getUserList, (err, result) => {
    res.json({ data: result, session: 1 })
  })
})

router.post('/deleteOne', (req, res) => {
  let conn = new DBHelper().getConn()
  conn.query(sql.admin.deleteOne, [req.body.userName], (err, result) => {
    res.json({ data: result, session: 1 })
  })
})

router.post('/search', (req, res) => {
  let conn = new DBHelper().getConn()
  if (req.body.userName == '') {
    conn.query(sql.admin.getUserList, (err, result) => {
      res.json({ data: result, session: 1 })
    })
  } else {
    conn.query(sql.admin.search, [req.body.userName], (err, result) => {
      res.json({ data: result, session: 1 })
    })
  }
})

module.exports = router
