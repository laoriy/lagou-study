import createDOMElement from "./createDOMElement";
import mountElement from "./mountElement";
import updateNodeElement from "./updateNodeElement";
import updateTextNode from "./updateTextNode";

export default function diff(virtualDOM, container, oldDOM) {
  // 判断oldDOM 是否存在
  if (!oldDOM) {
    // 第一次挂载
    mountElement(virtualDOM, container);
  } else {
    const oldVirtualDOM = oldDOM._virtualDOM;
    // 如果要比对的两个节点类型不相同, 并且新的节点不是组件
    if (
      virtualDOM.type !== oldVirtualDOM.type &&
      typeof virtualDOM.type !== "function"
    ) {
      // 类型不同，直接替换
      const newElement = createDOMElement(virtualDOM);
      oldDOM.parentNode.replaceChild(newElement, oldDOM);
    } else if (oldVirtualDOM.type === virtualDOM.type) {
      if (virtualDOM.type === "text") {
        // 更新文本节点
        updateTextNode(virtualDOM, oldVirtualDOM, oldDOM);
      } else {
        // 更新元素节点属性
        updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM);
      }
      virtualDOM.children.forEach((child, index) => {
        diff(child, oldDOM, oldDOM.childNodes[index]);
      });
    }
  }
}
