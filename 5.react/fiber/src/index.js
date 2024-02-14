import React, { render, Component } from "./react";
const root = document.getElementById("root");

/**
 * 1. 基本示例
 */
const jsx = (
  <div>
    <p>Hello React</p>
    <p>Hi Fiber</p>
  </div>
);

render(jsx, root);

/**
 * 4. 更新操作
 */
setTimeout(() => {
  const jsx = (
    <div>
      <div>奥利给</div>
      <div>Hi Fiber</div>
    </div>
  );
  render(jsx, root);
}, 2000);

/**
 * 2. 类组件
 */
class Greating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "张三",
    };
  }
  render() {
    return (
      <div>
        {this.props.title}hahahaha {this.state.name}
        <button onClick={() => this.setState({ name: "李四" })}>button</button>
      </div>
    );
  }
}

// render(<Greating title="奥利给" />, root);

/**
 * 3. 函数组件
 * */
function FnComponent(props) {
  return <div>{props.title}FnComponent</div>;
}

// render(<FnComponent title="Hello" />, root)
