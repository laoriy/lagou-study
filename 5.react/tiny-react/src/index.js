import TinyReact from "./TinyReact";
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
// TinyReact.render(virtualDOM, document.getElementById("root"));
// console.log(<virtualDOM />);

function Demo() {
  return <h1>hello</h1>;
}

// 组件渲染
function Heart(props) {
  return (
    <div>
      <h1>❤</h1>
      <Demo />
      {props.title}
    </div>
  );
}
// TinyReact.render(<Heart title="你好" />, document.getElementById("root"));

// 类组件
class Alert extends TinyReact.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h1>hello React alert {this.props.title}</h1>;
  }
}
TinyReact.render(<Alert title="你好 hello" />, document.getElementById("root"));
