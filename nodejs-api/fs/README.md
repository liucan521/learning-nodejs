
#### 参数说明
参数 | 说明
---|---
fs | fs (文件系统) 可以对文件进行读取删操作
path | 路径
fileName | 文件名字
fileContent | 文件内容
options | 选填字符编码 utf8
callback | 回调函数 通常带有2个参数 err, data，err就是错误信息，data就是回调读取或获取到的内容


#### 引入fs模块

```js
// 引入fs模块
const fs = require('fs');
```

#### 创建一个文件：fs.appendFile(fileName, fileContent, callback)
```js
fs.appendFile('create.txt', 'i am a create flie', err => {
    if (err) {
        throw err;
    }
    console.log('create success!');
});
```

#### 读取一个文件内容：fs.readFile(path, options, callback)
- 如果未指定字符编码，则返回原始的 buffer
- options如果 options 是一个字符串，则它指定了字符编码

```js
fs.readFile('./test.txt', 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('读取内容: ' + data); // 读取内容: I am a test file.
});
```

#### 删除一个文件：fs.unlink(path, callback)

```js
fs.unlink('./create.txt', (err) => {
    if (err) {
        throw err;
    }
    console.log('unlink success!');
})
```

#### 读取文件的路径：fs.realpath(path, opthons, callback)
- 如果未指定字符编码，则返回原始的 buffer
- options如果 options 是一个字符串，则它指定了字符编码

```js
fs.realpath('./test.txt', 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('test.txt的相对路径为: ' + data);
    // test.txt的路径为: /Users/bob/Documents/myproject/nodejs/nodejs-api/test.txt
});

```

#### 拷贝一个文件：fs.copyFile(src, dest, callback)
- dest：异步的将 src 拷贝到 dest

```js
fs.copyFile('test.txt', 'copy_test.txt', (err) => {
    if (err) {
        throw err;
    }
    console.log('copy success!');
})
```

#### 创建一个文件夹：fs.mkdir(path, callback)

```js
fs.mkdir('create_dircetory', err => {
    if (err) {
        throw err;
    }
    console.log('mkdir success');
})
```

#### 删除一个文件夹：fs.rmdir(path, callback)

```js
fs.rmdir('create_dircetory', err => {
    if (err) {
        throw err;
    }
    console.log('rmdir success');
})
```

#### 查看文件夹下的内容：fs.readdir(path, callback)

```js
fs.readdir('../nodejs-api', (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data);
    // [ 'copy_test.txt', 'create_dircetory', 'fs.js', 'test.txt' ]
})
```