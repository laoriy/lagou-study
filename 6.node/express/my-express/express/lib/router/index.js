const url = require("url");
const methods = require("methods");
const { pathToRegexp } = require("path-to-regexp");

function Router() {
  this.stack = [];
}

methods.forEach((method) => {
  Router.prototype[method] = function (path, handler) {
    this.stack.push({
      path,
      method,
      handler,
    });
  };
});

Router.prototype.handle = function (req, res) {
  const { pathname } = url.parse(req.url);
  const method = req.method.toLowerCase();
  const route = this.stack.find((route) => {
    const regexp = pathToRegexp(route.path);
    const match = regexp.exec(pathname);
    if (match) {
      req.params = req.params || {};
      regexp.keys.forEach((key, index) => {
        req.params[key.name] = match[index + 1];
      });
    }
    return match && route.method === method;
  });
  if (route) {
    return route.handler(req, res);
  }
  res.end("404 Not Found.");
};

module.exports = Router;