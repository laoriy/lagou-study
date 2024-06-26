import TinyReact from "./TinyReact";
const root = document.getElementById("root");
// 基本实例
const virtualDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2 data-test="test">(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段内容</span>
    <button onClick={() => alert("你好")}>点击我</button>
    <h3>这个将会被删除</h3>
    2, 3
    <input type="text" value="13" />
  </div>
);
const modifyDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2 data-test="test123">(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段被改变后的内容</span>
    <button onClick={() => alert("你好!!!!!")}>点击我</button>
    <input type="text" value="13" />
  </div>
);

// TinyReact.render(virtualDOM, root);

//更新DOM
// setTimeout(() => {
//   TinyReact.render(modifyDOM, root);
// }, 2000);

// 函数组件渲染
function Demo() {
  return <h1>hello</h1>;
}

function Heart(props) {
  return (
    <div>
      <h1>❤</h1>
      <Demo />
      {props.title}
    </div>
  );
}
// TinyReact.render(<Heart title="你好" />, root);

// 类组件渲染
class Alert extends TinyReact.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Default title",
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      title: "new title",
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
  }
  componentWillUpdate(nextProps, nextState) {
    console.log("componentWillUpdate");
  }
  componentDidUpdate(prevProps, preState) {
    console.log("componentDidUpdate");
  }
  render() {
    return (
      <h1>
        <div>
          {this.props.name}: {this.props.age}
          <br />
          {this.state.title}
        </div>
        <button onClick={this.handleClick}>改变title内容</button>
      </h1>
    );
  }
}
// TinyReact.render(<Alert name="张三" age={20} />, root);

setTimeout(() => {
  // TinyReact.render(<Alert name="李四" age={50} />, root);
  // TinyReact.render(<Heart title="我是Heart组件" />, root);
}, 2000);

// ref

class DemoRef extends TinyReact.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log(this.input.value);
    console.log(this.input);
    console.log(this.alert);
  }
  componentDidMount() {
    console.log("componentDidMount");
  }
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }
  render() {
    return (
      <div>
        <input type="text" ref={(input) => (this.input = input)} />
        <button onClick={this.handleClick}>按钮</button>
        <Alert ref={(alert) => (this.alert = alert)} name="张三" age={20} />
      </div>
    );
  }
}

// TinyReact.render(<DemoRef />, root);

// key

class KeyDemo extends TinyReact.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [
        {
          id: 1,
          name: "张三",
        },
        {
          id: 2,
          name: "李四",
        },
        {
          id: 3,
          name: "王五",
        },
        {
          id: 4,
          name: "赵六",
        },
      ],
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const newState = JSON.parse(JSON.stringify(this.state));
    // newState.persons.push(newState.persons.shift());
    // newState.persons.splice(1, 0, { id: 100, name: "李逵" });
    newState.persons.pop();
    this.setState(newState);
  }
  render() {
    return (
      <div>
        <ul>
          {this.state.persons.map((person) => (
            <li key={person.id}>
              {person.name}
              <DemoRef />
            </li>
          ))}
        </ul>
        <button onClick={this.handleClick}>按钮</button>
      </div>
    );
  }
}

TinyReact.render(<KeyDemo />, root);
