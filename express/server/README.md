使用sequelize管理数据库

```js
const Sequelize = require('sequelize');
const sequelize = new Sequelize('blog', 'root', 'password', {
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



创建一个数据库

```
create database blog;
```

切换blog数据库

```
use blog;
```

创建一个文章表

```
create table if not exists article( id int not null auto_increment, title varchar(100) not null, content varchar(2000) not null, author varchar(40) not null, date date, primary key (id) )engine=InnoDB default charset=utf8;
```

域名是：127.0.0.1:3000，比如查询文章列表接口： http://127.0.0.1:3000/api/article

记得要启动服务：npm start


#### 增加文文章接口

路由方法

```js
// post请求增加文章接口
router.post('/article', function (req, res, next) {
    let _article = req.body;
    let title = _article.title;
    let author = _article.author;
    let content = _article.content;

    if (!title) {
        res.status(412).send({error: '标题不能为空!'});
    } else if (!author) {
        res.status(412).send({error: '作者不能为空!'});
    } else if (!content) {
        res.status(412).send({error: '内容不能为空!'});
    }

    let sql = `insert into article (title, author, content, date) values ("${title}", "${author}", "${content}", now())`;

    console.log(sql);
    article(sql, 'post').then(function (data) {
        res.json(data);
        res.end();
    }).catch(function (err) {

    })
});
```

```
api/article
```

##### 请求方式

```
post
```

##### 请求参数


参数名 | 需求 | 说明
---|--- |---
title | 必填 | 文章标题
author | 必填 | 文章作者
content | 必填 | 文章内容

##### 返回数据

```
{
    "code": "200",
    "data": {
        "message": "添加成功！"
    }
}
```


#### 查询文章列表接口

路由方法

```js
// get请求查询文章接口
router.get('/article', function (req, res, next) {
    let _article = req.query;
    let id = _article.id;
    let title = _article.title;
    let author = _article.author;
    let sql = '';

    if (id && author && title) {
        sql = `SELECT * FROM article WHERE id like ${id} AND author like "${author}" AND title like "${title}";`;
    } else if (id) {
        sql = `SELECT * FROM article WHERE id like ${id};`;
    } else if (author) {
        sql = `SELECT * FROM article WHERE author like "${author}";`;
    } else if (title) {
        sql = `SELECT * FROM article WHERE author like "${title}";`;
    } else {
        sql = `SELECT * FROM article`;
    }

    console.log(sql);

    article(sql, 'get').then(function (data) {
        res.json(data);
        res.end();
    }).catch(function (err) {
    })
});
```

```
api/article
```

##### 请求方式

```
get
```

##### 请求参数


参数名 | 需求 | 说明
---|--- |---
id | 非必填 | 文章ID
title | 非必填 | 文章标题
author | 非必填 | 文章作者

##### 返回结果

```
{
    "code": "200",
    "data": {
        "data": [
            {
                "id": 7,
                "title": "广州人很喜欢喝早茶？",
                "content": "广州人很喜欢喝早茶是一个优良传统啦",
                "author": "梁凤波",
                "date": "2018-05-16T16:00:00.000Z"
            }
        ]
    }
}
```


#### 更新文章接口


路由方法

```js
// put修改文章接口
router.put('/article', function (req, res, next) {
    let _article = req.query;
    let id = _article.id;
    let title = _article.title;
    let author = _article.author;
    let content = _article.author;
    let sql = '';

    if (!id) {
        res.status(412).send({error: 'ID不能为空!'});
    }

    if (title && author && content) {
        sql = `update article set title = "${title}", author = "${author}", content = "${content}" where id =  ${id}`;
    } else if (author) {
        sql = `update article set title = "${author}" where id =  ${id}`;
    } else if (title) {
        sql = `update article set title = "${title}" where id =  ${id}`;
    } else if (content) {
        sql = `update article set title = "${content}" where id =  ${id}`;
    }

    console.log(sql);

    article(sql, "put").then(function (data) {
        res.json(data);
        res.end();
    }).catch(function (err) {
    })
});
```

```
api/article
```

##### 请求方式

```
put
```

##### 请求参数


参数名 | 需求 | 说明
---|--- |---
id | 必填 | 文章ID
title | 非必填 | 文章标题
author | 非必填 | 文章作者

#### 返回结果

```
{
    "code": "200",
    "data": {
        "message": "更新成功！"
    }
}
```

#### 删除文章接口


路由方法

```js
// delete请求删除文章接口
router.delete('/article', function (req, res, next) {
    let _article = req.query;
    let id = _article.id;

    if (!id) {
        res.status(412).send({error: 'ID不能为空!'});
    }

    let sql = `delete from article where id = ${id}`;

    console.log(sql);

    article(sql, "delete").then(function (data) {
        res.json(data);
        res.end();
    }).catch(function (err) {
    })
});
```

```
api/article
```

##### 请求方式

```
delete
```

##### 请求参数


参数名 | 需求 | 说明
---|--- |---
id | 必填 | 文章ID

##### 返回结果

```
{
    "code": "200",
    "data": {
        "message": "删除成功！"
    }
}
```