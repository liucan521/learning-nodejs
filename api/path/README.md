
参数 | 说明
---|---
 path | 用于处理文件与目录的路径



#### path.basename(path);返回路径的最后一部分(文件或文件名字)

```js
let basename1 = path.basename('/Users/bob/documents/myproject/nodejs/nodejs-api/path/path.js');
let basename2 = path.basename('/Users/bob/documents/myproject/nodejs/nodejs-api/path/path');
let basename3 = path.basename('/Users/bob/documents/myproject/nodejs/nodejs-api/path/path.js', '.js');

console.log(basename1); // path.js
console.log(basename2); // path
console.log(basename3); // path
```

#### path.extname(path) 方法返回 path 的扩展名

```js
let extname1 = path.extname('/Users/bob/documents/myproject/nodejs/nodejs-api/path/path.js');
console.log(extname1); // .js

path.extname('index.html');
 // 返回: '.html'

 path.extname('index.coffee.md');
 // 返回: '.md'

 path.extname('index.');
 // 返回: '.'

 path.extname('index');
 // 返回: ''

 path.extname('.index');
 // 返回: ''
```


#### 返回一个路径字符串：path.format(pathObject)

```js
let format1 = path.format({
    root: '/path_root.js',
    dir: '/home/nodejs',
    base: 'path_base.js'
});
// 如果提供了 pathObject.dir，则 pathObject.root 会被忽略
console.log(format1); // /home/nodejs/path_base.js

let format2 = path.format({
    root: '/home/nodejs',
    base: '/path_base.js',
    ext: '/ignored'
});
// 如果提供了 pathObject.base 存在，则 pathObject.ext 和 pathObject.name 会被忽略
console.log(format2); // /home/nodejs/path_base.js

let format3 = path.format({
    root: '/home/nodejs',
    name: '/path_base.js',
    ext: '/ignored'
});
// 如果提供了 pathObject.base 存在，则 pathObject.ext 和 pathObject.name 会被忽略
console.log(format3); // /home/nodejs/path_base.js/ignored

```

#### path.join() 方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径

```js
let pathJoin1 = path.join('/home', 'nodejs', 'path', 'path.js', '.');

console.log(pathJoin1); // /home/nodejs/path/path.js
```

#### path.parse(path)方法返回path的所有元素：

```js
// 拆分路径
let pathParse = path.parse(pathJoin1);
console.log(pathParse);
/**
 { root: '/',
   dir: '/home/nodejs/path',
   base: 'path.js',
   ext: '.js',
   name: 'path'
 }
 */
```

#### path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径

```js
let resolvePath1 = path.resolve(__dirname); // __dirname 文件夹名字
let resolvePath2 = path.resolve(__filename); // __filename 文件名字

console.log(resolvePath1);  // Users/bob/Documents/myproject/nodejs/nodejs-api/path
console.log(resolvePath2);  // /Users/bob/Documents/myproject/nodejs/nodejs-api/path/path.js
```

#### path.sep 方法返回平台特定的路径片段分隔符

```js
console.log(path.sep);
// Windows 上是 \
// POSIX 上是 /

console.log(resolvePath1.split(path.sep));
/*
[
  '',
  'Users',
  'bob',
  'Documents',
  'myproject',
  'nodejs',
  'nodejs-api',
  'path'
]
 */
```

#### path.normalize(path) 方法会规范化给定的 path，并解析 '..' 和 '.' 片段。

```js
let normalizePath = path.normalize('/home///nodejs/../path//path.js');

console.log(normalizePath); // /home/path/path.js
```