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

### 查询

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

### 修改

```shell
# 设置指定 key 的值
SET key value

# 将给定 key 的值设为 value ，并返回 key 的旧值(old value)
GETSET key value

# 如果 key 已经存在并且是一个字符串， APPEND 命令将指定的 value 追加到该 key 原来值（value）的末尾。
APPEND key value
```

### 删除

```shell
# 通用命令：删除1个或多个指定的 key
DEL key [key ...]
```
