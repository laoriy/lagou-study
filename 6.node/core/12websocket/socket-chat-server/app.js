const express = require('express')
const cors = require('cors')
const app = express()
const router = require('./router')
const jwt = require('jsonwebtoken')
const { User } = require('./models')

// 配置解析 POST 请求体，它会把解析到的数据挂载到 req.body 上
app.use(express.json())

// 给 http 接口提供 cors 跨域处理
app.use(cors())

// 挂载路由
app.use('/api', router)

const http = require('http')

const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

// socket 通信的中间件
// 这个中间件
io.use((socket, next) => {
  const token = socket.handshake.auth.token
  jwt.verify(token, '859a425c-9aef-42e5-8305-8eeba8532cc5', async (err, data) => {
    if (err) {
      // 没有登录状态，返回失败信息
      return next(new Error("身份认证失败"))
    }
    // 验证成功
    const user = await User.findById(data.userId)
    // 将查到的用户挂载到 request 请求对象中，给后面的处理使用
    console.log('认证通过', user)
    socket.request.user = user
    next()
  })
})

// 处理 HTTP 协议的使用 Express 的实例 app

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// 处理 WebSocket 协议的使用 socket.io 的实例 io

// 存储所有的 socket 通信端口
const clients = []

// 当使用 WebSocket 协议通信和服务端建立连接成功后触发改事件

// 连接成功只会出发1次
io.on('connection', socket => {
  clients.push(socket)
  console.log('有用户连接进来了', clients.length)
  // 收发消息
  // 接收消息：socket.on('消息类型', 数据 => {})
  // 发送消息：socket.emit('发送消息', 数据)

  socket.on('chat message', data => {
    console.log('chat message => ', data)
    // 谁给我发的消息这个消息就发给谁响应给客户端
    // socket.emit('chat message', '我收到了')

    // 发给当前所有已连接的在线用户
    // clients.forEach(item => {
    //   item.emit('chat message', '这是群发的消息')
    // })
    console.log(socket.request.user.username)
    io.emit('chat message', {
      nickname: socket.request.user.username,
      message: data
    })
    // socket.broadcast.emit('chat message', '发给不包括当前发送消息的 socket 其它用户');
  })

  socket.on('disconnect', () => {
    const index = clients.findIndex(item => item === socket)
    if (index !== -1) {
      clients.splice(index, 1)
    }
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})
