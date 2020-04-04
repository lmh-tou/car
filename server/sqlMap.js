var sqlMap = {
    registered: {
        add: 'insert into user(userName, password, phone) values (?, ?, ?)'
    },
    login: {
        select: 'select * from user where userName = ? and password = ? and phone = ?'
    }
}

module.exports = sqlMap;