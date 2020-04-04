const express = require('express');
const router = express.Router();

const DBHelper = require('../utils/DBHelper');
const sql = require('../sqlMap');

router.post('/login', (req, res) => {
    let conn = new DBHelper().getConn();
    let params = req.body
    conn.query(sql.login.select, [params.userName, params.password, params.phone], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json({message: '登陆成功！'})
        }
    })
})

module.exports = router;