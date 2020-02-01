// node中使用const关键字进行模块的调用
const express = require('express');
const router = express.Router();

const DBHelper = require('../utils/DBHelper');
const sql = require('../sqlMap');

router.post('/test', (req, res) => {
    let conn = new DBHelper().getConn();
    conn.query(sql.user.test, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    })
})

module.exports = router;