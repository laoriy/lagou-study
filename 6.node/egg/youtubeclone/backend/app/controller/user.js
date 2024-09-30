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
    const token = await this.service.user.createToken({ userId: user._id });

    // 4. 发送响应
    this.ctx.body = {
      user: {
        email: user.email,
        token,
        username: user.username,
        channelDescription: user.channelDescription,
        avatar: user.avatar,
      },
    };
  }

  async login() {
    // 1. 基本数据验证
    const body = this.ctx.request.body;
    this.ctx.validate(
      {
        email: { type: 'email' },
        password: { type: 'string' },
      },
      body
    );
    const { email, password } = body;
    const user = await this.service.user.findByEmail(email);
    if (!user) {
      this.ctx.throw(402, '用户不存在');
    }
    if (user.password !== this.ctx.helper.md5(password)) {
      this.ctx.throw(401, '密码错误');
    }
    const token = await this.service.user.createToken({ userId: user._id });
    // 5. 发送响应数据
    this.ctx.body = {
      user: {
        email: user.email,
        token,
        username: user.username,
        channelDescription: user.channelDescription,
        avatar: user.avatar,
      },
    };
  }
  getCurrentUser() {
    // 1. 验证token
    // 1. 验证 token
    // 2. 获取用户
    // 3. 发送响应
    const user = this.ctx.user;
    this.ctx.body = {
      user: {
        email: user.email,
        token: this.ctx.header.authorization,
        username: user.username,
        channelDescription: user.channelDescription,
        avatar: user.avatar,
      },
    };
  }
}

module.exports = UserController;
