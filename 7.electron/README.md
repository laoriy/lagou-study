# Electron

不支持 pnpm

## 技术架构

- Chromium：支持最新特性的浏览器

- Node.js：javascript 运行时，可实现文件读写等

- Native APIs: 提供统一的原生界面能力

## 主进程

- 可以看做是 package.json 中 main 属性对应的文件
- 一个应用只会有一个主进程
- 只有主进程可以进行 GUI 的 API 操作

## 渲染进程

- Windows 中展示的界面通过渲染进程表现
- 一个应用可以有多个渲染进程

## Electron 生命周期

- ready: app 初始化完成
- dom-ready: 一个窗口中的文本加载完成
- did-finsh-load: 导航完成时触发
- window-all-closed: 所有窗口都被关闭时触发
- before-quit: 在关闭窗口之前触发
- will-quit: 在窗口关闭并且应用退出时触发
- quit: 当所有窗口被关闭时触发
- closed: 当窗口关闭时触发，此时应删除窗口引用
