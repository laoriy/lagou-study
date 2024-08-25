const http = require("http");
const url = require("url");
const routes = [
  // { path: '', method: '', handler: () => {} }
  // { path: '', method: '', handler: () => {} }
  // { path: '', method: '', handler: () => {} }
  // { path: '', method: '', handler: () => {} }
];
const createApplication = () => {
  return {
    get(path, handler) {
      routes.push({
        path,
        method: "get",
        handler,
      });
    },
    listen: (...args) => {
      const server = http.createServer((req, res) => {
        const { pathname } = url.parse(req.url);
        const method = req.method.toLowerCase();
        const route = routes.find(
          (route) => route.path === pathname && route.method === method
        );
        if (route) {
          return route.handler(req, res);
        }
        res.end("404 Not Found.");
      });
      server.listen(...args);
    },
  };
};

module.exports = createApplication;
