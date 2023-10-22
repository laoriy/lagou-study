function memoize(fn) {
    const cache = new Map()
    return function (...args) {
        const key = JSON.stringify(args)
        if (cache.has(key)) return cache.get(key)
         const result = fn.apply(this, args)
         cache.set(key,result)
         return result
    }
}

/**
 * function memoize(func, resolver) {
    if (typeof func !== 'function' || (resolver != null && typeof resolver !== 'function')) {
        throw new TypeError('Expected a function')
    }
    const memoized = function (...args) {
        const key = resolver ? resolver.apply(this, args) : args[0]
        const cache = memoized.cache

        if (cache.has(key)) {
            return cache.get(key)
        }
        const result = func.apply(this, args)
        memoized.cache = cache.set(key, result) || cache
        return result
    }
    memoized.cache = new (memoize.Cache || Map)
    return memoized
}

memoize.Cache = Map
 */

const add = memoize((a, b) => {
    console.log('add--')
    return a + b
})

console.log(add(1, 2));
console.log(add(1, 3));
console.log(add(1, 4));
console.log(add(1, 2));
console.log(add(1, 3));
console.log(add(1, 4));