/**
 * 创建virtualDOM对象
 */
export default function createElement(type, props, ...children) {
  const childElements = [].concat(...children).reduce((result, child) => {
    // 对于boolean,等节点进行移除
    if (child !== false && child !== null && child !== true) {
      if (child instanceof Object) {
        result.push(child);
      } else {
        // 这里是文本节点
        result.push(createElement("text", { textContent: child }));
      }
    }
    return result;
  }, []);
  return {
    type,
    props: Object.assign({ children: childElements }, props),
    children: childElements,
  };
}
