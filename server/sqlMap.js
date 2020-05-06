var sqlMap = {
    registered: {
        add: 'insert into user(userName, password, phone) values (?, ?, ?)',
        searchName: 'select * from user where userName = ?',
        searchPhone: 'select * from user where phone = ?',
        searchSaleName: 'select * from sale where userName = ?',
        searchSalePhone: 'select * from sale where phone = ?',
        addSale: 'insert into sale(userName, password, phone) values (?, ?, ?)'
    },
    login: {
        select: 'select * from user where userName = ? and password = ? and phone = ?',
        selectSale: 'select * from sale where userName = ? and password = ? and phone = ?'
    },
    sale: {
        list: 'select * from sale where userName = ?',
        save: 'update sale set password = ?, phone = ?, name = ?, address = ? where userName = ?',
        searchPhone: 'select * from sale where phone = ?'
    }
}

module.exports = sqlMap;