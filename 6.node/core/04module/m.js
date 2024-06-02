// 一、模块的导入与导出
/* const age = 18
const addFn = (x, y) => {
  return x + y
}

module.exports = {
  age: age, 
  addFn: addFn
} */

// 二、module 
/* module.exports = 1111
console.log(module) */

/* {
  id: 'E:\\study\\lagou-study\\6.node\\core\\04module\\m.js',
  path: 'E:\\study\\lagou-study\\6.node\\core\\04module',
  exports: 1111,
  filename: 'E:\\study\\lagou-study\\6.node\\core\\04module\\m.js',
  loaded: false,
  children: [],
  paths: [
    'E:\\study\\lagou-study\\6.node\\core\\04module\\node_modules',
    'E:\\study\\lagou-study\\6.node\\core\\node_modules',
    'E:\\study\\lagou-study\\6.node\\node_modules',
    'E:\\study\\lagou-study\\node_modules',
    'E:\\study\\node_modules',
    'E:\\node_modules'
  ]
} */

// 三、exports 
// exports.name = 'zce'
/* exports = { // 这种方式无效
  name: 'syy',
  age: 18
} */

// 四、同步加载
/* let name = 'lg'
let iTime = new Date()

while(new Date() -iTime < 4000) {}

module.exports = name
console.log('m.js被加载导入了') */

/* console.log(require.main == module) */ // require.main 可以认为指向当前模块的主模块

module.exports = 'lg'

