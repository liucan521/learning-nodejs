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