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
                    <h1>Upload file</h1>
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