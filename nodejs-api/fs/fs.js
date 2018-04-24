// fs (文件系统) 可以对文件进行读取删操作
// 引入fs模块
const fs = require('fs');

// 创建一个文件
fs.appendFile('create.txt', 'i am a create flie', err => {
    if (err) {
        throw err;
    }
    console.log('create success!');
});

// 读取一个文件的全部内容
fs.readFile('./test.txt', 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('读取内容: ' + data); // 读取内容: I am a test file.
});

// 删除一个文件
fs.unlink('./create.txt', (err) => {
    if (err) {
        throw err;
    }
    console.log('unlink success!');
})

// 读取文件的路径
fs.realpath('./test.txt', 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('test.txt的相对路径为: ' + data);
    // test.txt的路径为: /Users/bob/Documents/myproject/nodejs/nodejs-api/test.txt
});

// 拷贝一个文件
fs.copyFile('test.txt', 'copy_test.txt', (err) => {
    if (err) {
        throw err;
    }
    console.log('copy success!');
})

// 创建一个文件夹
fs.mkdir('create_dircetory', err => {
    if (err) {
        throw err;
    }
    console.log('mkdir success');
})

// 删除一个文件夹
fs.rmdir('create_dircetory', err => {
    if (err) {
        throw err;
    }
    console.log('rmdir success');
})

// 查看文件夹下的内容
fs.readdir('../nodejs-api', (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data);
    // [ 'copy_test.txt', 'create_dircetory', 'fs.js', 'test.txt' ]
})




