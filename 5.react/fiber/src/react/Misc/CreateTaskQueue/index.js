export default function createTaskQueue() {
  const taskQueue = [];

  return {
    /**
     * 向任务队列中添加任务
     */
    push: (task) => {
      taskQueue.push(task);
    },
    /**
     * 从任务队列中取出任务
     */
    pop: () => {
      return taskQueue.shift();
    },
    /**
     * 判断任务队列中是否还有任务
     */
    isEmpty: () => {
      return taskQueue.length === 0;
    },
  };
}
