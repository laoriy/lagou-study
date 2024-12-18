import { ReplaySubject } from "rxjs";

function sayHello(who) {
  console.log(`%c${who} sayHello`, "color:skyblue");
}
const sharedSubject = new ReplaySubject();
export { sayHello, sharedSubject };
