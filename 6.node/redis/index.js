const ioredis = require('ioredis')

// 1. 建立连接
const redis = new ioredis({
  port: 6379,
  host: '120.79.66.173',
  showFriendlyErrorStack: true,
})

console.log(redis);