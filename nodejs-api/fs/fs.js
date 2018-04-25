// fs (文件系统) 可以对文件进行读取删操作
// 引入fs模块
const fs = require('fs');

/**
 * 创建一个文件
 * 第一个参数是新增的文件名字
 * 第二个参数可以传新增文件的内容
 * 第三个是回调函数，创建是否成功
 */
fs.appendFile('create.txt', 'i am a create flie', err => {
    if (err) {
        throw err;
    }
    console.log('create success!');
});

/**
 * 读取一个文件的全部内容
 * 第一个参数是要读取的文件路径
 * 第二个指定返回的格式，通常utf8
 * 第三个回调函数，返回err，和data参数，data就是返回读取到的内容
 */
fs.readFile('./test.txt', 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('读取内容: ' + data); // 读取内容: I am a test file.
});

/**
 * 删除文件
 * 第一个参数是要读取的文件路径
 * 第二个回调函数，如果删除失败返回err
 */
fs.unlink('./create.txt', (err) => {
    if (err) {
        throw err;
    }
    console.log('unlink success!');
})

/**
 * 读取文件的路径
 * 第一个参数是要读取的文件路径
 * 第二个指定返回的格式，通常utf8
 * 第三个回调函数，返回err，和data参数，data就是返回读取到的内容
 * 可以使用 process.cwd 解析相对路径。
 */
fs.realpath('./test.txt', 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('test.txt的路径为: ' + data);
    // test.txt的路径为: /Users/bob/Documents/myproject/nodejs/nodejs-api/test.txt
});

/**
 * 拷贝一个文件
 * 第一个参数是要拷贝的文件
 * 第二个参数是指要被拷贝出的文件名字
 * 第三个回调函数，如果失败则返回err
 */
fs.copyFile('test.txt', 'copy_test.txt', (err) => {
    if (err) {
        throw err;
    }
    console.log('copy success!');
})

/**
 * 创建一个文件夹
 * 第一个参数是要被创建的文件夹名字
 * 第二个回调函数，如果失败则返回err
 */
fs.mkdir('create_dircetory', err => {
    if (err) {
        throw err;
    }
    console.log('mkdir success');
})

/**
 * 删除一个文件夹
 * 第一个参数是要被删除的文件夹名字
 * 第二个回调函数，如果失败则返回err
 */
fs.rmdir('create_dircetory', err => {
    if (err) {
        throw err;
    }
    console.log('rmdir success');
})

/**
 * 查看文件夹下的内容
 * 第一个参数是要查看的文件夹路径
 * 第二个回调函数，如果失败则返回err，成功返回data数据
 */
fs.readdir('../path', (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data);
    // [ 'README.md', 'path.js' ]
})




