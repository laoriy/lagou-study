import mountNativeElement from "./mountNativeElement";

export default function mountElement(virtualDOM, container) {
  // 是组件还是 普通的jsx元素
  mountNativeElement(virtualDOM, container);
}
