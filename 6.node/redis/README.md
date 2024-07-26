https://www.yuque.com/books/share/e04c68e0-44b2-4a74-abf7-f110ebf8c423?#（密码：gsz1） 《Redis 教程》

## 安装

```shell
# 下载 Redis 源码
wget https://download.redis.io/redis-stable.tar.gz

# 解压 Redis 压缩包
tar xzf redis-stable.tar.gz

# 进入 Redis 源码目录
cd  redis-stable

# 编译安装
make
```

| 可执行文件       | 说明               |
| ---------------- | ------------------ |
| redis-server     | Redis 服务器       |
| redis-cli Redis  | 命令行客户端       |
| redis-benchmark  | Redis 性能测试工具 |
| redis-check-aof  | AOF 文件修复工具   |
| redis-check-dump | RDB 文件检查工具   |
| redis-sentinel   | 哨兵模式工具       |

## 运行 Redis

现在已编译的二进制文件位于 src 目录中。使用以下命令运行 Redis：

```shell
 ./src/redis-server --port 1234 # 默认端口号6379
```

要将 Redis 二进制文件安装到 /usr/local/bin 中，只需使用：

```shell
 make install
```

到这里只是前台运行，要想后台运行

```shell
redis-server --daemonize yes
```

查看 Redis 状态

```shell
# 查看 Redis 后端运行进程
ps -ef | grep -i redis
```

## 停止 Redis

```shell
redis-cli shutdown

# 通过进程号停止 Redis
kill -9 4684
```

## 连接 Redis

运行 `redis-cli` 即可连接数据库：

```shell
redis-cli -h 127.0.0.1 -p 1234 # 指定服务器地址和端口号
```

如果想要断开连接： -命令：quit -快捷键：Ctrl + C

## Redis 配置

### 命令行配置

```shell
redis-server --port 6380 --host 127.0.0.1
```

### 配置文件

Redis 提供了一个配置文件的模板 redis.conf，位于源代码目录的根目录中。

```shell
redis-server 配置文件路径
```

### 在服务器运行时更改 Redis 配置

```shell
CONFIG SET logLevel warning
```

## 多数据库

Redis 默认支持 16 个数据库，分别编号为 0、1、2、...14、15

- Redis 不支持自定义数据库名字
- 因为每个数据库都以编号命名，所有开发者必须要明确哪个数据库存放了哪些数据
- 可以通过配置参数 databases 修改支持的数据库个数

Redis 不支持为每个数据库设置不同的访问密码，所有一个客户端要么可以访问全部数据库，要么一个数据库也没有权限访问。

不同的应用应该使用不同的 Redis 实例存储数据。

```shell
127.0.0.1:6379> SET a 1
OK
127.0.0.1:6379> KEYS *
1) "a"
127.0.0.1:6379> SELECT 16
(error) ERR DB index is out of range
127.0.0.1:6379> SELECT 15
OK
127.0.0.1:6379[15]> SET b 2
OK
127.0.0.1:6379[15]> KEYS *
1) "b"
127.0.0.1:6379[15]> SELECT 0
OK
127.0.0.1:6379> KEYS *
1) "a"
127.0.0.1:6379>

# 将指定 key 移动到指定数据库
move key db
```

## 常用命令

### 字符串

#### 添加

```shell
# 设置指定 key 的值
SET key value

# 将给定 key 的值设为 value ，并返回 key 的旧值(old value)
GETSET key value

# 只有在 key 不存在时设置 key 的值
SETNX key value

# 同时设置一个或多个 key-value 对
MSET key value [key value ...]

# 同时设置一个或多个 key-value 对，当且仅当所有给定 key 都不存在
MSETNX key value [key value ...]

# 如果 key 已经存在并且是一个字符串， APPEND 命令将指定的 value 追加到该 key 原来值（value）的末尾。
APPEND key value
```

#### 查询

```shell
# 获取指定 key 的值
GET key

# 返回 key 中字符串值的子字符
GETRANGE key start end

# 获取所有(一个或多个)给定 key 的值
MGET key [key ...]

# 返回 key 所储存的字符串值的长度。
STRLEN key

# 通用命令：查询集合中是否有指定的 key
EXISTS key [key ...]

# 通用命令，查询 key 的类型
TYPE key
```

#### 修改

```shell
# 设置指定 key 的值
SET key value

# 将给定 key 的值设为 value ，并返回 key 的旧值(old value)
GETSET key value

# 如果 key 已经存在并且是一个字符串， APPEND 命令将指定的 value 追加到该 key 原来值（value）的末尾。
APPEND key value
```

#### 删除

```shell
# 通用命令：删除1个或多个指定的 key
DEL key [key ...]
```

数字值在 Redis 中以字符串保存。

### 哈希（Hash）

哈希（也叫散列）类型也是一种字典结构，其存储了字段和字段值的映射，但字符值只能是字符串，不能其它数据类型，换句话说，散列类型不能嵌套其它数据类型。一个哈希类型可以包含至少 232 - 1 个字段。

#### 添加

```shell
# 将哈希表 key 中的字段 field 的值设为 value
HSET key field value [field value ...]

# 同时将多个 field-value (域-值)对设置到哈希表 key 中
HMSET key field value [field value ...]

# 只有在字段 field 不存在时，设置哈希表字段的值
HSETNX key field value
```

