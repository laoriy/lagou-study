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

### 有序集合（Sorted Set）

有序集合是一种类似于集合和哈希之间的混合数据类型。

- 与集合一样，排序集合由唯一的非重复字符串元素组成
- 有序集合中的元素不排序，但有序集合中的每个元素都关联了一个分数（这就是为什么类型也类似于哈希，因为每个元素都映射到一个值）
- 虽然集合中每个元素都是不同的，但是它们的分数确可以相同

有序集合类型在某些方面和列表类型有些相似。
相同点：

- 两者都是有序的
- 两者都可以获得某一范围的元素

不同点：

- 列表类型通过链表实现的，获取靠近两端的数据速度极快，而当元素增多后，访问中间数据的速度会较慢，所以它更适合实现如“新鲜事”或“日志”这样很少访问中间元素的应用
- 有序集合类似是使用哈希表实现的，所以即使读取位于中间部分的数据速度也很快
- 列表中不能简单的调整某个元素的位置，但是有序集合可以（通过更改元素的分数）
- 有序集合要比列表类型更耗费内存

#### 有序集合的典型应用场景：

（1）排行榜

例如一个大型在线游戏的积分排行榜，每当玩家的分数发生变化时，可以执行 ZADD 命令更新玩家的分数，此后再通过 ZRANGE 命令获取积分 TOPTEN 的用户信息。当然我们也可以利用 ZRANK 命令通过 username 来获取玩家的排行信息。最后我们将组合使用 ZRANGE 和 ZRANK 命令快速的获取和某个玩家积分相近的其他用户的信息。

（2）微博热搜

假设我们现在要获取热门的帖子或搜索，比如我们常用的微博热搜。
首先，我们需要一个衡量的标准，定量的量度热搜的热门程度。假设我们有一个字段叫回复量，回复量越高就越热门。

#### 添加

```shell
# 向有序集合添加一个或多个成员，或者更新已存在成员的分数
ZADD key score member [score member ...]
```

#### 查询

```shell
# 通过索引区间返回有序集合指定区间内的成员，分数从低到高排序
ZRANGE key start stop [WITHSCORES]

# 通过索引区间返回有序集合指定区间内的成员，分数从高到低排序
ZREVRANGE key start stop [WITHSCORES]

# 返回有序集中指定分数区间内的成员，分数从低到高排序
ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]

# 返回有序集中指定分数区间内的成员，分数从高到低排序
ZREVRANGEBYSCORE key max min [WITHSCORES] [LIMIT offset count]

# 返回有序集合中指定成员的排名，有序集成员按分数值（从小到大）排序
ZRANK key member

# 返回有序集合中指定成员的排名，有序集成员按分数值（从大到小）排序
ZREVRANK key member

# 获取有序集合的成员数
ZCARD key

# 返回有序集中，成员的分数值
ZSCORE key member

# 计算在有序集合中指定区间分数的成员数
ZCOUNT key min max

```

#### 修改

```shell

# 向有序集合添加一个或多个成员，或者更新已存在成员的分数
ZADD key score member [score member ...]

# 有序集合中对指定成员的分数加上增量 increment
ZINCRBY key increment member
```

#### 删除

```shell
# 移除有序集合中的一个或多个成员
ZREM key member [member ...]

# 移除有序集合中给定的排名区间的所有成员
ZREMRANGEBYRANK key start stop

# 移除有序集合中给定的分数区间的所有成员
ZREMRANGEBYSCORE key min max
```

### 通用命令

```shell
# 返回所有 key
KEYS *

# 返回所有以 my 开头的 key
KEYS my*

# 获取 key 的类型
TYPE key

# 查询某个 key 是否存在
EXISTS key [key ...]

# 将 key 改名为 newkey
RENAME key newkey

# 删除指定 key
DEL key [key ...]

# 从当前数据库中随机返回(不删除)一个 key
RANDOMKEY

# 对 key 进行重命名
RENAME key newkey

# 清空当前数据库所有内容
FLUSHDB

# 清空所有数据库内容
FLUSHALL

# 将当前数据库的 key 移动到给定的数据库 db 当中
MOVE key db
```

## Redis 过期时间

### 设置键的过期时间

