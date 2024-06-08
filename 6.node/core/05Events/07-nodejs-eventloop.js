setTimeout(() => {
  console.log("s1");
  Promise.resolve().then(() => {
    console.log("p1");
  });
  process.nextTick(() => {
    console.log("t1");
  });
});

Promise.resolve().then(() => {
  console.log("p2");
});

console.log("start");

setTimeout(() => {
  console.log("s2");
  Promise.resolve().then(() => {
    console.log("p3");
  });
  process.nextTick(() => {
    console.log("t2");
  });
});

console.log("end");

// start end p2 s1 t1 p1 s2 t2 p3
// node11.0之前的机制，例如timers里面有两个settimeout，则两个settimeout都执行完之后，再执行微任务，但是node11.0之后，node修改了执行机制，和浏览器一样，执行完一个宏任务之后立刻执行所有微任务，例如下面示例3.1所示。
