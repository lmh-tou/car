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

router.post('/editUser', (req, res) => {
  let conn = new DBHelper().getConn()
  let params = req.body
  conn.query(
    sql.admin.editUser,
    [params.password, params.phone, params.name, params.addressm, params.userName],
    (err, result) => {
      res.json({ session: 1 })
    }
  )
})

router.post('/orderList', (req, res) => {
  let conn = new DBHelper().getConn()
  conn.query(sql.admin.orderList, (err, result) => {
    result.forEach((item) => {
      if (item.time) {
        result.forEach((item) => {
          item.time = moment(item.time).format('YYYY-MM')
        })
      }
    })
    res.json({ data: result, session: 1 })
  })
})

router.post('/statusList', (req, res) => {
  let conn = new DBHelper().getConn()
  conn.query(sql.admin.statusList, (err, result) => {
    res.json({ data: result, session: 1 })
  })
})

router.post('/editOrder', (req, res) => {
  let conn = new DBHelper().getConn()
  let params = req.body
  let label
  if (params.status == 1) {
    label = '已完成'
  } else if (params.status == 2) {
    label = '已取消'
  } else if (params.status == 3) {
    label = '审核中'
  } else if (params.status == 4) {
    label = '已预订'
  } else if (params.status == 5) {
    label = '退货审核中'
  } else {
    label = '已申请'
  }
  conn.query(
    sql.admin.editOrder,
    [
      params.buy,
      params.sale,
      params.time,
      params.place,
      params.money,
      params.status,
      label,
      params.id,
    ],
    (err, result) => {
      res.json({ session: 1 })
    }
  )
})

router.post('/orderManageSearch', (req, res) => {
  let conn = new DBHelper().getConn()
  let params = req.body
  let sqlStr = ''
  let arr = []
  if (params.id == '' && params.value == '') {
    sqlStr = sql.admin.orderList
  } else if (params.id != '' && params.value == '') {
    sqlStr = sql.admin.orderById
    arr = [params.id]
  } else if (params.id == '' && params.value != '') {
    sqlStr = sql.admin.orderByStatus
    arr = [params.value]
  } else {
    sqlStr = sql.admin.orderByAll
    arr = [params.id, params.value]
  }
  conn.query(sqlStr, arr, (err, result) => {
    result.forEach((item) => {
      if (item.time) {
        result.forEach((item) => {
          item.time = moment(item.time).format('YYYY-MM')
        })
      }
    })
    res.json({ data: result, session: 1 })
  })
})

module.exports = router
