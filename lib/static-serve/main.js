const http = require("http");
const path = require("path");
const fs = require("fs").promises;
const mime = require("mime");
const { createReadStream } = require("fs");

function mergeConfig(config) {
  return {
    port: 1004,
    directory: process.cwd(),
    ...config,
  };
}
class Server {
  constructor(config) {
    this.config = mergeConfig(config);
    console.log(this.config);
  }

  start() {
    http
      .createServer(this.serverHandler.bind(this))
      .listen(this.config.port, () => {
        console.log(`Server running at http://localhost:${this.config.port}/`);
      });
  }

  async serverHandler(req, res) {
    const { pathname } = new URL(
      req.url,
      `http://localhost:${this.config.port}`
    );
    console.log(pathname);

    let absPath = path.join(this.config.directory, pathname);

    console.log(absPath);

    try {
      let statObj = await fs.stat(absPath);
      if (statObj.isFile()) {
        this.fileHandler(req, res, absPath);
      }
    } catch (error) {
      this.errorHandler(req, res, error);
    }
  }

  errorHandler(req, res, err) {
    console.log(err);
    res.statusCode = 404;
    res.setHeader("Content-type", "text/html;charset=utf-8");
    res.end("Not Found");
  }
  fileHandler(req, res, abspath) {
    res.statusCode = 200;
    res.setHeader("Content-type", mime.getType(abspath) + ";charset=utf-8");
    createReadStream(abspath).pipe(res);
  }
}

module.exports = Server;
