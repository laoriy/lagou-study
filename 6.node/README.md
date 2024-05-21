1. Node.js 技术架构， 分为三层：
   ![image](/images/introduce.webp)

   1. 最上层是 Node API，这些 Native Modules，提供 http 模块、流模块、fs 文件模块等等，可以使用 js 直接调用
   2. 中间层 Node Bindings 中间层 node bindings 主要是使 js 和 C/C++ 进行通信
   3. 最下面这一层是支撑 nodejs 运行的关键，主要由 v8、libuv、c-ares 等模块组成，向上一层提供 api 服务

2. Nodejs 特点

   - 更适用于 IO 密集型高并发请求

3. 单线程：
   1. 配合异步 IO 和事件循环，可以实现高并发请求，适合IO密集型任务
   2. 运行 JavaScript 代码的主线程是单线程
   3. 不太适合 CPU 密集型型任务


4. 全局变量

    - __filename: 当前模块的绝对路径
    - __dirname: 当前模块所在的目录的绝对路径
    - require: 引入模块的函数
    - module、exports: 处理模块的导出
    - process: 当前进程的引用对象
    - timer类函数：执行顺序和事件循环间的关系
    - Buffer: 缓冲区对象
    
