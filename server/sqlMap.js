var sqlMap = {
    registered: {
        add: 'insert into user(userName, password, phone) values (?, ?, ?)',
        searchName: 'select * from user where userName = ?',
        searchSaleName: 'select * from sale where userName = ?',
        addSale: 'insert into sale(userName, password, phone) values (?, ?, ?)'
    },
    login: {
        select: 'select * from user where userName = ? and password = ? and phone = ?',
        selectSale: 'select * from sale where userName = ? and password = ? and phone = ?'
    }
}

module.exports = sqlMap;