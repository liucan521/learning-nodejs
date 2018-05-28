
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