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

function resolvePromise(promise2, x, resolve, reject) {
    // 先判断自返回
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if (x instanceof MyPromise) { // promise对象
        x.then(resolve, reject)
    } else {
        // 普通值
        resolve(x)
    }

}

class MyPromise {
    // promise 状态
    status = PENDING
    // 成功之后的值
    value = undefined
    // 失败之后的值
    reason = undefined
    // 成功回调
    successCallback = []
    // 失败回调
    failCallback = []

    constructor(executor) {
        try {
            executor(this.resolve, this.reject)

        } catch (error) {
            this.reject(error)
        }
    }
    // 因为resolve和reject都是直接作为一个函数调用，使用箭头函数定义是为了让函数内部的this指向Promies实例
    resolve = (value) => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return
        // 状态改为成功
        this.status = FULFILLED
        // 保存成功的值
        this.value = value
        // 成功回调是否存在，存在时，执行它
        while (this.successCallback.length) this.successCallback.shift()()
    }
    reject = (reason) => {
        // 如果状态不是等待，阻止程序向下执行
        if (this.status !== PENDING) return
        // 状态改为失败
        this.status = REJECTED
        // 保存失败的原因
        this.reason = reason
        // 失败回调是否存在，存在时，执行它
        while (this.failCallback.length) this.failCallback.shift()()
    }
    then(successCallback, failCallback) {
        successCallback = successCallback ? successCallback : value => value
        failCallback = failCallback ? failCallback : reason => { throw reason }
        const promise2 = new MyPromise((resolve, reject) => {
            if (this.status === FULFILLED) {
                // 为了拿到promise2这里加一个异步逻辑，
                setTimeout(() => {
                    try {
                        const x = successCallback(this.value)
                        // 判断 x 的值是普通值还是promise对象
                        // 如果是普通值 直接调用resolve 
                        // 如果是promise对象 查看promsie对象返回的结果 
                        // 再根据promise对象返回的结果 决定调用这个新Promise的resolve 还是调用reject
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }

                }, 0)
            } else if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        const x = failCallback(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0)

            } else {
                // 等待,将成功和失败回调存储起来
                this.successCallback.push(() => {
                    setTimeout(() => {
                        try {
                            const x = successCallback(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }

                    }, 0)
                })
                this.failCallback.push(() => {
                    setTimeout(() => {
                        try {
                            const x = failCallback(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                })
            }
        })
        return promise2
    }

    finally(callback) {
        return this.then((value) => {
            // 通过MyPromise.resolve进行promise化，然后在then里面返回value
            return MyPromise.resolve(callback()).then(() => value)
        }, (reason) => {
            return MyPromise.resolve(callback()).then(() => { throw reason })
        })
    }

    catch(failCallback){
        return this.then(undefined,failCallback)
    }

    static all(array) {
        let result = []

        let finishCtn = 0
        return new MyPromise((resolve, reject) => {
            /**
             * 将下标为key的元素添加到result当中
             */
            function addData(key, value) {
                result[key] = value
                finishCtn++;
                // 当数组所有的项已经有结果了就resolve
                if (finishCtn === array.length) {
                    resolve(result)
                }
            }
            for (let i = 0; i < array.length; i += 1) {
                let current = array[i]
                if (current instanceof MyPromise) {
                    current.then(value => addData(i, value), (reason) => {
                        reject(reason)
                    })
                } else {
                    //普通值
                    addData(i, current)
                }
            }
        })
    }

    static resolve(value) {
        if (value instanceof MyPromise) return value
        return new MyPromise(resolve => resolve(value))
    }
}

// let promise = new Promise((resolve, reject) => {
//     // setTimeout(() => {
//     //     resolve("成功")
//     // }, 1000)
//     setTimeout(() => {
//         reject("失败")
//     }, 1000)
//     // reject("失败")
// })

// promise.then(value => {
// }, () => {
//     return 10000

// }).then(res => {
//     console.log(res, 'res');
// })


// let mypromise = new MyPromise((resolve, reject) => {
//     // resolve("成功")
//     setTimeout(() => {
//         resolve("成功")
//     }, 1000)
//     // reject('失败')
//     // setTimeout(() => {
//     //     reject("失败 ")
//     // }, 2000)
// })
// mypromise.then(value => {
//     return new MyPromise((r, rj) => {
//         setTimeout(() => {
//             r('失败撒11')
//         }, 1000)
//     })
// }).then(res => {
//     console.log(res, 'res');
// })

// 自返回示例代码
// let promise = new MyPromise((resolve) => {
//     resolve("success")
// })
// let p1 = promise.then((v) => {
//     console.log(v);
//     return p1
// })
// p1.then(() => { }, e => {
//     console.log(e.message); // Chaining cycle detected for promise #<Promise>
// })


let p1 = () => {
    return new MyPromise((resolve) => {
        setTimeout(() => {
            resolve('b')
        }, 1000)
    })
}

let p2 = () => {
    return new MyPromise((resolve, reject) => {
        resolve('c')
        // reject('c')
    })
}

// MyPromise.all(['a', p1(), p2(), 'd']).then(data => {
//     console.log(data);
// }, (e) => {
//     console.log(e);
// })

// MyPromise.resolve(100).then(data => console.log(data))
// MyPromise.resolve(p1()).then(data => console.log(data))

p2().finally(() => {
    console.log('11');
    return p1()
}).then(v => {
    console.log(v, 'v');
}, e => {
    console.log(e, 'e');
})