const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const User = this.app.model.user;
    await new User({
      userName: 'test',
      password: 'test',
    }).save();
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
