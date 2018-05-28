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