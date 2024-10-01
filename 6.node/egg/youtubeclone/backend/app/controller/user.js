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

  async update() {
    // 1. 基本数据验证
    const { body } = this.ctx.request;
    this.ctx.validate(
      {
        username: { type: 'string', required: false },
        email: { type: 'email', required: false },
        channelDescription: { type: 'string', required: false },
        avatar: { type: 'string', required: false },
      },
      body
    );
    // 2. 校验用户是否已存在
    const userService = this.service.user;
    if (body.username) {
      if (
        body.username !== this.ctx.user.username &&
        (await userService.findByUsername(body.username))
      ) {
        this.ctx.throw(422, 'username 已存在');
      }
    }

    // 3. 校验邮箱是否已存在
    if (body.email) {
      if (body.email !== this.ctx.user.email && (await userService.findByEmail(body.email))) {
        this.ctx.throw(422, 'email 已存在');
      }
    }

    // 4. 更新用户信息
    const user = await userService.updateUser(body);

    // 5. 返回更新之后的用户信息
    this.ctx.body = {
      user: {
        email: user.email,
        password: user.password,
        username: user.username,
        channelDescription: user.channelDescription,
        avatar: user.avatar,
      },
    };
  }
  async subscribe() {
    const userId = this.ctx.user._id;
    const channelId = this.ctx.params.userId;
    // 1. 用户不能订阅自己
    if (userId.equals(channelId)) {
      this.ctx.throw(422, '用户不能订阅自己');
    }

    // 2. 添加订阅
    const user = await this.service.user.subscribe(userId, channelId);

    // 3. 发送响应
    this.ctx.body = {
      user: {
        ...this.ctx.helper._.pick(user, [
          'username',
          'email',
          'avatar',
          'cover',
          'channelDescription',
          'subscribersCount',
        ]),
        isSubscribed: true,
      },
    };
  }
  async unsubscribe() {
    const userId = this.ctx.user._id;
    const channelId = this.ctx.params.userId;
    // 1. 用户不能订阅自己
    if (userId.equals(channelId)) {
      this.ctx.throw(422, '用户不能订阅自己');
    }

    // 2. 取消订阅
    const user = await this.service.user.unsubscribe(userId, channelId);

    // 3. 发送响应
    this.ctx.body = {
      user: {
        ...this.ctx.helper._.pick(user, [
          'username',
          'email',
          'avatar',
          'cover',
          'channelDescription',
          'subscribersCount',
        ]),
        isSubscribed: false,
      },
    };
  }
  async getUser() {
    // 1. 获取订阅状态
    let isSubscribed = false;
    // 已登录
    if (this.ctx.user) {
      // 获取订阅记录
      const record = await this.app.model.Subscription.findOne({
        user: this.ctx.user._id,
        channel: this.ctx.params.userId,
      });
      if (record) {
        isSubscribed = true;
      }
    }
    // 2. 获取用户信息
    const user = await this.app.model.User.findById(this.ctx.params.userId);
    // 3. 发送响应
    this.ctx.body = {
      user: {
        ...this.ctx.helper._.pick(user, [
          'username',
          'email',
          'avatar',
          'cover',
          'channelDescription',
          'subscribersCount',
        ]),
        isSubscribed,
      },
    };
  }
}

module.exports = UserController;
