import createDOMElement from "./createDOMElement";
import diffComponent from "./diffComponent";
import mountElement from "./mountElement";
import unmountNode from "./unmountNode";
import updateNodeElement from "./updateNodeElement";
import updateTextNode from "./updateTextNode";

export default function diff(virtualDOM, container, oldDOM) {
  // 判断oldDOM 是否存在
  if (!oldDOM) {
    // 第一次挂载
    mountElement(virtualDOM, container);
  } else {
    const oldVirtualDOM = oldDOM._virtualDOM;
    const oldComponent = oldVirtualDOM?.component;
    // 如果要比对的两个节点类型不相同, 并且新的节点不是组件

    if (
      virtualDOM.type !== oldVirtualDOM.type &&
      typeof virtualDOM.type !== "function"
    ) {
      // 类型不同，直接替换
      const newElement = createDOMElement(virtualDOM);
      oldDOM.parentNode.replaceChild(newElement, oldDOM);
    } else if (typeof virtualDOM.type === "function") {
      // 是组件
      diffComponent(virtualDOM, oldComponent, oldDOM, container);
    } else if (oldVirtualDOM.type === virtualDOM.type) {
      if (virtualDOM.type === "text") {
        // 更新文本节点
        updateTextNode(virtualDOM, oldVirtualDOM, oldDOM);
      } else {
        // 更新元素节点属性
        updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM);
      }
      // 1. 将拥有key属性的子元素放置在一个单独的对象中
      let keyedElements = {};
      for (let i = 0, len = oldDOM.childNodes.length; i < len; i++) {
        let domElement = oldDOM.childNodes[i];
        if (domElement.nodeType === 1) {
          let key = domElement.getAttribute("key");
          if (key) {
            keyedElements[key] = domElement;
          }
        }
      }
      let hasNoKey = Object.keys(keyedElements).length === 0;

      if (hasNoKey) {
        // 对比子节点
        virtualDOM.children.forEach((child, index) => {
          diff(child, oldDOM, oldDOM.childNodes[index]);
        });
      } else {
        // 2. 遍历新的虚拟DOM的子元素，获取子元素的key属性

        virtualDOM.children.forEach((child, i) => {
          let key = child.props?.key;
          if (key) {
            let domElement = keyedElements[key];

            // 3.看看当前位置的元素是不是我们期望的元素
            if (domElement) {
              // 3. 看看当前位置的元素是不是我们期望的元素
              if (oldDOM.childNodes[i] && oldDOM.childNodes[i] !== domElement) {
                oldDOM.insertBefore(domElement, oldDOM.childNodes[i]);
              }
            } else {
              // 新增元素
              mountElement(child, oldDOM, oldDOM.childNodes[i]);
            }
          }
        });
      }

      // 在节点更新完以后，把后面多余的子节点删除
      let oldChildNodes = oldDOM.childNodes;
      // 判断老的子节点是否大于新的
      if (oldChildNodes.length > virtualDOM.children.length) {
        //
        if (hasNoKey) {
          for (
            let i = oldChildNodes.length - 1;
            i > virtualDOM.children.length - 1;
            i--
          ) {
            unmountNode(oldChildNodes[i]);
          }
        } else {
          for (let i = 0; i < oldChildNodes.length; i++) {
            let oldChild = oldChildNodes[i];
            let oldChildKey = oldChild._virtualDOM.props.key;
            let found = false;
            for (let j = 0; j < virtualDOM.children.length; j++) {
              let newChild = virtualDOM.children[j];
              let newChildKey = newChild.props.key;
              if (oldChildKey === newChildKey) {
                found = true;
                break;
              }
            }
            if (!found) {
              unmountNode(oldChild);
            }
          }
        }
      }
    }
  }
}
