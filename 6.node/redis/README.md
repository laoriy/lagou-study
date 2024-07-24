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
