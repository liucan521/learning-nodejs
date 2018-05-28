### 学习目标：

```
一、学习mysql基本命令行
二、使用nodejs操作mysql
```


### 一、学习mysql基本命令行


在终端或cmd黑窗口输入：

```
➜  myproject mysql -uroot -p
Enter password:
```

输入密码即可进入数据库，进行命令操作

#### 查询本机数据库: show databases;

```shell
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| test               |
+--------------------+
5 rows in set (0.01 sec)
```

#### 创建数据库: create database '数据库名字';

```
create database test;
Query OK, 1 row affected (0.01 sec)
```

#### 查询数据库下的表：show tables;

```shell
mysql> show tables;
+----------------+
| Tables_in_test |
+----------------+
| article        |
| article2       |
| cagety         |
| user           |
| wechat         |
| wechat_list    |
+----------------+
6 rows in set (0.00 sec)

```


#### 选择数据库: use test;

```
mysql> use test;
Database changed
```

#### 向数据表插入数据: insert into article ('键值', '键值', '键值') values ('内容', '内容', '内容')

```
mysql> # 插入数据
mysql>
mysql> insert into article (title, author, date)
    -> values
    -> ('我想吃肉', 'bob', now());
Query OK, 1 row affected, 1 warning (0.01 sec)
```


#### 查询数据表下的结构：show columns from '数据表名称';

```shell
mysql> show columns from article;
+--------+-------------+------+-----+---------+----------------+
| Field  | Type        | Null | Key | Default | Extra          |
+--------+-------------+------+-----+---------+----------------+
| id     | int(11)     | NO   | PRI | NULL    | auto_increment |
| title  | varchar(50) | YES  |     | NULL    |                |
| author | varchar(50) | YES  |     | NULL    |                |
| date   | date        | YES  |     | NULL    |                |
+--------+-------------+------+-----+---------+----------------+
4 rows in set (0.00 sec)

mysql>
```


#### 查询数据表下的所有内容：select * from '数据库表';

```shell
mysql> select * from article;
+----+-----------------------------------+---------------+------------+
| id | title                             | author        | date       |
+----+-----------------------------------+---------------+------------+
|  1 | 今晚聚餐哦!                       | bob           | 2018-05-01 |
|  2 | 我想吃肉                          | bob           | 2018-05-01 |
|  4 | 好呀，今晚买多点牛肉丸            | shaw          | 2018-05-01 |
|  6 | 一波万波                          | yibowanbo.com | 2018-04-30 |
|  8 | 一波                              | bo            | 2018-05-01 |
|  9 | 万波                              | wanbo         | 2018-05-01 |
+----+-----------------------------------+---------------+------------+
6 rows in set (0.00 sec)

mysql>
```

#### 根据条件查询数据表下的内容：

  select * from '数据库表' where '键值' = '条件';

  select '键值' from '数据库表';

```shell
mysql> select * from article where id = 2;
+----+--------------+--------+------------+
| id | title        | author | date       |
+----+--------------+--------+------------+
|  2 | 我想吃肉     | bob    | 2018-05-01 |
+----+--------------+--------+------------+
1 row in set (0.00 sec)

mysql>

# 也是可以使用like，like等于=号

mysql> select * from article where id like 2;
+----+--------------+--------+------------+
| id | title        | author | date       |
+----+--------------+--------+------------+
|  2 | 我想吃肉     | bob    | 2018-05-01 |
+----+--------------+--------+------------+
1 row in set (0.00 sec)

mysql>

mysql> select author from article;
+---------------+
| author        |
+---------------+
| bob           |
| bob           |
| shaw          |
| yibowanbo.com |
| bo            |
| wanbo         |
+---------------+
6 rows in set (0.00 sec)

mysql>
```


#### 修改数据表数据：update '数据库表' set '要修改的字段键值' = '修改的内容' where 条件


```shell
update article set title='今晚聚餐哦!' where id = 1;

mysql> update article set title='今晚聚餐哦!' where id = 1;
Query OK, 1 row affected (0.01 sec)
Rows matched: 1  Changed: 1  Warnings: 0

```

