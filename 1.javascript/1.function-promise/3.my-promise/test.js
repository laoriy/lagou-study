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
    then(successCallback, failCallback) {
        const promise2 = new MyPromise((resolve, reject) => {
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    const x = successCallback(this.value)
                    resolvePromise(promise2, x, resolve, reject)
                }, 0)
            } else if (this.status === REJECTED) {
                setTimeout(() => {
                    const x = failCallback(this.reason)
                    resolvePromise(promise2, x, resolve, reject)
                }, 0)
            } else {
                this.successCallback.push(() => {
                    setTimeout(() => {
                        const x = successCallback(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    }, 0)
                })
                this.failCallback.push(() => {
                    setTimeout(() => {
                        const x = failCallback(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    }, 0)
                })
            }
        })
        return promise2
    }
}