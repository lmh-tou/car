const express = require('express')
const router = express.Router()

const DBHelper = require('../utils/DBHelper')
const sql = require('../sqlMap')
const moment = require('moment')

var multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'img/')
  },
  filename: function (req, file, cb) {
    var fileFormat = file.originalname.split('.')
    cb(null, file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1])
  },
})
var upload = multer({ storage: storage })
router.use(upload.single('file'))

var userName = ''

router.post('/list', (req, res) => {
  let conn = new DBHelper().getConn()
  conn.query(sql.sale.list, [req.body.saleUserName], (err, result) => {
    res.json({ data: result, session: 1 })
  })
})

router.post('/save', (req, res) => {
  let conn = new DBHelper().getConn()
  let params = req.body
  conn.query(
    sql.sale.save,
    [params.password, params.phone, params.name, params.address, params.userName],
    (err, result) => {
      res.json({ session: 1, code: 1 })
    }
  )
})

router.post('/upload', upload.single('file'), (req, res) => {
  let conn = new DBHelper().getConn()
  let sqlStr = sql.sale.upload
  conn.query(sqlStr, [req.file.filename, userName], (err, result) => {
    res.json({ session: 1 })
  })
})

router.post('/uploadCar', upload.single('file'), (req, res) => {
  let conn = new DBHelper().getConn()
  conn.query(sql.sale.selectSaleUserName, [userName], (err, result) => {
    if (result.length == 0) {
      conn.query(sql.sale.addUploadCar, [req.file.filename], (err, result) => {
        res.json({ session: 1 })
      })
    } else {
      conn.query(sql.sale.editUploadCar, [req.file.filename, userName], (err, result) => {
        res.json({ session: 1 })
      })
    }
  })
})

router.post('/uploadMessage', (req, res) => {
  let params = req.body
  userName = params.saleUserName
  let conn = new DBHelper().getConn()
  conn.query(
    sql.sale.uploadMessage,
    [
      params.brand,
      params.time,
      params.distance,
      params.money,
      params.describe1,
      params.saleUserName,
    ],
    (err, result) => {
      res.json({ session: 1 })
    }
  )
})

router.post('/addCar', (req, res) => {
  let conn = new DBHelper().getConn()
  let params = req.body
  conn.query(sql.sale.selectSaleUserName, [params.saleUserName], (err, result) => {
    if (result.length == 0) {
      conn.query(
        sql.sale.addCar,
        [
          params.money,
          params.brand,
          params.describe1,
          params.time,
          params.distance,
          params.saleUserName,
        ],
        (err, result) => {
          res.json({ session: 1 })
        }
      )
    } else {
      conn.query(
        sql.sale.editCar,
        [
          params.money,
          params.brand,
          params.describe1,
          params.time,
          params.distance,
          params.saleUserName,
        ],
        (err, result) => {
          res.json({ session: 1 })
        }
      )
    }
  })
})

router.post('/saleTable', (req, res) => {
  let conn = new DBHelper().getConn()
  let params = req.body
  userName = params.saleUserName
  conn.query(
    sql.sale.saleTable,
    [
      params.password,
      params.phone,
      params.name,
      params.address,
      params.describe1,
      params.money,
      params.brand,
      params.time,
      params.distance,
      userName,
    ],
    (err, result) => {
      res.json({ session: 1 })
    }
  )
})

router.post('/saleList', (req, res) => {
  let conn = new DBHelper().getConn()
  conn.query(sql.sale.saleList, (err, result) => {
    result.forEach((item) => {
      if (item.time) {
        item.time = moment(item.time).format('YYYY-MM')
      }
    })
    res.json({ data: result, session: 1 })
  })
})

router.post('/deleteOne', (req, res) => {
  let conn = new DBHelper().getConn()
  conn.query(sql.sale.deleteOne, [req.body.userName], (err, result) => {
    res.json({ session: 1 })
  })
})

router.post('/search', (req, res) => {
  let conn = new DBHelper().getConn()
  if (req.body.userName == '') {
    conn.query(sql.sale.saleList, (err, result) => {
      result.forEach((item) => {
        if (item.time) {
          item.time = moment(item.time).format('YYYY-MM')
        }
      })
      res.json({ data: result, session: 1 })
    })
  } else {
    conn.query(sql.sale.search, [req.body.userName], (err, result) => {
      result.forEach((item) => {
        if (item.time) {
          item.time = moment(item.time).format('YYYY-MM')
        }
      })
      res.json({ data: result, session: 1 })
    })
  }
})

router.post('/saleMessage', (req, res) => {
  let conn = new DBHelper().getConn()
  conn.query(sql.sale.saleMessage, [req.body.saleUserName], (err, result) => {
    res.json({data: result, session: 1})
  })
})

router.post('/selectUser', (req, res) => {
  let conn = new DBHelper().getConn()
  conn.query(sql.sale.selectUser, [req.body.userName], (err, result) => {
    res.json({data: result, session: 1})
  })
})

router.post('/cancel', (req, res) => {
  let conn = new DBHelper().getConn()
  conn.query(sql.sale.cancel, [req.body.id], (err, result) => {
    res.json({session: 1})
  })
})

router.post('/confirm', (req, res) => {
  let conn = new DBHelper().getConn()
  conn.query(sql.sale.confirm, [req.body.id], (err, result) => {
    res.json({session: 1})
  })
  conn.query(sql.sale.deleteCar, [req.body.carId], (err, result) => {
    res.json({session: 1})
  })
})

module.exports = router
