// node中使用const关键字进行模块的调用
const express = require('express');
const router = express.Router();

const DBHelper = require('../utils/DBHelper');
const sql = require('../sqlMap');

router.post('/add', (req, res) => {
    let conn = new DBHelper().getConn();
    let params = req.body
    conn.query(sql.registered.add, [params.userName, params.password, params.phone], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    })
})

module.exports = router;