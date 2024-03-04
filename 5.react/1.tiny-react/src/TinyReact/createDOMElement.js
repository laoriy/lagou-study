import mountElement from "./mountElement";
import updateNodeElement from "./updateNodeElement";
/**
 * 创建DOM元素
 */
export default function createDOMElement(virtualDOM) {
  let newElement = null;
  const { type, props, children } = virtualDOM;
  if (type === "text") {
    //文本节点
    newElement = document.createTextNode(props.textContent);
  } else {
    // 元素节点
    newElement = document.createElement(type);
    updateNodeElement(newElement, virtualDOM);
  }
  newElement._virtualDOM = virtualDOM;
  // 递归创建子节点
  children.forEach((child) => {
    mountElement(child, newElement);
  });

  if (virtualDOM.props?.ref) {
    virtualDOM.props.ref(newElement);
  }
  return newElement;
}