#### 查询

```shell
# 获取所有哈希表中的字段
HKEYS key

# 获取哈希表中字段的数量
HLEN key

# 获取所有给定字段的值
HMGET key field1 [field2]

# 获取存储在哈希表中指定字段的值
HGET key field

# 获取在哈希表中指定 key 的所有字段和值
HGETALL key

# 查看哈希表 key 中，指定的字段是否存在
HEXISTS key field

# 获取哈希表中所有值
HVALS key

# 迭代哈希表中的键值对
HSCAN key cursor [MATCH pattern] [COUNT count]
```

#### 修改

```shell

# 将哈希表 key 中的字段 field 的值设为 value
HSET key field value [field value ...]

# 为哈希表 key 中的指定字段的整数值加上增量 increment
HINCRBY key field increment

```

#### 删除

```shell
# 删除一个或多个哈希表字段
HDEL key field1 [field2]

# 删除整个数据字段
DEL key [key ...]
```

### 列表（List）

列表类型类似于编程语言中的数组，可以存储一个有序的字符串列表，常用的操作就是向列表两端添加元素，或者获得列表的某一个片段。

#### 添加

```shell
# 将一个或多个值插入到列表头部
LPUSH key element [element ...]

# 在列表的元素前或者后插入元素
LINSERT key BEFORE|AFTER pivot value

# 将一个值插入到已存在的列表头部
LPUSHX key value

# 通过索引设置列表元素的值
LSET key index value

# 在列表中添加一个或多个值
RPUSH key value1 [value2]

# 为已存在的列表添加值
RPUSHX key value
```

#### 查询

```shell
# 通过索引获取列表中的元素
LINDEX key index

# 获取列表长度
LLEN key

# 获取列表指定范围内的元素
LRANGE key start stop
```

#### 删除

```shell
# 移出并获取列表的第一个元素
LPOP key

# 移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止
BLPOP key1 [key2 ] timeout

# 移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止
BRPOP key1 [key2 ] timeout

# 从列表中弹出一个值，将弹出的元素插入到另外一个列表中并返回它； 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止
BRPOPLPUSH source destination timeout

# 移除列表元素
# 如果 count > 0，则从头向尾遍历删除元素
# 如果 count < 0，则从后面向前面删除元素
# 如果 count = 0，则删除所有匹配的元素
LREM key count value

# 对一个列表进行修剪(trim)，就是说，让列表只保留指定区间内的元素，不在指定区间之内的元素都将被删除
LTRIM key start stop

# 移除列表的最后一个元素，返回值为移除的元素
RPOP key

# 移除列表的最后一个元素，并将该元素添加到另一个列表并返回
RPOPLPUSH source destination
```

### 集合（Set）

集合类型和数学中的集合概念相似，集合中的元素是唯一的、无序的，简单理解集合就是没有顺序且不重复的列表。

一个集合类型可以存储至多 232 - 1 个字符串。

集合类型和列表类型有相似之处，它们的主要区别是： -列表是有序的，集合是无序的 -列表数据可以重复，集合中没有重复数据

集合类型的常用操作是向集合中加入或删除元素、判断某个元素是否存在等。由于集合类型在 Redis 内部是使用值为空的散列表实现的，所以这些操作的时间复杂度都是 O(1)。

最方便的是多个集合之间还可以进行并集、交集和差集运算。

#### 添加

```shell
# 向集合添加一个或多个成员
SADD key member1 [member2]
```

#### 查询

```shell
# 返回集合中的所有成员
SMEMBERS key

# 获取集合的成员数
SCARD key

# 判断 member 元素是否是集合 key 的成员
SISMEMBER key member

# 返回集合中一个或多个随机数
SRANDMEMBER key [count]
```

#### 删除

```shell

# 移除集合中一个或多个成员
SREM key member1 [member2]

# 移除并返回集合中的一个随机元素
SPOP key

# 将 member 元素从 source 集合移动到 destination 集合
SMOVE source destination member
```

#### 集合间聚合运算

```shell
多个集合之间还可以进行并集、交集和差集运算。
# 返回第一个集合与其他集合之间的差异。
SDIFF key1 [key2]

# 返回给定所有集合的交集
SINTER key1 [key2]

# 返回所有给定集合的并集
SUNION key1 [key2]

# 返回给定所有集合的差集并存储在 destination 中
SDIFFSTORE destination key1 [key2]

# 返回给定所有集合的交集并存储在 destination 中
SINTERSTORE destination key1 [key2]

# 所有给定集合的并集存储在 destination 集合中
SUNIONSTORE destination key1 [key2]
```

#### 使用场景

-跟踪一些唯一性数据
○ 比如访问网站的唯一 IP 地址信息，每次访问网站的时候记录用户 IP 地址，SET 自动保证数据的唯一不重复 -充分利用 SET 聚合操作方便高效的特性，用于维护数据对象之间的关联关系
○ 比如所有购买 A 商品的客户 ID 存储到指定的 SET 中，所有购买 B 商品的客户 ID 存储到指定的 SET 中，如果我们想要获取有哪个客户同时购买了这两个商品，我们只需要使用交集操作就可以轻松的查出来
