1. Node.js 技术架构， 分为三层：
   ![image](/images/introduce.webp)

   1. 最上层是 Node API，这些 Native Modules，提供 http 模块、流模块、fs 文件模块等等，可以使用 js 直接调用
   2. 中间层 Node Bindings 中间层 node bindings 主要是使 js 和 C/C++ 进行通信
   3. 最下面这一层是支撑 nodejs 运行的关键，主要由 v8、libuv、c-ares 等模块组成，向上一层提供 api 服务

2. Nodejs 特点

   - 更适用于 IO 密集型高并发请求

3. 单线程：

   1. 配合异步 IO 和事件循环，可以实现高并发请求，适合 IO 密集型任务
   2. 运行 JavaScript 代码的主线程是单线程
   3. 不太适合 CPU 密集型型任务

4. 全局变量

   - \_\_filename: 当前模块的绝对路径
   - \_\_dirname: 当前模块所在的目录的绝对路径
   - require: 引入模块的函数
   - module、exports: 处理模块的导出
   - process: 当前进程的引用对象
   - timer 类函数：执行顺序和事件循环间的关系
   - Buffer: 缓冲区对象

5. process 对象

   1. 资源：CPU 内存

      - process.memoryUsage(): 内存使用情况
      - process.cpuUsage(): CPU 使用情况

   2. 运行环境：运行目录，node 环境，cpu 架构，用户架构，系统平台

      - process.cwd(): 当前工作目录
      - process.version、process.versions: node 版本、v8 版本、node-gyp 版本
      - process.arch: cpu 架构
      - process.env: 环境变量
        - process.env.PATH: 系统环境变量
        - process.env.USERPROFILE: 用户目录
        - process.env.NODE_ENV: 环境变量
      - process.platform: 系统平台

   3. 运行状态：启动参数、PID、运行时间

      - process.argv: 启动参数
      - process.pid: 进程 ID
      - process.uptime(): 运行时间

   4. 事件：监听事件、触发事件

      - process.on('exit', () => {})
      - process.emit('exit')
      - process.exit(): 退出进程

   5. 标准输入 输出 错误

   - process.stdin：输入
   - process.stdout：输出

# Mongodb

NoSQL 数据库: Not Only SQL 意思是不仅是 SQL，MongoDB 是 NoSQL 数据库，NoSQL 数据库是非关系型数据库。

MongoDB 是一个基于分布式文件存储的数据库。由 C++语言编写

## NoSQL 数据库 分类

1. 键值数据库：优点是存储结构简单，查询方便，缺点是数据结构不固定，无法进行复杂的查询，代表是 Redis、Flare
2. 文档型数据库: 优点是数据结构灵活，缺点是查询复杂，代表是 MongoDB、CouchDB
3. 图形数据库: 优点是数据结构灵活，缺点是查询复杂，代表是 Neo4j
4. 列存数据库：优点是数据结构固定，查询方便，缺点是存储结构复杂，代表是 HBase、Cassandra

## 关系型数据库和 NoSQL 数据库怎么选？

1. 数据模型的关联性要求：关系型数据库适合有关联性的数据，NoSQL 数据库适合无（低）关联性的数据。
2. 数据库的性能要求：NoSQL 数据库适合海量数据
3. 数据的一致性要求：NoSQL 数据库适合高可用性，关系型数据库适合高一致性。
4. 数据的可用性要求

## 优势

- 高可用性：MongoDB 采用了分布式架构，数据会自动分布在多台服务器上，从而实现高可用性和容错性。如果一个节点故障，系统会自动将其从集群中删除，并将数据迁移至其他节点上。
- 高扩展性：MongoDB 可以轻松地进行水平扩展和垂直扩展。在水平扩展时，可以添加更多的服务器和节点，以增加处理能力和存储容量；在垂直扩展时，则可以升级硬件设备，以提高单机性能。
- 灵活性：MongoDB 支持动态模式和动态查询，可以根据应用程序需求灵活调整文档结构和查询条件。此外，它还支持复杂的文档嵌套、数组类型和地理位置等特性。
- 性能优势：MongoDB 使用了内存映射文件和快速索引等技术，具有较高的读写性能和查询效率。此外，MongoDB 还支持分片和副本集等技术，以进一步提高性能和可靠性。

## 应用场景：

- Web 应用程序：特别是需要处理大量实时数据的 Web 应用程序，如社交媒体网站和电子商务平台 。
- 大数据分析：MongoDB 能够处理大规模数据集，适用于需要进行复杂数据分析和查询的场景。
- 实时分析和日志处理：利用其快速读写能力，MongoDB 成为处理实时数据和日志处理的理想选择。
- 内容管理系统 ：适合存储和管理各种类型的内容，如文章、图片、视频等。
- 物联网应用程序 ：适用于存储和管理物联网设备生成的大量实时数据。
- 位置数据分析 ：利用其地理空间查询功能，MongoDB 适合存储和分析位置数据。
- 缓存和会话存储 ：可以作为缓存和会话存储的数据库，提供快速的访问速度和高可靠性。

## 启动 mongodb

mongo --dbpath="数据存储目录"
默认会占用本地 localhost:27017 端口

## mongo shell 使用 (https://www.mongodb.com/try/download/shell)

mongosh 启动

- show dbs
- db
- db.dropDatabase()
- use dbname: 切换数据库、创建数据库
- show collections

- db.collection.insert({})
- db.collection.insertOne({})
- db.collection.insertMany([{},{}])

- db.collection.findOne({})
- db.collection.find()
- db.collection.find({}).limit(10)
- 查询运算符：
  - $eq: 等于
  - $ne: 不等于
  - $gt: 大于
  - $gte: 大于等于
  - $lt: 小于
  - $lte: 小于等于
  - $in: 在范围内
  - $nin: 不在范围内
  - $exists: 是否存在
  - $regex: 正则表达式
  - $size: 长度
  - $all: 全部包含
    ...
- 返回指定字段

  - db.collection.find({}, {name: 1})
  - db.collection.find({}, {name: 1, \_id: 0})
  - db.collection.find({}, {name: 1, \_id: 0, s:{name: 0, age: 0}})

- 类型空字段或者缺少字段

  - db.collection.find({item:null})
  - db.collection.find({item:{$type:10}})
  - db.collection.find({item:{$exists:false}})

- 更新
  - db.collection.updateOne({},{
    $set: {
    name: "new name"
    age: 18
    address: "new address"
    }
    })
  - db.collection.updateMany({},{
    $set: {
    name: "new name"}
    }
    })
- db.collection.replaceOne({},{})

- 删除
  - db.collection.deleteOne({})
  - db.collection.drop()

## 数据存储结构

db --> collection --> document --> field

- db: 数据库
- collection: 集合，
- document: 文档（就像是一个对象），将数据记录为 Bson 格式,它比 JSON 包含更多的数据类型
- field: 列

## 可视化工具

1. Robo3T: https://robomongo.org/
2. MongoDB Compass: https://www.mongodb.com/try/download/compass
3. Studio 3T: https://studio3t.com/
4. Navicat: https://www.navicat.com/
