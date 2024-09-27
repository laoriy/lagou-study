const Controller = require('egg').Controller;

class UserController extends Controller {
  async create() {
    this.ctx.body = 'create user';
    // 1. 数据校验
    // 2. 保存用户
    // 3. 生成 token
    // 4. 发送响应
  }
}

module.exports = UserController;
