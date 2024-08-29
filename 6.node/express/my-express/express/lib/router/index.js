const url = require("url");
const methods = require("methods");
const Layer = require("./layer");

function Router() {
  this.stack = [];
}

methods.forEach((method) => {
  Router.prototype[method] = function (path, handler) {
    const layer = new Layer(path, handler);
    layer.method = method;
    this.stack.push(layer);
  };
});

Router.prototype.handle = function (req, res) {
  const { pathname } = url.parse(req.url);
  const method = req.method.toLowerCase();
  let index = 0;
  const next = () => {
    if (index >= this.stack.length) {
      return res.end(`Can not get ${pathname}`);
    }

    const layer = this.stack[index++];
    const match = layer.match(pathname);
    if (match) {
      req.params = req.params || {};
      Object.assign(req.params, layer.params);
    }
    if (match && layer.method === method) {
      return layer.handler(req, res, next);
    }
    next();
  };

  next();
};

module.exports = Router;
