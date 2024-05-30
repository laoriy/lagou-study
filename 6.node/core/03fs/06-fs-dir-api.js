const fs = require('fs')

// 一、access 
fs.access('data.txt', (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('有操作权限')
  }
})

// 二、stat 
fs.stat('data.txt', (err, statObj) => {
  console.log(statObj)
  console.log(statObj.isFile())
  console.log(statObj.isDirectory())
})

// 三、mkdir 
fs.mkdir('a/b/c', {recursive: true}, (err) => {
  if (!err) {
    console.log('创建成功')
  }else{
    console.log(err)
  }
})

// 四、rmdir
fs.rmdir('a', {recursive: true}, (err) => {
  if (!err) {
    console.log('删除成功')
  } else {
    console.log(err)
  }
})

// 五、readdir 
fs.readdir('a/b', (err, files) => {
  console.log(files)
})

// 六、unlink
/* fs.unlink('a/d.txt', (err) => {
  if (!err) {
    console.log('删除成功')
  }
}) */