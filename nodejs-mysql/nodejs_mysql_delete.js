// 引入mysql
const mysql = require('mysql');

// 连接mysql
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    port: '3306',
    database: 'test'
});

connection.connect();

// 删除语句
let sql = "delete from article where id = 10";

// 执行删除语句
connection.query(sql, (err, data) => {
    if (err) {
        throw err;
    }

    // 执行成功
    console.log('delete success!');
    console.log(data);
});

// 断开连接msyql
connection.end();