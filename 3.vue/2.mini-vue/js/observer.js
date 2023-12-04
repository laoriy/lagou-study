class Observer {
    constructor(data) {
        this.walk(data)
    }
    walk(data) {
        // 1.判断data是否是对象
        if (!data || typeof data !== 'object') return

        // 2.遍历data对象所有属性
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })
    }
    defineReactive(obj, key, val) {
        let that = this
        //负责收集依赖并发送通知
        let dep = new Dep()
        // 将对象也转换为响应式数据
        this.walk(val)
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                Dep.target && dep.addSub(Dep.target)
                return val // 只能使用val.不能使用obj[key] ,否则会死递归   
            },
            set(newValue) {
                if (newValue === val) return
                val = newValue
                that.walk(newValue) // 非对象赋值给对象
                // 发送通知
                dep.notify()
            }
        })
    }
}