```shell
# 为给定 key 设置生存时间，当 key 过期时(生存时间为 0 )，它会被自动删除。
EXPIRE key seconds

# 和 EXPIRE 一样，但是它以毫秒为单位
PEXPIRE key milliseconds

# EXPIREAT 的作用和 EXPIRE 类似，都用于为 key 设置生存时间。
# 不同在于 EXPIREAT 命令接受的时间参数是 UNIX 时间戳(unix timestamp)。
EXPIREAT key timestamp

# 这个命令和 EXPIREAT 命令类似，但它以毫秒为单位设置 key 的过期 unix 时间戳，而不是像 EXPIREAT 那样，以秒为单位。
PEXPIREAT key milliseconds-timestamp

```

### 获取键的过期时间

```shell
# 以秒为单位，返回给定 key 的剩余生存时间(TTL, time to live)。
TTL key

# 类似于 TTL，但它以毫秒为单位返回 key 的剩余生存时间。
PTTL key
```

- -2 过期且已删除
- -1 没有过期时间设置，即永不过期
- \> 0 表示距离过期还有多少秒或者毫秒

### 清除键的过期时间

```shell
# 移除给定 key 的生存时间，将这个 key 从『易失的』(带生存时间 key )转换成『持久的』(一个不带生存时间、永不过期的 key )。
PERSIST key
```

## Redis 事务

### 事务的基础概念

关于事务最常见的例子就是银行转账，A 账户给 B 账户转账一个亿 (T1)，买一块地盖房子。在这种交易的过程中，有几个问题值得思考：

- 如何同时保证上述交易中，A 账户总金额减少一个亿，B 账户总金额增加一个亿？ A
- A 账户如果同时在和 C 账户交易(T2)，如何让这两笔交易互不影响？ I
- 如果交易完成时数据库突然崩溃，如何保证交易数据成功保存在数据库中？ D
- 如何在支持大量交易的同时，保证数据的合法性(没有钱凭空产生或消失) ？ C

要保证交易正常可靠地进行，数据库就得解决上面的四个问题，这也就是事务诞生的背景，它能解决上面的四个问题，对应地，它拥有四大特性（ACID）。

1. 原子性（Atomicity）: 事务要么全部完成，要么全部取消。 如果事务崩溃，状态回到事务之前（事务回滚）。
   确保不管交易过程中发生了什么意外状况（服务器崩溃、网络中断等），不能出现 A 账户少了一个亿，但 B 账户没到帐，或者 A 账户没变，但 B 账户却凭空收到一个亿（数据不一致）。A 和 B 账户的金额变动要么同时成功，要么同时失败(保持原状)。

2. 隔离性（Isolation）: 如果 2 个事务 T1 和 T2 同时运行，事务 T1 和 T2 最终的结果是相同的，不管 T1 和 T2 谁先结束。
   如果 A 在转账 1 亿给 B（T1），同时 C 又在转账 3 亿给 A（T2），不管 T1 和 T2 谁先执行完毕，最终结果必须是 A 账户增加 2 亿，而不是 3 亿，B 增加 1 亿，C 减少 3 亿。

3. 持久性（Durability）: 一旦事务提交，不管发生什么（崩溃或者出错），数据要保存在数据库中。
   确保如果 T1 刚刚提交，数据库就发生崩溃，T1 执行的结果依然会保持在数据库中。

4. 一致性（Consistency）: 只有合法的数据（依照关系约束和函数约束）才能写入数据库。
   确保钱不会在系统内凭空产生或消失， 依赖原子性和隔离性。

### Redis 中的事务

Redis 中提供了以下三个命令来处理事务：

```shell
# 标记一个事务块的开始
# 事务块内的多条命令会按照先后顺序被放进一个队列当中，最后由 EXEC 命令原子性(atomic)地执行
MULTI

# 执行所有事务块内的命令。
EXEC

# 取消事务，放弃执行事务块内的所有命令。
DISCARD
```

示例：

```shell
SET Jack 10

SET Rose 20

# Jack 给 Rose 转账 5 块钱

# 开启事务
MULTI

DECRBY Jack 5

INCRBY ROSE 5

EXEC
```

### 事务中的错误处理

1. 语法错误。语法错误指命令不存在或命令参数的个数不对。比如：

