### nodejs+sequelize操作mysql数据库

[官网：https://github.com/demopark/sequelize-docs-Zh-CN](https://github.com/demopark/sequelize-docs-Zh-CN)

### 增加用户接口

```
/users
```

### 请求方式

```
post
```

#### 请求参数


参数名 | 需求 | 说明
---|--- |---
username | 必填 | 用户名
email | 必填 | 用户邮箱

#### 返回数据

```js
{
    "data": {
        "data": [
            {
                "id": 18,
                "username": "liangfengbo",
                "email": "bob@gmail.com",
                "createdAt": "2018-05-17T14:25:12.000Z",
                "updatedAt": "2018-05-17T14:25:12.000Z"
            }
        ]
    }
}
```


### 连接数据库

```js
// /module/db.js

const Sequelize = require('sequelize');
const sequelize = new Sequelize('test', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

module.exports = sequelize;

```


### 创建用户表 - 插入用户信息 - 查询用户信息

```js
// /module/user.js

var Sequelize = require('sequelize');
const Op = Sequelize.Op;

var sequelize = require('./db');

// 创建 model
var User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: Sequelize.STRING, // 指定值的类型
        field: 'username' // 指定存储在表中的键名称
    },
    // 没有指定 field，表中键名称则与对象键名相同，为 email
    email: {
        type: Sequelize.STRING
    },
}, {
    // 如果为 true 则表的名称和 model 相同，即 user
    // 为 false MySQL创建的表名称会是复数 users
    // 如果指定的表名称本就是复数形式则不变
    freezeTableName: false
});

// 创建表
// User.sync() 会创建表并且返回一个Promise对象
// 如果 force = true 则会把存在的表（如果users表已存在）先销毁再创建表
// 默认情况下 forse = false
var user = User.sync({force: false});

// 添加新用户
exports.addUser = function (username, email) {
    // 向 user 表中插入数据
    return User.create({
        username: username,
        email: email
    });
};

// 通过用户名查找用户
exports.findByName = function (params) {
    let username = params.username;
    return User.findAll({
        where: {
            username: username,
        }
    });
};

```

### 路由请求返回数据

```js
// /routers/users.js

var express = require('express');
var router = express.Router();
const user = require('../module/user');

/* GET users listing. */
router.post('/', function (req, res, next) {
    // 添加用户
    let _user = req.query;
    let username = _user.username;
    let email = _user.email;

    // 插入数据
    user.addUser(username, email).then(function () {
        // 查询新添加的用户
        return user.findByName({username: username});
    }).then(function (data) {
        res.json({
            data: {
                data
            }
        });
        res.end();
    });
});

module.exports = router;

```
