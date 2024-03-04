export default function unmountNode(node) {
  const virtualDOM = node._virtualDOM;

  // 1. 文本节点可以直接删除
  if(virtualDOM.type === "text") {
    node.remove();
    return;
  } else {
    // 2. 看下节点是否是由组件生成的
    let component = virtualDOM.component;
    if(component) {
      // 如果是组件，就把组件卸载
      component.componentWillUnmount();
    }
    // 3. 看一下节点身上是否有ref属性
    const ref = virtualDOM.props?.ref;
    if(ref) {
      ref(null);
    }

    // 4. 看一下节点的属性中是否有事件属性

    Object.keys(virtualDOM.props).forEach((key) => {
      if (/^on[A-Z]/.test(key)) {
        const eventName = key.slice(2).toLowerCase();
        const eventHandler = virtualDOM.props[key];
        node.removeEventListener(eventName, eventHandler);
      }
    })

    // 5. 递归删除子节点
    if(node.childNodes.length > 0) {
      Array.from(node.childNodes).forEach((child) => {
        unmountNode(child);
      });
    }

    node.remove()
  }

}
