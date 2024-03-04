import { updateNodeElement } from "../DOM";
import {
  arrified,
  createStateNode,
  createTaskQueue,
  getRoot,
  getTag,
} from "../Misc";

const taskQueue = createTaskQueue();
let subTask = null;
let pendingCommit = null;

const commitAllWork = (fiber) => {
  fiber.effects.forEach((item) => {
    if (item.tag === "class_component") {
      item.stateNode.__fiber = item;
    }
    if (item.effectTag === "delete") {
      item.parent.stateNode.removeChild(item.stateNode);
    } else if (item.effectTag === "update") {
      if (item.type === item.alternate.type) {
        /**
         * 节点类型相同
         */
        updateNodeElement(item.stateNode, item, item.alternate);
      } else {
        /**
         * 节点类型不同
         */
        console.log("ss");
        console.log(item.stateNode, item.alternate.stateNode);
        item.parent.stateNode.replaceChild(
          item.stateNode,
          item.alternate.stateNode
        );
      }
    } else if (item.effectTag === "placement") {
      let fiber = item;
      let parentFiber = item.parent;
      // 找到普通节点父级
      while (
        parentFiber.tag === "class_component" ||
        parentFiber.tag === "function_component"
      ) {
        parentFiber = parentFiber.parent;
      }
      if (fiber.tag === "host_component") {
        parentFiber.stateNode.appendChild(fiber.stateNode);
      }
    }
  });
  /**
   * 备份旧的fiber对象
   */
  fiber.stateNode.__rootFiberContainer = fiber;
};

const getFirstTask = () => {
  /** 从任务队列中取出任务 */
  const task = taskQueue.pop();
  if (task.from === "class_component") {
    const root = getRoot(task.instance);
    task.instance.__fiber.partialState = task.partialState;

    return {
      props: root.props,
      stateNode: root.stateNode,
      tag: "host_root",
      effects: [], // 数组，存储需要更改的fiber对象
      effectTag: null, // placement 新增,update 更新，delete 删除
      child: null,
      alternate: root,
    };
  }

  /**
   * 返回最外层节点的fiber对象
   */

  return {
    props: task.props,
    stateNode: task.dom, // 节点dom对象 ，组件实例对象
    tag: "host_root",
    effects: [], // 数组，存储需要更改的fiber对象
    effectTag: null, // placement 新增,update 更新，delete 删除
    child: null,
    alternate: task.dom.__rootFiberContainer,
  };
};

const reconcileChildren = (fiber, children) => {
  /**
   * children 可能是对象也可能是数组，调用render函数，就是个对象
   * 将children 转换成数组
   */
  const arrifiedChildren = arrified(children);

  let index = 0;
  let numberOfElements = arrifiedChildren.length;
  let element = null;
  /**
   * 子级fiber对象
   */
  let newFiber = null;
  /**
   * 上一个兄弟 fiber 对象
   */
  let preFiber = null;

  let alternate = null; // 备份节点
  if (fiber.alternate && fiber.alternate.child) {
    alternate = fiber.alternate.child;
  }

  while (index < numberOfElements || alternate) {
    element = arrifiedChildren[index];

    if (!element && alternate) {
      // 删除操作
      alternate.effectTag = "delete";
      fiber.effects.push(alternate);
    } else if (element && alternate) {
      // 更新操作
      newFiber = {
        type: element.type,
        props: element.props,
        tag: getTag(element),
        effects: [],
        effectTag: "update",
        stateNode: null,
        parent: fiber,
        alternate,
      };

      if (element.type === alternate.type) {
        newFiber.stateNode = alternate.stateNode;
      } else {
        newFiber.stateNode = createStateNode(newFiber);
      }
    } else if (element && !alternate) {
      // 初始渲染
      newFiber = {
        type: element.type,
        props: element.props,
        tag: getTag(element),
        effects: [],
        effectTag: "placement", // 追加
        stateNode: null,
        parent: fiber,
      };
      newFiber.stateNode = createStateNode(newFiber);
    }

    // 第一个子节点作为父节点的child。其他的子节点都作为前一个节点的兄弟节点
    if (index === 0) {
      fiber.child = newFiber;
    } else if (element) {
      preFiber.sibling = newFiber;
    }

    if (alternate && alternate.sibling) {
      alternate = alternate.sibling;
    } else {
      alternate = null;
    }

    preFiber = newFiber;
    index++;
  }
};

const executeTask = (fiber) => {
  /**
   * 如果子级任务存在，返回子级
   * 将这个子级作为父级， 构建父级下的子级
   */
  if (fiber.tag === "class_component") {
    if (fiber.stateNode.__fiber?.partialState) {
      fiber.stateNode.state = {
        ...fiber.stateNode.state,
        ...fiber.stateNode.__fiber.partialState,
      };
    }

    // 如果是类组件
    reconcileChildren(fiber, fiber.stateNode.render());
  } else if (fiber.tag === "function_component") {
    // 如果是函数组件
    reconcileChildren(fiber, fiber.stateNode(fiber.props));
  } else {
    reconcileChildren(fiber, fiber.props.children);
  }
  if (fiber.child) {
    return fiber.child;
  }

  let currentExecutedFiber = fiber;

  while (currentExecutedFiber.parent) {
    // 合并fiber对象到effects数组,如下代码作用是将当前fiber对象添加到父fiber对象的effects数组中
    currentExecutedFiber.parent.effects =
      currentExecutedFiber.parent.effects.concat(
        currentExecutedFiber.effects.concat(currentExecutedFiber)
      );
    // 如果有同级，返回同级，否则往上一层找，直到找到根节点
    if (currentExecutedFiber.sibling) {
      return currentExecutedFiber.sibling;
    }
    currentExecutedFiber = currentExecutedFiber.parent;
  }
  pendingCommit = currentExecutedFiber;
};
const workLoop = (deadline) => {
  /** 如果子任务不存在就获取第一个任务 */
  if (!subTask) {
    subTask = getFirstTask();
  }
  /**
   * 如果任务存在并且浏览器空闲时间大于1
   * 调用 executeTask 执行任务，并返回新任务
   * 最终创建出完整的fiber树
   */
  while (subTask && deadline.timeRemaining() > 1) {
    subTask = executeTask(subTask);
  }
  //将fiber树提交给浏览器渲染
  if (pendingCommit) {
    commitAllWork(pendingCommit);
  }
};
const performTask = (deadline) => {
  /**
   * 执行任务
   */
  workLoop(deadline);
  /**
   * 判断任务是否存在
   * 判断任务队列中是否还有任务
   * 如果还有任务，告诉浏览器在空闲的时间执行任务
   */
  if (subTask || !taskQueue.isEmpty()) {
    requestIdleCallback(performTask);
  }
};

export const render = (element, dom) => {
  /**
   * 1. 向任务队列中添加任务
   * 2. 指定在浏览器空闲时执行任务
   */

  /**
   * 任务就是通过 vdom 对象构建 fiber 对象
   *
   */
  taskQueue.push({
    dom,
    props: {
      children: element,
    },
  });
  requestIdleCallback(performTask);
};

export const scheduleUpdate = (instance, partialState) => {
  taskQueue.push({
    from: "class_component",
    instance,
    partialState,
  });
  requestIdleCallback(performTask);
};
