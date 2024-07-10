const mongoose = require('mongoose')

// 连接 MongoDB 数据库
mongoose.connect('mongodb://127.0.0.1:27017/wb', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', err => {
  console.log('连接失败', err)
})

db.once('open', function () {
  console.log('连接成功')
})

module.exports = {
  User: mongoose.model('User', require('./user')),
  // Article: mongoose.model('Article', require('./article')),
}
