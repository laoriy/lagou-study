// function compose(...args) {
//     return function (value) {
//         return args.reverse().reduce((acc, fn) => {
//             return fn(acc)
//         }, value)
//     }
// }

const compose = (...args) => (value) => args.reverse().reduce((acc, fn) => fn(acc), value)



const reverse = arr => arr.reverse()
const first = arr => arr[0]
const toUppercase = str => str.toUpperCase()


const f = compose(toUppercase, first, reverse)
const f1 = compose(compose(toUppercase, first), reverse)
const f2 = compose(toUppercase, compose(first, reverse))
console.log(f(['two', 'three', 'four']));
console.log(f1(['two', 'three', 'four']));
console.log(f2(['two', 'three', 'four']));