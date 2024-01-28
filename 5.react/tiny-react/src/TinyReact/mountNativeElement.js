import mountElement from "./mountElement";

export default function mountNativeElement(virtualDOM, container) {
  let newElement = null;
  const { type, props, children } = virtualDOM;
  if (type === "text") {
    //文本节点
    newElement = document.createTextNode(props.textContent);
  } else {
    // 元素节点
    newElement = document.createElement(type);
  }
  // 递归创建子节点
  children.forEach((child) => {
    mountElement(child, newElement);
  });

  // 将转换之后的DOM对象放置在页面当中
  container.appendChild(newElement);
}
