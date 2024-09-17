const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = "Hello world";
  }
  async list() {
    const dataList = {
        list: [
          { id: 1, title: 'This is news 1', url: '/news/1' },
          { id: 2, title: 'This is news 2', url: '/news/2' }
        ]
      };

    await this.ctx.render("index.tpl", dataList);
  }
}

module.exports = HomeController;
