# Web Components

Web Components 是一套不同的技术，允许您创建可重用的自定义元素，并在您的 Web 应用中使用它们。它是一种原生的浏览器技术标准，让开发者能够创建新的 HTML 标签、扩展现有的 HTML 标签或封装常用功能。

## 核心技术

Web Components 由三项主要技术组成：

1. **Custom Elements（自定义元素）**

   - 允许开发者创建新的 HTML 标签
   - 可以定义自定义元素的行为和属性
   - 使用 JavaScript 类来定义新元素

2. **Shadow DOM（影子 DOM）**

   - 提供了一种封装的方式，使得组件的 HTML、CSS 和 JavaScript 相互隔离
   - 防止页面其他部分的样式影响组件
   - 确保组件具有局部作用域的样式

3. **HTML Templates（HTML 模板）**
   - 使用`<template>`和`<slot>`元素
   - 定义可重用的 HTML 结构
   - 支持动态内容插入

## 优势

- **可重用性**：创建一次，到处使用
- **封装性**：组件的实现细节被隐藏，不会与页面其他部分产生冲突
- **标准化**：使用原生浏览器 API，无需框架
- **跨框架兼容**：可以在任何框架中使用
- **维护性**：独立的组件更容易维护和更新

## Custom Elements

1. 方法：

- `customElements.define(name, class extends HTMLElement)` 定义一个自定义元素
- `customElements.get(name)` 获取一个自定义元素
- `customElements.upgrade(element)` 升级一个自定义元素
- `customElements.whenDefined(name)` 等待一个自定义元素被定义

2. 生命周期：

- `connectedCallback` 当自定义元素添加至页面时
- `disconnectedCallback` 当自定义元素从页面中移除时
- `adoptedCallback` 当自定义元素移动至新页面时
- `attributeChangedCallback` 当自定义元素的属性发生变化时
