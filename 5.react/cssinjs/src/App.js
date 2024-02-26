import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Css from "./Css";
// 1.基本使用
const style = css(`
  color: red;
  font-size: 40px;
`);

const style2 = css({
  color: "green",
  fontSize: "50px",
});
// console.log(style, style2);

// 2.1 样式化组件 + 样式覆盖

const Button = styled.button`
  width: 100px;
  height: 30px;
  background-color: ${(props) => props.bgColor || "skyblue"};
`;
const Container = styled.div((props) => ({
  border: `${props.bw || 1}px solid #000`,
}));

// 2.2 为任何组件添加样式

const Demo = ({ className }) => {
  return <h1 className={className}>hello</h1>;
};
const Fancy = styled(Demo)`
  color: red;
`;
const Fancy2 = styled(Demo)`
  color: green;
`;

// 2.3 通过父组件设置子组件样式

const Child = styled.div`
  color: red;
`;
const Parent = styled.div`
  ${Child} {
    color: green;
  }
`;

const Child1 = styled.div({
  color: "red",
});
const Parent1 = styled.div({
  [Child1]: {
    color: "green",
  },
});

// 2.4 嵌套选择器 &

const Nested = styled.div`
  color: red;
  width: 100px;
  height: 100px;
  border: 1px solid #000;
  &:hover {
    color: green;
  }
  & > span {
    color: blue;
  }
`;

// 2.5 as 属性


function App() {
  return (
    <div>
      <h2 css={style}>CSS IN JS </h2>
      <h2 css={style2}>CSS IN JS </h2>
      <Css
        css={css`
          background-color: pink;
        `}
      ></Css>
      <Container bw={10}>
        <Button bgColor="red">这是个按钮</Button>
      </Container>
      <Fancy />
      <Fancy2 />
      <Parent>
        <Child>234</Child>
      </Parent>
      <Child>334</Child>
      <hr />

      <Parent1>
        <Child1>2334</Child1>
      </Parent1>
      <Child1>33</Child1>

      <Nested>
        ewe
        <span>122323</span>
      </Nested>
    </div>
  );
}

export default App;
