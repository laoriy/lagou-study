import updateNodeElement from "./updateNodeElement";
/**
 * 创建DOM元素
 */
export default function createDOMElement(virtualDOM) {
  let newElement = null;
  const { type, props } = virtualDOM;
  if (type === "text") {
    //文本节点
    newElement = document.createTextNode(props.textContent);
  } else {
    // 元素节点
    newElement = document.createElement(type);
    updateNodeElement(newElement, virtualDOM);
  }

  return newElement;
}
