Buffer.prototype.split = function (step) {
  let len = Buffer.from(step).length;
  let offset = 0;
  let current = 0;
  let arr = [];
  while (-1 != this.indexOf(step, offset)) {
    current = this.indexOf(step, offset);
    arr.push(this.slice(offset, current));
    offset = current + len;
  }
  arr.push(this.slice(offset)); //将剩余结果进行添加
  return arr.map((item) => item.toString());
};

let buf = Buffer.from("zce吃馒头，吃面条，我吃所有吃");
let bufArr = buf.split("吃");
console.log(bufArr);
