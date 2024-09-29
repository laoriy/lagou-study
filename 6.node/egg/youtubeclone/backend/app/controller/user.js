const Controller = require('egg').Controller;

class UserController extends Controller {
  async create() {
    const { body } = this.ctx.request;
    // 1. 数据校验
    this.ctx.validate({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
      email: { type: 'email', required: true },
    });

    const [existUser, existEmail] = await Promise.all([
      this.service.user.findByUsername(body.username),
      this.service.user.findByEmail(body.email),
    ]);

    if (existUser) {
      this.ctx.throw(422, '用户名已存在');
    }

    if (existEmail) {
      this.ctx.throw(422, '邮箱已存在');
    }
    // 2. 保存用户
    const user = await this.service.user.create(body);
    // 3. 生成 token
    // 4. 发送响应
    this.ctx.body = {
      user,
    };
  }
}

module.exports = UserController;
