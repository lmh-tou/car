const express = require('express')
const router = express.Router()

const DBHelper = require('../utils/DBHelper')
const sql = require('../sqlMap')

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
      res.json({session: 1})
  })
})

router.post('/uploadMessage', (req, res) => {
  let params = req.body
  userName = params.saleUserName
  let conn = new DBHelper().getConn()
  conn.query(sql.sale.uploadMessage, [params.brand, params.time, params.distance, params.money, params.describe1, params.saleUserName], (err, result) => {
    res.json({session: 1})
  })
})

module.exports = router
