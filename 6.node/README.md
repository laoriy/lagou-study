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
