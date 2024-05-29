# path 模块常用的 API

- basename() 获取路径中的文件名
- dirname() 获取路径中的目录名
- extname() 获取路径中的文件后缀名
- isAbsolute() 判断是否为绝对路径
- join() 路径拼接
- resolve() 拼接返回绝对路径
- parse() 解析路径
- format() 序列化路径
- normalize() 规范化路径

# 全局变量 Buffer

## 简介

- Buffer 让 JavaScript 语言支持操作二进制数据，因为 IO 读写都是二进制数据，所以需要 Buffer 来操作二进制数据

- 流配合管道可以实现数据分片传输，NodeJS 中的 Buffer 一片不占据 V8 的堆内存大小的内存空间
- 内存的使用还是由 Node 来控制，由 V8 的 GC 回收
- 一般配合流使用，充当数据缓冲区，比如文件读写，网络传输

## 创建实例

- alloc: 创建一个指定大小的 Buffer 实例
- allocUnsafe: 创建一个指定大小的 Buffer 实例，不安全
- from: 接收数据，创建 buffer

## 实例方法

- fill: 使用数据填充 buffer
- write: 向写入数据
- toString: 从 buffer 中提取数据
- copy: 拷贝 buffer 中的数据
- subarray、slice(已废弃): 截取 buffer
- indexOf: 获取 buffer 中指定数据的位置

## 静态方法

- isBuffer: 判断是否是 buffer
- concat: 合并 buffer

## 自定义 Buffer 之 split

# FS 模块

前置：文件的权限位、标识符、文件描述符

- 权限：用户对于文件所具备的操作权限，分为 3 个部分：读、写、执行
  数字表示权限：4、2、1，字符表示权限：r、w、x
- flag ：操作符，表示对文件的操作类型,常用的有 r、w、s、+、x、a。分别如下：
  - r：表示可读
  - w：表示可写
  - s：表示同步
  - +：表示执行相反的操作
  - x：表示排他操作
  - a：表示追加操作
- fd 表示操作系统分配给被打开的文件的文件描述符

## FS 基本操作类

## FS 常用 api

- readFile: 读取文件
- writeFile: 写入文件
- appendFile: 追加内容到文件
- copyFile: 复制文件
- watch: 监听文件变化

## 文件打开与关闭

- fs.open、fs.close
- fs.read 大文件读取，作就是将数据从磁盘文件中写入到 buffer 中，然后通过回调函数返回
- fs.write 大文件写入，将 buffer 中的数据写入到磁盘文件中，然后通过回调函数返回
- 大文件拷贝
  1. 打开 a 文件，利用 read 将数据保存到 buffer 暂存起来
  2. 打开 b 文件，利用 write 将 buffer 中数据写入到 b 文件中

## 目录操作 api

- access: 判断文件或者目录是否有操作权限
- stat: 获取文件或者目录的详细信息
- mkdir: 创建目录
- rmdir: 删除目录
- readdir: 读取目录下的文件
- unlink: 删除文件
