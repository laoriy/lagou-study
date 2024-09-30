const Service = require('egg').Service;
const jwt = require('jsonwebtoken');

class UserService extends Service {
  get User() {
    return this.app.model.User;
  }
  findByUsername(username) {
    return this.User.findOne({ username });
  }
  findByEmail(email) {
    return this.User.findOne({ email }).select('+password');
  }
  async create(data) {
    const user = new this.User(data);
    user.password = this.ctx.helper.md5(user.password);
    await user.save();
    return user;
  }
  createToken(data) {
    const token = jwt.sign(data, this.app.config.jwt.secret, {
      expiresIn: this.app.config.jwt.expiresIn,
    });
    return token;
  }
  verifyToken(token) {
    return jwt.verify(token, this.app.config.jwt.secret);
  }
}

module.exports = UserService;
