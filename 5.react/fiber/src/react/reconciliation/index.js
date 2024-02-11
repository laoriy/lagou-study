import { createTaskQueue } from "../Misc";

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
    child: null,
  };
};
const executeTask = (fiber) => {
  //   fiber();
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
