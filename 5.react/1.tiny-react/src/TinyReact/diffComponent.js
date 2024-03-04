import mountElement from "./mountElement";
import updateComponent from "./updateComponent";

export default function diffComponent(
  virtualDOM,
  oldComponent,
  oldDOM,
  container
) {
  if (isSameComponent(virtualDOM, oldComponent)) {
    // 如果是同一个组件
    updateComponent(virtualDOM, oldComponent, oldDOM, container);
  } else {
    // 如果不是同一个组件
    mountElement(virtualDOM, container, oldDOM);
  }
}

// 判断是否是同一个组件
function isSameComponent(virtualDOM, oldComponent) {
  return oldComponent && virtualDOM.type === oldComponent.constructor;
}
