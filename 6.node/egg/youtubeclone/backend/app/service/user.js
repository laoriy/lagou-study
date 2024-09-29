const Service = require('egg').Service;

class UserService extends Service {
  get User() {
    return this.app.model.User;
  }
  findByUsername(username) {
    return this.User.findOne({ username });
  }
  findByEmail(email) {
    return this.User.findOne({ email });
  }
  async create(data) {
    const user = new this.User(data);
    user.password = this.ctx.helper.md5(user.password);
    await user.save();
    return user;
  }
}

module.exports = UserService;
