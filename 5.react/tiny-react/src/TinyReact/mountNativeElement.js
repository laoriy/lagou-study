import createDOMElement from "./createDOMElement";
import unmountNode from "./unmountNode";
/**
 * 挂在普通的jsx元素
 */
export default function mountNativeElement(virtualDOM, container, oldDOM) {
  let newElement = createDOMElement(virtualDOM);
  // 判断旧的DOM对象是否存在，如果存在就把旧的DOM对象卸载掉
  if (oldDOM) {
    unmountNode(oldDOM);
  }
  // 将转换之后的DOM对象放置在页面当中
  container.appendChild(newElement);
  let component = virtualDOM.component;
  if (component) {
    component.setDOM(newElement);
  }
}
