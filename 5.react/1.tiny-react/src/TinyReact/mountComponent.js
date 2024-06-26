import isFunction from "./isFunction";
import isFunctionComponent from "./isFunctionComponent";
import mountNativeElement from "./mountNativeElement";

export default function mountComponent(virtualDOM, container, oldDOM) {
  // 判断组件是类组件还是函数组件
  let nextVirtualDOM = null;
  let component = null;
  if (isFunctionComponent(virtualDOM)) {
    nextVirtualDOM = buildFunctionComponent(virtualDOM);
  } else {
    // 类组件
    nextVirtualDOM = buildClassComponent(virtualDOM);
    component = nextVirtualDOM.component
  }

  if(component){
    component.componentDidMount();
    if(component.props?.ref) {
      component.props.ref(component);
    }
  }

  if (isFunction(nextVirtualDOM)) {
    // 如果函数组件直接返回了一个函数组件
    mountComponent(nextVirtualDOM, container, oldDOM);
  } else {
    mountNativeElement(nextVirtualDOM, container, oldDOM);
  }
}

function buildFunctionComponent(virtualDOM) {
  return virtualDOM.type(virtualDOM.props || {});
}

function buildClassComponent(virtualDOM) {
  const component = new virtualDOM.type(virtualDOM.props || {});
  const nextVirtualDOM = component.render();
  nextVirtualDOM.component = component;
  return nextVirtualDOM;
}
