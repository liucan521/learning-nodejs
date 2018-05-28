// 导入mysql
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

// 更新语句
let modSql = "update article set title = ?, author = ? where id like ?";
let modSqlParams = ['今晚学习nodejs', '一波万波', 12];

// 执行更新语句
connection.query(modSql, modSqlParams, (err, data) => {
    if (err) {
        throw err;
    }
    console.log('upload success!');
    console.log(data)
});

connection.end();