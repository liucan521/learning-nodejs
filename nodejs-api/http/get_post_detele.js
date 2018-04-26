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