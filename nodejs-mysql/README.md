#### 先安装npm模块项目

```js
npm init
```

#### 安装mysql

```js
npm install mysql --save
```

#### Nodejs 连接msyql

```js
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

// 结束连接
connection.end();
```


#### 增

```js
// 引入mysql
const mysql = require('mysql');

// 连接myql
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    port: '3306',
    database: 'test',
});

connection.connect();

// 插入语句
let addSql = "insert into article (title, author, date) values (?, ?, now())";
let addSqlParams = ['Today is noce', 'Bob'];

// 执行插入语句
connection.query(addSql, addSqlParams, (err, result) => {
    if (err) {
        throw err;
    }

    // 插入成功输出
    console.log('插入成功');
    console.log(result);
});

// 断开连接msyql
connection.end();

```


#### 删

```js
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
```

#### 改

```js
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
```

#### 查

```js
// 导入mysql
const mysql = require('mysql');

// 连接mysql
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    port: '3306',
    database: 'test',
});

connection.connect();

// 查询语句
let sql = 'SELECT * FROM article';

// 执行查询语句
connection.query(sql, (err, data) => {
    if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        return;
    }

    // 查询成功
    console.log(data);
});
connection.end();

```