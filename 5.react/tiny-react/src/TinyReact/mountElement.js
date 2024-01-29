import isFunction from "./isFunction";
import mountComponent from "./mountComponent";
import mountNativeElement from "./mountNativeElement";
/**
 * 挂在元素，其中会判断是组件还是普通的jsx元素
 */
export default function mountElement(virtualDOM, container) {
  if (isFunction(virtualDOM)) {
    // 是组件
    mountComponent(virtualDOM, container);
  } else {
    //普通的jsx元素
    mountNativeElement(virtualDOM, container);
  }
}
