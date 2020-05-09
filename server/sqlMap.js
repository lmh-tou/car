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
        searchPhone: 'select * from sale where phone = ?',
        upload: 'update sale set img = ? where userName = ?',
        uploadMessage: 'update sale set brand = ?, time = ?, distance = ?, money = ?, describe1 = ? where userName = ?',
        saleList: 'select * from sale',
        deleteOne: 'delete from sale where userName = ?',
        search: 'select * from sale where userName = ?',
        saleTable: 'update sale set password = ?, phone = ?, name = ?, address = ?, describe1 = ?, money = ?, brand = ?, time = ?, distance = ? where userName = ?',
        addCar: 'insert into car(money, brand, describe1, time, distance, saleUserName) values (?, ?, ?, ?, ?, ?)',
        selectSaleUserName: 'select * from car where saleUserName = ?',
        editCar: 'update car set money = ?, brand = ?, describe1 = ?, time = ?, distance = ? where saleUserName = ?',
        addUploadCar: 'insert into car(img) values (?)',
        editUploadCar: 'update car set img = ? where saleUserName = ?',
        saleMessage: 'select * from orderList where sale = ?',
        selectUser: 'select * from user where userName = ?',
        cancel: 'update orderList set status = 2, label = "已取消" where id = ?',
        confirm: 'update orderList set status = 1, label = "已完成" where id = ?',
        deleteCar: 'delete from car where id = ?'
    },
    admin: {
        list: 'select * from orderList where status = 3',
        agree: 'update orderList set status = 1, label = "已完成" where id = ?',
        returnList: 'select * from orderList where status = 5',
        returnCar: 'update orderList set status = 2, label = "已取消" where id = ?',
        apply: 'update orderList set status = 6, label = "已申请" where id = ?',
        getUserList: 'select * from user',
        deleteOne: 'delete from user where userName = ?',
        search:'select * from user where userName = ?',
        editUser: 'update user set password = ?, phone = ?, name = ?, address  = ? where userName = ?',
        orderList: 'select * from orderList',
        statusList: 'select * from status',
        editOrder: 'update orderList set buy = ?, sale = ?, time = ?, place = ?, money = ?, status = ?, label = ? where id = ?',
        orderById: 'select * from orderList where id = ?',
        orderByStatus: 'select * from orderList where status = ?',
        orderByAll: 'select * from orderList where id = ? and status = ?'
    }
}

module.exports = sqlMap;