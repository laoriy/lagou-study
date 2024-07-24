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

# Redis
## 什么是 Redis

以下是官方文档的解释。

Redis 是一个使用 ANSI C 编写的开源、支持网络、基于内存、可选持久性的键值对存储数据库。

Redis 不是简单的 Key-Value 数据库，它还支持数据结构，例如
- 字符串
- 哈希
- 列表
- 集合
- 带范围查询的排序集合
- 位图
- 超日志
- 带有半径查询和流的地理空间索引

Redis 具有内置的复制功能，解析执行 Lua 脚本，LRU 缓存控制，事务和不同级别的磁盘持久性，并通过 Redis Sentinel 和 Redis Cluster 自动分区提供高可用性。

### Redis 的存储结构

在大多数编程语言中都有一种数据结构：字典，例如代码 dict["key"] = "value" 中：
- dict 是一个字典结构变量
- key 是键名
- value 是键值
在字典中我们可以获取或设置键名对应的键值，也可以删除一个键。


Redis 是 REmote DIctionary Server（远程字典服务器）的缩写，它以字典结构存储数据，并允许其他应用通过 TCP 协议读写字典中的内容。

Redis 字典中的键值除了可以是字符串，还可以是其它数据类型。其中比较常见的有：

| 类型 | 说明 |
| --- | --- |
| String	| 字符串
| Hash| 	散列，是由与值相关联的字段组成的内容。字段和值都是字符串。这与
| Ruby|  或 Python 哈希非常相似。类似于 JavaScript 中的对象结构。
| List| 	列表，根据插入顺序排序的字符串元素的集合。它们基本上是链表。
| Set	| 未排序的字符串元素集合，集合中的数据是不重复的
| ZSet| 	与Sets类似，但每个字符串元素都与一个称为分数的浮点值相关联。元素总是按它们的分数排序，因此与 Sets 不同，可以检索一系列元素（例如，您可能会问：给我前10名或后10名）

### 内存存储与持久化

Redis 数据库中所有数据都存储在内存中。相对于磁盘，内存的数据读/写速度要快得多，所以我们通常用 Redis 做缓存数据库，在一台普通电脑上，Redis 可以在一秒内读写超过 10 万个键值。

将数据存储在内存中也有问题，比如程序退出后内存中的数据会丢失。不过 Redis 提供了对持久化的支持，即可以将内存中的数据异步写入到硬盘中，同时不影响继续提供服务。


### 功能丰富

Redis 虽然是作为数据库开发的，但是由于提供了丰富的功能，越来越多人将其用作缓存、队列系统等。

（1）作为缓存系统

Redis 可以为每个键设置生存时间，生存时间到期后会自动被删除。这一功能配合出色的性能让 Redis 可以作为缓存来使用。作为缓存系统，Redis 还可以限定数据占用的最大空间，在数据达到空间限制后可以按照一定的规则自动淘汰不需要的键。

（2）作为队列系统

除此之外，Redis 的列表类型键可以用来实现队列，并且支持阻塞式读取，可以很容易的实现一个高性能的优先级队列。

（3）“发布/订阅”功能

同时在更高层面上，Redis 还支持“发布/订阅”的消息模式，可以基于此构建聊天室等系统。

## Redis 应用场景

Redis是一个 Key-Value 存储系统，大部分情况下是因为其高性能的特性，被当做缓存使用，这里介绍下Redis经常遇到的使用场景。

一个产品的使用场景肯定是需要根据产品的特性，先列举一下 Redis 的特点：

- 读写性能优异
- 持久化
- 数据类型丰富
- 单线程
- 数据自动过期
- 发布订阅
- 分布式

这里我们通过几个场景，不同维度说下 Redis 的应用。

（1）缓存系统

缓存现在几乎是所有中大型网站都在用的必杀技，合理的利用缓存不仅能够提升网站访问速度，还能大大降低数据库的压力。Redis 提供了键过期功能，也提供了灵活的键淘汰策略，所以，现在 Redis 用在缓存的场合非常多。

（2）排行榜

很多网站都有排行榜应用的，如京东的月度销量榜单、商品按时间的上新排行榜等。Redis提供的有序集合数据类构能实现各种复杂的排行榜应用。

（3）计数器

什么是计数器，如电商网站商品的浏览量、视频网站视频的播放数等。为了保证数据实时效，每次浏览都得给+1，并发量高时如果每次都请求数据库操作无疑是种挑战和压力。Redis提供的incr命令来实现计数器功能，内存操作，性能非常好，非常适用于这些计数场景。

（4）分布式会话

集群模式下，在应用不多的情况下一般使用容器自带的session复制功能就能满足，当应用增多相对复杂的系统中，一般都会搭建以Redis等内存数据库为中心的session服务，session不再由容器管理，而是由session服务及内存数据库管理。

（5）分布式锁

在很多互联网公司中都使用了分布式技术，分布式技术带来的技术挑战是对同一个资源的并发访问，如全局ID、减库存、秒杀等场景，并发量不大的场景可以使用数据库的悲观锁、乐观锁来实现，但在并发量高的场合中，利用数据库锁来控制资源的并发访问是不太理想的，大大影响了数据库的性能。可以利用Redis的setnx功能来编写分布式的锁，如果设置返回1说明获取锁成功，否则获取锁失败，实际应用中要考虑的细节要更多。

（6）社交网络

点赞、踩、关注/被关注、共同好友等是社交网站的基本功能，社交网站的访问量通常来说比较大，而且传统的关系数据库类型不适合存储这种类型的数据，Redis提供的哈希、集合等数据结构能很方便的的实现这些功能。

（7）最新列表

Redis列表结构，LPUSH可以在列表头部插入一个内容ID作为关键字，LTRIM可用来限制列表的数量，这样列表永远为N个ID，无需查询最新的列表，直接根据ID去到对应的内容页即可。

（8）消息系统

消息队列是大型网站必用中间件，如 ActiveMQ、RabbitMQ、Kafka 等流行的消息队列中间件，主要用于业务解耦、流量削峰及异步处理实时性低的业务。Redis 提供了发布/订阅及阻塞队列功能，能实现一个简单的消息队列系统。另外，这个不能和专业的消息中间件相比。

（9）示例：秒杀和 Redis 的结合

秒杀是现在互联网系统中常见的营销模式，作为开发者，其实最不愿意这样的活动，因为非技术人员无法理解到其中的技术难度，导致在资源协调上总是有些偏差。秒杀其实经常会出现的问题包括：
- 并发太高导致程序阻塞。
- 库存无法有效控制，出现超卖的情况。

其实解决这些问题基本就两个方案：
- 数据尽量缓存,阻断用户和数据库的直接交互。
- 通过锁来控制避免超卖现象。

现在说明一下，如果现在做一个秒杀，那么，Redis 应该如何结合进行使用?
- 提前预热数据，放入Redis
- 商品列表放入Redis List
- 商品的详情数据 Redis Hash 保存，设置过期时间
- 商品的库存数据Redis Sorted Set 保存
- 用户的地址信息 Redis Set 保存
- 订单产生扣库存通过 Redis 制造分布式锁，库存同步扣除
- 订单产生后发货的数据，产生 Redis List，通过消息队列处理
- 秒杀结束后，再把 Redis 数据和数据库进行同步