#### 删除数据表里面的数据：delete from '数据表' where 条件;

```
delete from article where id = 3;

mysql> # 删除数据表里面的数据
mysql>
mysql> delete from article where id = 3;
Query OK, 1 row affected (0.00 sec)
```


#### union用法：select '键' from '数据库表1' union select '键' from '数据库表2';
链接查询多表之间相同的键值，返回不重复键值

MySQL UNION 操作符用于连接两个以上的 SELECT 语句的结果组合到一个结果集合中。多个 SELECT 语句会删除重复的数据。


```shell
mysql> select * from user;
+----+-----------+
| id | username  |
+----+-----------+
|  1 | 林大和    |
|  4 | 梁凤波    |
+----+-----------+
2 rows in set (0.00 sec)

mysql> select * from wechat_list;
+----+-----------+
| id | username  |
+----+-----------+
|  1 | 量风波    |
|  2 | 梁凤波    |
+----+-----------+
2 rows in set (0.00 sec)

mysql> select username from user union select username from wechat_list;
+-----------+
| username  |
+-----------+
| 林大和    |
| 梁凤波    |
| 量风波    |
+-----------+
3 rows in set (0.00 sec)

mysql>
```

#### 降升排序：select * from '数据库表' order by 键值 ASC;

```shell
select * from '数据库表' order by 键值 ASC;

ASC升序

DESC 降序

mysql>
mysql>
mysql> select * from article order by title ASC;
+----+-----------------------------------+---------------+------------+
| id | title                             | author        | date       |
+----+-----------------------------------+---------------+------------+
|  6 | 一波万波                          | yibowanbo.com | 2018-04-30 |
|  1 | 今晚聚餐哦!                       | bob           | 2018-05-01 |
|  4 | 好呀，今晚买多点牛肉丸            | shaw          | 2018-05-01 |
|  2 | 我想吃肉                          | bob           | 2018-05-01 |
+----+-----------------------------------+---------------+------------+
4 rows in set (0.00 sec)

mysql>
mysql> select * from article order by title DESC;
+----+-----------------------------------+---------------+------------+
| id | title                             | author        | date       |
+----+-----------------------------------+---------------+------------+
|  2 | 我想吃肉                          | bob           | 2018-05-01 |
|  4 | 好呀，今晚买多点牛肉丸            | shaw          | 2018-05-01 |
|  1 | 今晚聚餐哦!                       | bob           | 2018-05-01 |
|  6 | 一波万波                          | yibowanbo.com | 2018-04-30 |
+----+-----------------------------------+---------------+------------+
4 rows in set (0.00 sec)
```

#### 统计分组：select date, count(*) from article group by date;

```shell
mysql> select * from article;
+----+-----------------------------------+---------------+------------+
| id | title                             | author        | date       |
+----+-----------------------------------+---------------+------------+
|  1 | 今晚聚餐哦!                       | bob           | 2018-05-01 |
|  2 | 我想吃肉                          | bob           | 2018-05-01 |
|  4 | 好呀，今晚买多点牛肉丸            | shaw          | 2018-05-01 |
|  6 | 一波万波                          | yibowanbo.com | 2018-04-30 |
+----+-----------------------------------+---------------+------------+
4 rows in set (0.00 sec)

mysql>
mysql> select date, count(*) from article group by date;
+------------+----------+
| date       | count(*) |
+------------+----------+
| 2018-04-30 |        1 |
| 2018-05-01 |        3 |
+------------+----------+
2 rows in set (0.00 sec)
```


#### NULL运用

```
# 直接等是查询不出来的，需要用is null或is not null

mysql> select * from cagety where count like NULL;
Empty set (0.00 sec)

mysql>
mysql> select * from cagety where count is NULL;
+--------+-------+
| author | count |
+--------+-------+
| go     |  NULL |
| css    |  NULL |
+--------+-------+
2 rows in set (0.00 sec)

mysql>
mysql> select * from cagety where count is not null;
+--------+-------+
| author | count |
+--------+-------+
| go     |    20 |
| html   |    20 |
| nodejs |    10 |
| php    |    30 |
+--------+-------+
4 rows in set (0.00 sec)

mysql>
```


