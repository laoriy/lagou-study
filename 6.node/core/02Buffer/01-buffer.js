/* const b1 = Buffer.alloc(10)
const b2 = Buffer.allocUnsafe(10)

console.log(b1)
console.log(b2) */

// from
// const b1 = Buffer.from('中')
const b1 = Buffer.from("1"); // !字符'1'在ascii码中的编码为49，十六进制为0x31
console.log(b1);

// const b1 = Buffer.from([1, 0xe4, 0xb8, 0xad]);
/* const b1 = Buffer.from([0x60, 0b1001, 12])
console.log(b1);
console.log(b1.toString()); */
/* const b1 = Buffer.from('中')
console.log(b1)
console.log(b1.toString()) */

// const b1 = Buffer.alloc(3)
// const b2 = Buffer.from(b1)

// console.log(b1)
// console.log(b2)

// b2[0] = 1
// console.log(b1)
// console.log(b2)
