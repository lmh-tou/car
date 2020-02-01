// sql语句
var sqlMap = {
    user: {
        // 添加用户
        add: 'insert into user(name, password, nickname) values (?, ?, ?)',
        // 查询用户
        select_user: 'select * from user where name = ? and password = ?',
        select: 'select * from user where name = ?',
        test: 'select * from user'
    }
}

module.exports = sqlMap;