#### mysql 正则使用

```shell
mysql> SELECT name FROM person_tbl WHERE name REGEXP '^st';
查找name字段中以'ok'为结尾的所有数据：

mysql> SELECT name FROM person_tbl WHERE name REGEXP 'ok$';
查找name字段中包含'mar'字符串的所有数据：

mysql> SELECT name FROM person_tbl WHERE name REGEXP 'mar';
查找name字段中以元音字符开头或以'ok'字符串结尾的所有数据：

mysql> SELECT name FROM person_tbl WHERE name REGEXP '^[aeiou]|ok$';

mysql> select * from article
    -> ;
+----+-----------------------------------+---------------+------------+
| id | title                             | author        | date       |
+----+-----------------------------------+---------------+------------+
|  1 | 今晚聚餐哦!                       | bob           | 2018-05-01 |
|  2 | 我想吃肉                          | bob           | 2018-05-01 |
|  4 | 好呀，今晚买多点牛肉丸            | shaw          | 2018-05-01 |
|  6 | 一波万波                          | yibowanbo.com | 2018-04-30 |
|  8 | 一波                              | bo            | 2018-05-01 |
|  9 | 万波                              | wanbo         | 2018-05-01 |
+----+-----------------------------------+---------------+------------+
6 rows in set (0.00 sec)

mysql>
mysql> select title from article where title  REGEXP '^波';
Empty set (0.00 sec)

mysql>
mysql>
mysql> select title from article where title  REGEXP '^一';
+--------------+
| title        |
+--------------+
| 一波万波     |
| 一波         |
+--------------+
2 rows in set (0.00 sec)

mysql>
mysql> select title from article where title  REGEXP '波$';
+--------------+
| title        |
+--------------+
| 一波万波     |
| 一波         |
| 万波         |
+--------------+
3 rows in set (0.00 sec)
mysql>
mysql>
mysql>
mysql> select author from article where author regexp 'o';
+---------------+
| author        |
+---------------+
| bob           |
| bob           |
| yibowanbo.com |
| bo            |
| wanbo         |
+---------------+
5 rows in set (0.00 sec)
```


#### 增加字段

```shell
mysql> # 增加字段
mysql>
mysql> alter table article add content varchar(200);
Query OK, 0 rows affected (0.07 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql>
mysql> show columns from article;
+---------+--------------+------+-----+---------+----------------+
| Field   | Type         | Null | Key | Default | Extra          |
+---------+--------------+------+-----+---------+----------------+
| id      | int(11)      | NO   | PRI | NULL    | auto_increment |
| title   | varchar(100) | NO   |     | NULL    |                |
| author  | varchar(40)  | NO   |     | NULL    |                |
| date    | date         | YES  |     | NULL    |                |
| content | varchar(200) | YES  |     | NULL    |                |
+---------+--------------+------+-----+---------+----------------+
5 rows in set (0.00 sec)

mysql> # 删除字段
```

#### 删除字段

```shell
mysql>
mysql> alter table article drop content;
Query OK, 0 rows affected (0.06 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql>
mysql> show columns from article;
+--------+--------------+------+-----+---------+----------------+
| Field  | Type         | Null | Key | Default | Extra          |
+--------+--------------+------+-----+---------+----------------+
| id     | int(11)      | NO   | PRI | NULL    | auto_increment |
| title  | varchar(100) | NO   |     | NULL    |                |
| author | varchar(40)  | NO   |     | NULL    |                |
| date   | date         | YES  |     | NULL    |                |
+--------+--------------+------+-----+---------+----------------+
4 rows in set (0.00 sec)

mysql> select * from article;
+----+-----------------------------------+---------------+------------+
| id | names                             | author        | date       |
+----+-----------------------------------+---------------+------------+
|  1 | 今晚聚餐哦!                       | bob           | 2018-05-01 |
|  2 | 我想吃肉                          | bob           | 2018-05-01 |
|  4 | 好呀，今晚买多点牛肉丸            | shaw          | 2018-05-01 |
|  6 | 一波万波                          | yibowanbo.com | 2018-04-30 |
|  8 | 一波                              | bo            | 2018-05-01 |
|  9 | 万波                              | wanbo         | 2018-05-01 |
+----+-----------------------------------+---------------+------------+
6 rows in set (0.00 sec)
```


