const { pathToRegexp } = require("path-to-regexp");

function Layer(path, handler) {
  this.path = path;
  this.handler = handler;
  this.regexp = pathToRegexp(path);
  this.params = {};
}

Layer.prototype.match = function (pathname) {
  const match = this.regexp.exec(pathname);
  if (match) {
    this.params = this.params || {};
    this.regexp.keys.forEach((key, index) => {
      this.params[key.name] = match[index + 1];
    });
    return true;
  }
  return false;
};

module.exports = Layer;