```shell
MULTI

# 正确的命令
SET key value

# 错误的命令
SET key

ERRORCOMMAND key

EXEC
```

而只要有一个命令有语法错误，执行 EXEC 命令后 Redis 就会直接返回错误，连语法正确的命令也不会执行。

2.  运行错误。运行错误指在命令执行时出现的错误，比如使用散列类型的命令操作集合类型的键，这种错误在实际执行之前 Redis 是无法发现的，所以在事务里这样的命令是会被 Redis 接受并执行的。如果事务里的一条命令出现了运行错误，事务里其它的命令依然会继续执行，例如：

```shell
MULTI

SET key 1

SADD key 2

SET key 3

EXEC
```

### 事务中的 WATCH 命令

WATCH 定义：监视一个(或多个) key ，如果在事务执行之前这个(或这些) key 被其他命令所改动，那么事务将被打断。

WATCH 相关命令如下：

```shell
# 监视一个(或多个) key ，如果在事务执行之前这个(或这些) key 被其他命令所改动，那么事务将被打断。
WATCH key [key ...]

# 取消 WATCH 命令对所有 key 的监视。
# 如果在执行 WATCH 命令之后， EXEC 命令或 DISCARD 命令先被执行了的话，那么就不需要再执行 UNWATCH 了。
UNWATCH

```

## Redis 持久化

redis 的强劲性能很大程度上是由于其将所有数据都存储在内存中，然而当 Redis 重启或宕机后，所有存储在内存中的数据就会丢失。在一些情况下，我们会希望 Redis 在重启后能够保证数据不丢失。

这时我们希望 Redis 能将数据从内存中以某种形式同步到硬盘中，使得重启后可以根据硬盘中的记录恢复数据。这一过程就是持久化。

Redis 提供了两种持久化方案：

- RDB 持久化，根据指定的规则“定时”将内存中的数据存储在硬盘上，在重启之后读取硬盘上的 .rdb 快照文件将数据恢复到内存中。
- AOF 持久化：AOF 持久化记录服务器执行的所有写操作命令形成 .aof 日志文件保存到硬盘中，并在服务器启动时，通过重新执行这些命令来还原数据集。

### RDB 持久化

RDB 方式的持久化是通过快照完成的，当符合一定条件时 Redis 会自动将内存中的所有数据生成一份副本并存储在硬盘上，这个过程即为“快照”。

Redis 允许用户自定义快照条件，当符合快照条件时，Redis 会自动执行快照操作。进行快照的条件可以由用户在配置文件中自定义，由两个参数构成：时间窗口 M 和改动的键的个数 N。每当时间 M 内被更改的键的个数大于 N 时，即符合自动快照条件。

RDB 持久化相关配置规则如下：

```shell

save 900 1 # 每 900 秒至少有 1 个 key 变化了，则写入快照
save 300 10 # 每 300 秒至少有 10 个 key 变化了，则写入快照
save 60 10000 # 每 60 秒至少有 10000 个 key 变化了，则写入快照

dbfilename dump.rdb # 快照保存的文件名称

dir ./ # 快照文件保存路径
```

### AOF 持久化

默认情况下，Redis 没有开启 AOF 方式的持久化，可以通过 appendonly 参数启用：

```shell
appendonly yes
```

AOF 有三种同步策略：

```shell
# 每修改同步，每一次发送数据变化都会被立即同步到磁盘中，效率比较低，但是数据最安全
appendfsync always

# 默认值，每秒同步，异步完成，同步效率非常高，缺点是一旦系统出现宕机，这1秒之内操作的数据就会丢失
appendfsync everysec

# 不同步
appendfsync no
```

### RDB vs AOF

| 持久化方式 | 优点                         | 缺点                                                                           |
| ---------- | ---------------------------- | ------------------------------------------------------------------------------ |
| RDB        | 文件小、异步备份、性能好     | 恢复大数据集速度比 AOF 快 数据安全性低。容易丢失数据、数据量比较大时备份速度慢 |
| AOF        | 数据安全性高、有利于开发分析 | 相同数据集比 RDB 文件大、根据所使用的 fsync 策略，AOF 速度可能会慢于 RDB       |

## Redis 图形管理软件

RDM：https://rdm.dev/。
