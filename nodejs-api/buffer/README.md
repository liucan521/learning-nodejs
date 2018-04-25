
参数 | 说明
---|---
Buffer | TCP 流或文件系统操作等场景中处理二进制数据流

> Buffer 类的实例类似于整数数组，但 Buffer 的大小是固定的、且在 V8 堆外分配物理内存。 Buffer 的大小在被创建时确定，且无法调整。

#### Buffer.alloc 新建一个buffer，且指定长度

```js
/**
 * Buffer.alloc 新建一个buffer，且指定长度
 */
let buf1 = Buffer.alloc(10);
console.log(buf1); // <Buffer 00 00 00 00 00 00 00 00 00 00>
console.log((buf1.toString()).split('').join('-')); // ---------

/**
 * 第二个参数可以指定填充的内容
 */
let buf2 = Buffer.alloc(10, 'bo');
console.log(buf2.toString()); // bobobobobo

let buf3 = Buffer.alloc(10, '波');
console.log(buf3.toString()); // 波波波�
```

#### Buffer.byteLength方法获取Buffer的实际长度
- 测试中文与英文字符长度

```js
/**
 * 我们可以来测试一下字母和中文的长度 Buffer.byteLength方法
 */
console.log(Buffer.byteLength('波')); // 中文占3个字节
console.log(Buffer.byteLength('bo')); // 2

// 注意base64和utf8格式是不一样的
const str1 = '\u00bd + \u00bc = \u00be';
console.log(str1.toString());  // ½ + ¼ = ¾
console.log(Buffer.byteLength(str1, 'utf8'));  // 12
console.log(Buffer.byteLength(str1, 'base64'));  // 6
```


#### 创建一个新的 Buffer Buffer.from() 与 Buffer排序 Buffer.compare

```js
/**
 * 通常用作于Buffer数组实例排序
 * 比如现在有五个buffer，组成一个数组
 * 第一次输出是乱序的
 * 第二次经过buffer.compare排序后，就从小到大排序
 * Buffer.from() 创建一个新的 Buffer
 */
let buf4 = Buffer.from('3');
let buf5 = Buffer.from('2');
let buf6 = Buffer.from('1');
let buf7 = Buffer.from('5');
let buf8 = Buffer.from('4');
const arr1 = [buf4, buf5, buf6, buf7, buf8];

// 没使用compare方法之前
console.log(arr1.toString()); // 3,2,1,5,4
// 使用compare方法后
console.log(arr1.sort(Buffer.compare).toString()); // 1,2,3,4,5
```

#### 合并Buffer：Buffer.concat()

```js
/**
 * 如果有多个Buffer，想合为一个Buffer
 * 则可以使用Buffer.concat();
 */

let buf9 = Buffer.alloc(1);
let buf10 = Buffer.alloc(5);
let buf11 = Buffer.alloc(4);

let buf12 = Buffer.concat([buf9, buf10, buf11]);
console.log(buf12); // 10
console.log(buf12.length); // 10
```