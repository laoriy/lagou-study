const { User } = require('../models')
const jwt = require('jsonwebtoken')

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body
    // 如果有就登录
    let user = await User.findOne({ username })
    if (user) {
      if (password !== user.password) {
        return res.status(400).json({
          error: '密码不正确'
        })
      }
      // 有用户，并且密码正确
    } else {
      // 如果没有就注册
      user = await new User(req.body).save()
    }

    res.status(200).send({
      user: {
        username: user.username,
        token: jwt.sign({
          userId: user._id
        }, '859a425c-9aef-42e5-8305-8eeba8532cc5', {
          expiresIn: '24h'
        }) // 用户身份
      }
    })
  } catch (err) {
    next(err) // 交给后面的错误处理中间件统一处理错误
  }
}

exports.hello = async (req, res, next) => {
  try {
    // 处理请求
  } catch (err) {
    next(err) // 交给后面的错误处理中间件统一处理错误
  }
}

exports.world = async (req, res, next) => {
  try {
    // 处理请求
  } catch (err) {
    next(err) // 交给后面的错误处理中间件统一处理错误
  }
}
