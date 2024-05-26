## path 模块常用的 API

- basename() 获取路径中的文件名
- dirname() 获取路径中的目录名
- extname() 获取路径中的文件后缀名
- isAbsolute() 判断是否为绝对路径
- join() 路径拼接
- resolve() 拼接返回绝对路径
- parse() 解析路径
- format() 序列化路径
- normalize() 规范化路径

## 全局变量 Buffer

### 简介

- Buffer 让 JavaScript 语言支持操作二进制数据，因为 IO 读写都是二进制数据，所以需要 Buffer 来操作二进制数据

- 流配合管道可以实现数据分片传输，NodeJS 中的 Buffer 一片不占据 V8 的堆内存大小的内存空间
- 内存的使用还是由 Node 来控制，由 V8 的 GC 回收
- 一般配合流使用，充当数据缓冲区，比如文件读写，网络传输

### 创建实例
- alloc: 创建一个指定大小的 Buffer 实例
- allocUnsafe: 创建一个指定大小的 Buffer 实例，不安全
- from: 接收数据，创建buffer

### 实例方法
- fill: 使用数据填充buffer
- write: 向写入数据
- toString: 从buffer中提取数据
- copy: 拷贝buffer中的数据
- subarray、slice(已废弃): 截取buffer
- indexOf: 获取buffer中指定数据的位置

### 静态方法

- isBuffer: 判断是否是buffer
- concat: 合并buffer