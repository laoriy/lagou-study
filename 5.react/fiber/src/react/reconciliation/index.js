import { arrified, createStateNode, createTaskQueue } from "../Misc";

const taskQueue = createTaskQueue();
let subTask = null;

const getFirstTask = () => {
  /** 从任务队列中取出任务 */
  const task = taskQueue.pop();
  /**
   * 返回最外层节点的fiber对象
   */

  return {
    props: task.props,
    stateNode: task.dom, // 节点dom对象 ，组件实例对象
    tag: "host_root",
    effects: [],
    effectTag: null, // placement 新增,update 更新，deletion 删除
    child: null,
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
  let newFiber = null;
  let preFiber = null;
  console.log(index, numberOfElements);
  while (index < numberOfElements) {
    element = arrifiedChildren[index];
    newFiber = {
      type: element.type,
      props: element.props,
      tag: "host_component",
      effects: [],
      effectTag: "placement", // 追加
      stateNode: null,
      parent: fiber,
    };

    newFiber.stateNode = createStateNode(newFiber);

    // 第一个子节点作为父节点的child。其他的子节点都作为前一个节点的兄弟节点
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      preFiber.sibling = newFiber;
    }

    preFiber = newFiber;
    index++;
  }
};

const executeTask = (fiber) => {
  reconcileChildren(fiber, fiber.props.children);
  console.log(fiber);
};
const workLoop = (deadline) => {
  /** 如果子任务不存在就获取第一个任务 */
  if (!subTask) {
    subTask = getFirstTask();
  }
  /**
   * 如果任务存在并且浏览器空闲时间大于1
   * 调用 executeTask 执行任务，并返回新任务
   */
  while (subTask && deadline.timeRemaining() > 1) {
    subTask = executeTask(subTask);
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
