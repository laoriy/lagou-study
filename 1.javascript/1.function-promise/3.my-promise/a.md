Promise 实现

要实现 Promise 代码，要现在使用 Promise 层面上比较熟悉

1. new Promies 创建一个 promise 对象--Promise 就是一个类 在执行这个类的时候 需要传递一个执行器进去 执行器会立即执行
2. Promise 中有三种状态 分别为 成功 fulfilled 失败 rejected 等待 pending
   pending -> fulfilled
   pending -> rejected
   一旦状态确定就不可更改
3. resolve 和 reject 函数是用来更改状态的

```js
// 参照代码：创建一个Promise实例对象
let promise = new Promise((resolve, reject) => {
    resolve("成功")
    // reject("失败")
})

// MyPromise类
/**
 * 等待
 */
const PENDING = "pending"
/**
 * 成功
 */
const FULFILLED = "fulfilled"
/**
 * 失败
 */
const REJECTED = "rejected"

class MyPromise {
    // promise 状态
    status = PENDING
    constructor(executor) {
        executor(this.resolve, this.reject)
    }
    // 因为resolve和reject都是直接作为一个函数调用，使用箭头函数定义是为了让函数内部的this指向Promies实例
    resolve = (value) => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return
        // 状态改为成功
        this.status = FULFILLED
    }
    reject = (reason) => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return
        // 状态改为失败
        this.status = REJECTED
    }
}
```

4. promise 执行 then 方法，可以传递两个参数分别为成功回调，失败回调；then 方法内部做的事情就判断状态 如果状态是成功 调用成功的回调函数 如果状态是失败 调用失败回调函数 then 方法是被定义在原型对象中的

```js
// 参照代码：then方法
promise.then(
    (value) => {},
    (reason) => {}
)

// MyPromise类
class MyPromise {
    // ...省略的代码

    // 添加一个原型方法
    then(successCallback, failCallback) {
        if (this.status === FULFILLED) {
            successCallback()
        } else if (this.status === REJECTED) {
            failCallback()
        }
    }
}
```

5. then 成功回调有一个参数 表示成功之后的值 then 失败回调有一个参数 表示失败后的原因，所以要记录成功的值或者失败的原因

```js
class MyPromise {
    // 成功之后的值
    value = undefined
    // 失败之后的值
    reason = undefined
    resolve = (value) => {
        // 增加如下代码，保存成功的 值
        this.value = value
    }
    reject = (reason) => {
        //  增加如下代码，保存失败的原因
        this.reason = reason
    }
    // ...省略的代码
    then(successCallback, failCallback) {
        if (this.status === FULFILLED) {
            successCallback(this.value)
        } else if (this.status === REJECTED) {
            failCallback(this.reason)
        }
    }
}
```
恭喜你，一个最简单的Promise类已经实现了
```

```


