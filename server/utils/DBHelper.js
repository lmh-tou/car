// 数据库连接助手
const mysql = require('mysql');

class DBHelper{
    // 获取数据库连接 以下配置根据自己的数据进行修改
    getConn(){
        let conn = mysql.createConnection({
            // 数据库连接配置
            host:'127.0.0.1',
            port:'3306', // 默认端口号都是这个，没改的话不用改这个
            user:'root', // 你的mysql用户名
            password:'123', // 你的mysql密码
            database:'luan'  // 你创建的数据库名
        });
        conn.connect();
        return conn;
    }
}

module.exports = DBHelper;