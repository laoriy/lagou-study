// 自定义可读流
const { Readable } = require("stream");

let source = ["lg", "laor", "syy"];

class MyReadable extends Readable {
  constructor(source) {
    super();
    this.source = source;
  }
  // 重写_read方法
  _read() {
    if (this.source.length > 0) {
      this.push(this.source.shift());
    } else {
      this.push(null);
    }
  }
}

let rs = new MyReadable(source);
rs.on("readable", () => {
  let data = null;
  while ((data = rs.read()) !== null) {
    console.log(data.toString());
  }
});
rs.on("data", (chunk) => {
  console.log(chunk.toString());
});
