/**
 * 更新元素属性
 */
export default function updateNodeElement(
  newElement,
  virtualDOM,
  oldVirtualDOM = {}
) {
  const newProps = virtualDOM.props;
  const oldProps = oldVirtualDOM?.props || {};
  if (virtualDOM.type === "text") {
    console.log(
      virtualDOM,
      oldVirtualDOM,
      newProps.textContent,
      oldProps.textContent
    );
    if (newProps.textContent !== oldProps.textContent) {
      if (virtualDOM.parent.type !== oldVirtualDOM.parent.type) {
        virtualDOM.parent.stateNode.appendChild(
          document.createTextNode(newProps.textContent)
        );
      } else {
        virtualDOM.parent.stateNode.replaceChild(
          document.createTextNode(newProps.textContent),
          oldVirtualDOM.stateNode
        );
      }
    }
    return;
  }

  Object.keys(newProps).forEach((propName) => {
    const newPropsValue = newProps[propName];
    const oldPropsValue = oldProps[propName];

    if (newPropsValue !== oldPropsValue) {
      // 判断是否是事件属性onClick --> click
      if (propName.slice(0, 2) === "on") {
        // 事件名称
        const eventName = propName.toLowerCase().slice(2);
        // 为元素绑定事件
        newElement.addEventListener(eventName, newPropsValue);
        // 删除原有的事件处理函数
        if (oldPropsValue) {
          newElement.removeEventListener(eventName, oldPropsValue);
        }
      } else if (propName === "value" || propName === "checked") {
        // 特殊处理表单的value和checked属性
        newElement[propName] = newPropsValue;
      } else if (propName !== "children") {
        if (propName === "className") {
          newElement.setAttribute("class", newProps[propName]);
        } else {
          newElement.setAttribute(propName, newProps[propName]);
        }
      }
    }
  });

  // 删除多余的属性
  Object.keys(oldProps).forEach((propName) => {
    const newPropValue = newProps[propName];
    if (!newPropValue) {
      // 被删除属性
      if (propName.slice(0, 2) === "on") {
        const eventName = propName.toLowerCase().slice(2);
        newElement.removeEventListener(eventName, oldProps[propName]);
      } else if (propName !== "children") {
        newElement.removeAttribute(propName); // value 和 checked 也可以被删除
      }
    }
  });
}
