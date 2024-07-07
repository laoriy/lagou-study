#! /usr/bin/env node
const { program } = require("commander");
const Server = require("../main");

// 配置信息
let options = {
  "-p --port <dir>": {
    description: "init server port",
    example: "static-server -p 3306",
  },
  "-d --directory <dir>": {
    description: "init server directory",
    example: "static-server -d c:",
  },
};
function formatConfig(configs, cb) {
  Object.entries(configs).forEach(([key, val]) => {
    cb(key, val);
  });
}
formatConfig(options, (cmd, val) => {
  program.option(cmd, val.description);
});

program.on("--help", () => {
  console.log("Examples: ");
  formatConfig(options, (cmd, val) => {
    console.log(val.example);
  });
});

program.name("static-server");
let version = require("../package.json").version;
program.version(version);

let cmdConfig = program.parse(process.argv);

let config = cmdConfig.opts();

let server = new Server(config);
server.start();
