function curry(fn) {
    const _c = function (...args) {
        if (args.length >= fn.length) {
            return fn(...args)
        }
        return (...ars) => {
            return _c(...args, ...ars)
        }
    }
    return _c
}

function getSum(a,b,c){
    return a+b+c
}
const getSumCurried = curry(getSum)

console.log(getSumCurried(1,2,3));
console.log(getSumCurried(1)(2,3));
console.log(getSumCurried(1,2)(3));