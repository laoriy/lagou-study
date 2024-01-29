import createDOMElement from "./createDOMElement";
/**
 * 挂在普通的jsx元素
 */
export default function mountNativeElement(virtualDOM, container) {
  let newElement = createDOMElement(virtualDOM);
  // 将转换之后的DOM对象放置在页面当中
  container.appendChild(newElement);
}
