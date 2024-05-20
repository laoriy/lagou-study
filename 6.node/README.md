1. Node.js 技术架构， 分为三层：
   ![image](/images/introduce.webp)

   1. 最上层是 Node API，这些 Native Modules，提供 http 模块、流模块、fs 文件模块等等，可以使用 js 直接调用
   2. 中间层 Node Bindings 中间层 node bindings 主要是使 js 和 C/C++ 进行通信
   3. 最下面这一层是支撑 nodejs 运行的关键，主要由 v8、libuv、c-ares 等模块组成，向上一层提供 api 服务

2. Nodejs 特点
   更适用于 IO 密集型高并发请求
