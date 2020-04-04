// sql语句
var sqlMap = {
    registered: {
        // 添加用户
        add: 'insert into user(userName, password, phone) values (?, ?, ?)'
    }
}

module.exports = sqlMap;