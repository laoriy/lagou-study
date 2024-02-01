export default class Component {
  constructor(props) {
    this.props = props;
  }
  setState(state) {
    this.state = Object.assign({}, this.state, state);
    // 获取最新的要渲染的virtualDOM
    let virtualDOM = this.render();
    // 获取旧的virtualDOM对象进行比对
    
  }
}
