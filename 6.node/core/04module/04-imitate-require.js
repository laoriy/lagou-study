const { dir } = require("console");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

function Module(id) {
  this.id = id;

  this.exports = {};
  console.log(1111);
}

Module.prototype.load = function () {
  let extname = path.extname(this.id);
  Module._extensions[extname](this);
};

Module.wrapper = [
  "(function (exports, require, module, __filename, __dirname) {",
  "})",
];
Module._cache = {};

Module._extensions = {
  ".js": function (module) {
    // 读取
    let content = fs.readFileSync(module.id, "utf-8");
    // 包装
    content = Module.wrapper[0] + content + Module.wrapper[1];

    // VM
    let compileFn = vm.runInThisContext(content);

    // 准备参数的值
    let exports = module.exports;
    let dirname = path.dirname(module.id);
    let filename = module.id;

    // 执行
    compileFn.call(exports, exports, myRequire, module, filename, dirname);
  },
  ".json": function (module) {
    const content = fs.readFileSync(module.id, "utf-8");

    module.exports = JSON.parse(content);
  },
};

Module._resolveFilename = function (filename) {
  // 1. 获取绝对路径
  let absPath = path.resolve(__dirname, filename);

  // 判断当前路径对应的内容是否存在

  if (fs.existsSync(absPath)) {
    return absPath;
  } else {
    // 文件定位
    let suffix = Object.keys(Module._extensions);
    for (let i = 0; i < suffix.length; i++) {
      let newPath = absPath + suffix[i];
      if (fs.existsSync(newPath)) {
        return newPath;
      }
    }
  }
  throw new Error(`can not find ${filename}`);
};

function myRequire(filename) {
  // 1. 获取绝对路径
  let mPath = Module._resolveFilename(filename);

  // 2. 缓存优先
  let cacheModule = Module._cache[mPath];
  if (cacheModule) {
    return cacheModule.exports;
  }
  // 3. 创建缓存模块
  let module = new Module(mPath);
  Module._cache[mPath] = module;

  // 4. 执行模块
  module.load();

  // 5. 返回模块
  return module.exports;
}

let obj = myRequire("./m");
let obj2 = myRequire("./m");
let obj1 = myRequire("./v");
console.log(obj, obj2, obj1);
