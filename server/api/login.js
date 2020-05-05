const express = require('express')
const router = express.Router()

const DBHelper = require('../utils/DBHelper')
const sql = require('../sqlMap')

router.post('/login', (req, res) => {
  let conn = new DBHelper().getConn()
  let params = req.body
  if (params.identity == '1') {
    conn.query(
      sql.login.select,
      [params.userName, params.password, params.phone],
      (err, result) => {
        if (err) {
          res.json(err)
        } else {
          if (result.length != 0) {
            res.json({ message: '登陆成功！', code: 1, session: 1, identity: '买家' })
          } else {
            res.json({ message: '信息输入错误', code: 2, session: 1, identity: '买家' })
          }
        }
      }
    )
  } else if (params.identity == '2') {
    conn.query(
      sql.login.selectSale,
      [params.userName, params.password, params.phone],
      (err, result) => {
        if (err) {
          res.json(err)
        } else {
          if (result.length != 0) {
            res.json({ message: '登陆成功！', code: 1, session: 1, identity: '卖家' })
          } else {
            res.json({ message: '信息输入错误', code: 2, session: 1, identity: '卖家' })
          }
        }
      }
    )
  } else {
    if (params.userName == 'admin') {
      conn.query(
        sql.login.select,
        [params.userName, params.password, params.phone],
        (err, result) => {
          if (err) {
            res.json(err)
          } else {
            if (result.length != 0) {
              res.json({ message: '登陆成功！', code: 1, session: 1, identity: '管理员' })
            } else {
              res.json({ message: '信息输入错误', code: 2, session: 1, identity: '管理员' })
            }
          }
        }
      )
    } else {
        res.json({ message: '信息输入错误', code: 2, session: 1, identity: '管理员' })
    }
  }
})

module.exports = router
