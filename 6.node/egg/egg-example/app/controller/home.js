const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = "Hello world";
  }
  async list() {
    const { ctx } = this;
    const user = ctx.helper.getUser("larrrr");
    const dataList = {
      list: [
        { id: 1, title: "This is news 1" + user, url: "/news/1" },
        { id: 2, title: "This is news 2" + user, url: "/news/2" },
      ],
    };

    await ctx.render("index.tpl", dataList);
  }
}

module.exports = HomeController;
