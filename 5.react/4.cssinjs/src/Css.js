import { css } from "@emotion/react";

const style = css`
  width: 200px;
  height: 200px;
  background-color: orange;
`;

function Css(props) {
  return (
    // 样式覆盖
    <div css={style} {...props}>
      CSs
    </div>
  );
}

export default Css;