#### 修改字段的类型和键值

```shell
mysql>
mysql> alter table article change names title varchar(50);
Query OK, 0 rows affected (0.03 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> select * from article;
+----+-----------------------------------+---------------+------------+
| id | title                             | author        | date       |
+----+-----------------------------------+---------------+------------+
|  1 | 今晚聚餐哦!                       | bob           | 2018-05-01 |
|  2 | 我想吃肉                          | bob           | 2018-05-01 |
|  4 | 好呀，今晚买多点牛肉丸            | shaw          | 2018-05-01 |
|  6 | 一波万波                          | yibowanbo.com | 2018-04-30 |
|  8 | 一波                              | bo            | 2018-05-01 |
|  9 | 万波                              | wanbo         | 2018-05-01 |
+----+-----------------------------------+---------------+------------+
6 rows in set (0.00 sec)
```


#### 修改字段的类型

```shell
mysql>
mysql> alter table article modify author varchar(50);
Query OK, 0 rows affected (0.07 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql>
mysql> show columns from article;
+--------+-------------+------+-----+---------+----------------+
| Field  | Type        | Null | Key | Default | Extra          |
+--------+-------------+------+-----+---------+----------------+
| id     | int(11)     | NO   | PRI | NULL    | auto_increment |
| title  | varchar(50) | YES  |     | NULL    |                |
| author | varchar(50) | YES  |     | NULL    |                |
| date   | date        | YES  |     | NULL    |                |
+--------+-------------+------+-----+---------+----------------+
4 rows in set (0.00 sec)

```


#### 修改设置默认值

```shell
mysql>
mysql> alter table article alter date set default '2018-05-03';
Query OK, 0 rows affected (0.03 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> show columns from article;
+--------+-------------+------+-----+------------+----------------+
| Field  | Type        | Null | Key | Default    | Extra          |
+--------+-------------+------+-----+------------+----------------+
| id     | int(11)     | NO   | PRI | NULL       | auto_increment |
| title  | varchar(50) | YES  |     | NULL       |                |
| author | varchar(50) | YES  |     | NULL       |                |
| date   | date        | YES  |     | 2018-05-03 |                |
+--------+-------------+------+-----+------------+----------------+
4 rows in set (0.00 sec)

mysql>
```

#### 删除默认值

```
mysql> alter table article alter date drop default;
Query OK, 0 rows affected (0.03 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> show columns from article;
+--------+-------------+------+-----+---------+----------------+
| Field  | Type        | Null | Key | Default | Extra          |
+--------+-------------+------+-----+---------+----------------+
| id     | int(11)     | NO   | PRI | NULL    | auto_increment |
| title  | varchar(50) | YES  |     | NULL    |                |
| author | varchar(50) | YES  |     | NULL    |                |
| date   | date        | YES  |     | NULL    |                |
+--------+-------------+------+-----+---------+----------------+
4 rows in set (0.00 sec)

mysql>
```

### 二、使用nodejs操作mysql


#### 先初始化一个项目

```js
npm init
```

#### 安装mysql

```js
npm install mysql --save
```

#### 新建一个文件app.js，使用Nodejs 连接msyql

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


#### nodejs操作mysql增加数据

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


#### nodejs操作mysql删除数据

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

#### nodejs操作mysql更改数据

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

#### nodejs操作mysql查询数据

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