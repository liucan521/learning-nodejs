#### http很重要，建议大家多上网搜索http学习资料，深入学习


Node.js 的 HTTP API 是非常底层的，Node.js 中的 HTTP 接口被设计成支持协议的许多特性。 比如，大块编码的消息。 这些接口不缓冲完整的请求或响应，用户能够以流的形式处理数据。


这章节，我主要以代码来讲，主要也是来源于《nodejs实践》这本书：


- 如何创建一个http服务器
- 如何利用http服务器构建一个web服务器(响应get,post,delete请求方法)
- 利用构建好的web服务器做一个todo list 事项
- 通过web服务器上传文件


#### 创建一个服务器很简单：

```js
// 引入http模块
const http = require('http');

// 创建一个http服务器
const server = http.createServer((req, res) => {
    // 头输出类型
    res.setHeader('Content-Type', 'text/html');
    // 服务端返回数据
    res.end('<h1>http</h1>');
});

// 服务端开始监听端口8888
server.listen(8888, err => {
    if (err) {
        throw err;
    }
    // 输出提示打开浏览器127.0.0.1:8888
    console.log('Server is listen to 127.0.0.1:8888');
})
```

 ![image](https://github.com/liangfengbo/nodejs/blob/master/nodejs-api/http/create-http.png)

#### 让http做更多的事情，比如处理get，post，delete方法：

```js
const http = require('http');
const url = require('url');
let items = [];

/**
 * 构建一个web请求 get post detele资源服务器
 */
const server = http.createServer(function (req, res) {
    req.setEncoding('utf8');
    switch (req.method) {
        // 处理post请求
        case 'POST':
            var item = '';
            req.on('data', function (chunk) {
                item += chunk;
            });
            req.on('end', function () {
                items.push(item);
                res.end('POST Successful');
            });
            break;

        // 处理get请求
        case 'GET':
            var body = items.map(function (item, index) {
                return index + ': ' + item;
            }).join('\n');
            res.setHeader('Content-Length', Buffer.byteLength(body));
            res.setHeader('Content-Type', 'text/plain;charset="utf-8"');
            res.end(body);
            break;

        // 处理delete请求
        case 'DELETE':
            var path = url.parse(req.url).pathname;
            var i = parseInt(path.slice(1), 10);

            if (isNaN(i)) {
                res.statusCode = 400;
                res.end('Invalid item id');
            } else if (!items[i]) {
                res.statusCode = 404;
                res.end('Item not found');
            } else {
                items.splice(i, 1);
                res.end('Delete Successful');
            }
            break;
    }
});

// 监听服务
server.listen(9000, function () {
    console.log('Server listen to 127.0.0.1:9000');
});
```



##### 我们可以试一下上面所创建的web服务器，创建一个事项


```js
const http = require('http');
let items = [];

/**
 * 通过http构建的web服务器请求方法
 * 通过输入的表单建成一个todo list 事项
 */
const server = http.createServer(function (req, res) {
    if ('/' === req.url) {
        switch (req.method) {
            case 'GET':
                show(res);
                break;
            case 'POST':
                add(req, res);
                break;
            case 'DELETE':
                var path = url.parse(req.url).pathname;
                var i = parseInt(path.slice(1), 10);

                if (isNaN(i)) {
                    res.statusCode = 400;
                    res.end('Invalid item id');
                } else if (!items[i]) {
                    res.statusCode = 404;
                    res.end('Item not found');
                } else {
                    items.splice(i, 1);
                    res.end('Delete Successful');
                }
                break;
            default:
                badRequest(res);
        }
    } else {
        notFound(res);
    }
});

server.listen(9000, function () {
    console.log('Server listen 127.0.0.1:9000');
});

/**
 * 显示
 * @param res
 */
function show(res) {
    var html = `
        <html>
            <head>
                <title>Todo List</title>
                <body>
                    <h1>Todo List</h1>
                    <ul>
                        ${items.map(function (item) {
        return `<li>${item}</li>`
    })}
                    </ul>
                    <form action="/" method="POST">
                        <p><input type="text" name="item" /></p>
                        <p><input type="submit" value="Upload" /></p>
                    </form>
                </body>
            </head>
        </html>
    `;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}

/**
 * 404错误处理
 */
function badRequest(res) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Bad request');
}

/**
 * 404错误处理
 */
function notFound(res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
}

const qs = require('qs');

function add(req, res) {
    console.log(res);
    var body = '';
    req.setEncoding('utf8');
    req.on('data', function (chunk) {
        body += chunk;
    })
    req.on('end', function () {
        var obj = qs.parse(body);
        console.log(obj.item);
        items.push(obj.item);
        show(res);
    })
}
```

 ![image](https://github.com/liangfengbo/nodejs/blob/master/nodejs-api/http/web-http.png)

##### 当然，上传文件对于nodejs的http也是小菜一碟：


```js
const http = require('http');
const formidable = require('formidable');
let items = [];

/**
 * 通过构建的服务器上传文件
 */
const server = http.createServer(function (req, res) {
    if ('/' === req.url) {
        switch (req.method) {
            case 'GET':
                show(res);
                break;
            case 'POST':
                upload(req, res);
                break;
        }
    }
});

server.listen(9000, function () {
    console.log('Server listen 127.0.0.1:9000');
});

/**
 * 显示
 * @param res
 */
function show(res) {
    var html = `
        <html>
            <head>
                <title>Todo List</title>
                <body>
                    <h1>Todo List</h1>
                    <ul>
                        ${items.map(function (item) {
        return `<li>${item}</li>`
    })}
                    </ul>
                    <form action="/" method="POST" enctype="multipart/form-data">
                        <p><input type="text" name="name" /></p>
                        <p><input type="file" name="file" /></p>
                        <p><input type="submit" value="Upload" /></p>
                    </form>
                </body>
            </head>
        </html>
    `;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}


/**
 * upload 上传逻辑
 */

function upload(req, res) {
    if (!isFormData(req)) {
        res.statusCode = 400;
        res.end('bad request : expecting multipart/form-data');
        return;
    }
    var form = new formidable.IncomingForm();
    form.on('field', function (field, value) {
        console.log(field);
        console.log(value);
    })
    form.on('file', function (name, file) {
        console.log(name);
        console.log(file);
    })
    form.on('progress', function (bytesReceivied, bytesExpected) {
        var percent = Math.floor(bytesReceivied / bytesExpected * 100);
        console.log(percent);
    })
    form.on('end', function () {
        res.end('upload complete!')
    })

    form.parse(req);
}

function isFormData(req) {
    var type = req.headers['content-type'] || '';
    return 0 == type.indexOf('multipart/form-data');
}
```

 ![image](https://github.com/liangfengbo/nodejs/blob/master/nodejs-api/http/upload.png)
  ![image](https://github.com/liangfengbo/nodejs/blob/master/nodejs-api/http/upload2.png)
