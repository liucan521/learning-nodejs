#### koa2安装

```
npm install koa --save
```

#### koa-generator生成koa2项目

```
npm install koa-generator -g

koa2 project_name

➜  koa2-myproject koa2 project_name

   create : project_name
   create : project_name/package.json
   create : project_name/app.js
   create : project_name/public
   create : project_name/public/javascripts
   create : project_name/public/images
   create : project_name/public/stylesheets
   create : project_name/public/stylesheets/style.css
   create : project_name/routes
   create : project_name/routes/index.js
   create : project_name/routes/users.js
   create : project_name/views
   create : project_name/views/index.pug
   create : project_name/views/layout.pug
   create : project_name/views/error.pug
   create : project_name/bin
   create : project_name/bin/www

   install dependencies:
     $ cd project_name && npm install

   run the app:
     $ DEBUG=project_name:* npm start

```

#### 路由参数

```
router.get('/:id', function (ctx, next) {
    let id = ctx.params.id;
    ctx.body = "your id is:" + id + ", thank you !";
})
```


#### get请求参数

```
router.get('/', function (ctx, next) {
    let id = ctx.request.query.id;
    ctx.body = "your id is:" + id + ", thank you !";
})
```

#### post请求参数


```
router.get('/', function (ctx, next) {
    let id = ctx.request.body.id;
    ctx.body = "your id is:" + id + ", thank you !";
})
```

#### post请求新增用户接口

```
router.post('/', async (ctx, next) => {
    let _user = ctx.query;
    let username = _user.username;
    let email = _user.email;
    // 插入数据
    await user.addUser(username, email).then(function (ret) {
        // 查询新添加的用户
        return user.findByName({id: ret.id});
    }).then(function (data) {
        ctx.body = {
            data: data
        }
    });
})
```

#### 处理数据库

```
// module/users.js

// user.js

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
    return User.findOne({
        where: {
            id: params.id,
        }
    });
};

```

#### 连接mysql数据库

```js
// module/db.js

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