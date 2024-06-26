# React

## React 架构

React 16 版本可以分为三层：调度层，协调层，渲染层。

- Scheduler(调度层)：调度任务的优先级，高优先级的任务优先进入协调器
- Reconciler(协调器)：构建 Fiber 数据结构，比对 Fiber 对象找出差异，记录 Fiber 对象要进行的 DOM 操作。
- Renderer(渲染层)：负责将变化的部分渲染到页面上、

### Scheduler 调度层

在 React15 中，用循环 + 递归的方式进行 virtualDOM 比对，由于递归使用 JavaScript 自身的执行栈，开始就无法停止，直到任务执行完成。

如果 VirtualDOM 树的层级比较深，virtualDOM 的比对就会长期占用 JavaScript 主线程，单线程无法同时执行其他任务，所以在比对的过程中无法响应用户操作，无法即时执行元素动画，造成了页面卡顿的现象。

React16 的版本中，采用循环模拟递归。且比对的过程是利用浏览器的空闲时间完成的，不会长期占用主线程，这就解决了 virtualDOM 比对造成页面卡顿的问题。

window 对象中提供了 requestldleCallback API,它可以利用浏览器的空闲时间执行任务，但是它自身也存在一些问题，比如说并不是所有的浏览器都支持它，而且它的触发频率也不是很稳定，所以 React 最终放弃了 requestldleCallback 的使用。

在 React 中，官方实现了自己的任务调度库，这个库就叫做 Scheduler。.它也可以实现在浏览器空闲时执行任务，而且还可以设置任务的优先级，高优先级任务先执行，低优先级任务后执行。

### Reconciler 协调层

在 React15 的版本中，协调器和渲染器交替执行，即找到了差异就直接更新差异。

在 React16 的版本中，协调器和渲染器不再交替执行。协调器负责找出差异，在所有差异找出之后，统一交给渲染器进行 DOM 的更新。也就是说协调器的主要任务就是找出差异部分，并为差异打上标记。

### Renderer 渲染层

渲染器根据协调器为 Fiber 节点打的标记，同步执行对应的 DOM 操作。

既然比对的过程从递归变成了可以中断的循环，那么 React 是如何解决中断更新时 DOM 渲染不完全的问题呢？

其实根本就不存在这个问题，因为在整个过程中，调度器和协调器的工作是在内存中完成的是可以被打断的，渲染器的工作被设定成不可以被打断，所以不存在 DOM 渲染不完全的问题。

## 双缓存技术

React 根据双缓冲的机制维护了两棵树：

- 一棵是 Fiber 树用于渲染页面；
- 一棵是 WorkInProgress Fiber 树，用于在内存中构建，然后方便在构建完成时直接替换用于渲染页面的 Fiber 树。
