# CSS in JS

## 为什么会有 CSS in JS

将 css 代码 捆绑在 JavaScript 中，用于解决 CSS 的局限性，例如缺乏动态功能，作用域和可移植性。

## 优点

1. 让 CSS 代码拥有独立的作用域，阻止 CSS 代码泄露到组件外部，防止样式冲突。
2. 让组件更具有可移植性，实现开箱即用，轻松创建松耦合的应用程序。
3. 让组件更具有可重用性，只需要编写一次即可，可以在任何地方运行，不仅可以在同一应用程序中重用组件，而且可以在使用相同框架构建的其他应用程序中重用组件
4. 让样式具有动态功能，可以将复杂的逻辑应用于样式规则，如果要创建需要动态功能的复杂 UI，它是理想的解决方案。

# 缺点

1. 增加了项目额外的复杂性。
2. 自动生成的选择器大大降低了代码的可读性。

## 使用 emotion

### 安装

pnpm install customize-cra react-app-rewired @emotion/babel-preset-css-prop @emotion/react

### 配置

```js
//  根目录config-overrides.js
const { override, addBabelPreset } = require("customize-cra");

module.exports = {
  webpack: override(addBabelPreset("@emotion/babel-preset-css-prop")),
};
```

### 使用

```jsx
{
  /**css属性可以识别 */
}
<h2 css={{ color: "red" }}>CSS IN JS </h2>;
```

### 样式化组件

文档：https://emotion.sh/docs/styled
