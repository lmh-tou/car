const express = require('express')
const router = express.Router()

const DBHelper = require('../utils/DBHelper')
const sql = require('../sqlMap')
const moment = require('moment')


router.post('/userList', (req, res) => {
  let conn = new DBHelper().getConn()
  conn.query(sql.user.list, [req.body.userName], (err, result) => {
    res.json({ data: result, session: 1 })
  })
})

router.post('/save', (req, res) => {
  let conn = new DBHelper().getConn()
  let params = req.body
  conn.query(
    sql.user.save,
    [params.password, params.phone, params.name, params.address, params.userName],
    (err, result) => {
      res.json({ session: 1 })
    }
  )
})

router.post('/carList', (req, res) => {
  let conn = new DBHelper().getConn()
  conn.query(sql.user.carList, (err, result) => {
    result.forEach((item) => {
      item.time = moment(item.time).format('YYYY-MM')
    })
    res.json({ data: result, session: 1 })
  })
})

router.post('/search', (req, res) => {
  let conn = new DBHelper().getConn()
  if (req.body.brand == '') {
    conn.query(sql.user.carList, (err, result) => {
      result.forEach((item) => {
        item.time = moment(item.time).format('YYYY-MM')
      })
      res.json({ data: result, session: 1 })
    })
  } else {
    conn.query(sql.user.search, [req.body.brand], (err, result) => {
      result.forEach((item) => {
        item.time = moment(item.time).format('YYYY-MM')
      })
      res.json({ data: result, session: 1 })
    })
  }
})

router.post('/toCar', (req, res) => {
  let conn = new DBHelper().getConn()
  conn.query(sql.user.toCar, [req.body.id], (err, result) => {
    result.forEach((item) => {
      item.time = moment(item.time).format('YYYY-MM')
    })
    res.json({data: result, session: 1})
  })
})

router.post('/reservation', (req, res) => {
  let conn = new DBHelper().getConn()
  let params = req.body
  conn.query(sql.user.reservation, [params.userName, params.saleUserName, params.time, params.place, params.money, params.status, params.carId, params.label], (err, result) => {
    res.json({session: 1})
  })
})

router.post('/buy', (req, res) => {
  let conn = new DBHelper().getConn()
  conn.query(sql.user.buy, [req.body.carId, req.body.userName], (err, result) => {
    res.json({session: 1})
  })
})

module.exports = router
