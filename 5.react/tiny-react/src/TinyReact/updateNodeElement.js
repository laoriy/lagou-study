/**
 * 更新元素属性
 */
export default function updateNodeElement(newElement, virtualDOM) {
  const newProps = virtualDOM.props;
  Object.keys(newProps).forEach((propName) => {
    const newPropsValue = newProps[propName];
    // 判断是否是事件属性onClick --> click
    if (propName.slice(0, 2) === "on") {
      // 事件名称
      const eventName = propName.toLowerCase().slice(2);
      // 为元素绑定事件
      newElement.addEventListener(eventName, newPropsValue);
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
  });
}
