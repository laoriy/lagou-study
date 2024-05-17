import * as React from "react";
import {
  useSpring,
  animated,
  config,
  useSprings,
  useTrail,
} from "@react-spring/web";
import styles from "./styles.module.css";
import styled from "styled-components";
const data = [
  "少时诵诗书打撒发生发的",
  "少时诵诗书打撒发生发的",
  "少时诵诗书打撒发生发的",
  "少时诵诗书打撒发生发的",
  "少时诵诗书打撒发生发的",
  "少时诵诗书打撒发生发的",
  "少时诵诗书打撒发生发的",
  "少时诵诗书打撒发生发的",
  "少时诵诗书打撒发生发的",
  "少时诵诗书打撒发生发的",
  "少时诵诗书打撒发生发的",
  "少时诵诗书打撒发生发的",
  "少时诵诗书打撒发生发的",
  "少时诵诗书打撒发生发的",
];

const colorData = ["primary", "success", "danger", "waring"];
const Container = styled(animated.div)`
  width: 200px;
  height: 100px;
  background-color: red;
  overflow: auto;
  margin: 30px 0 10px 16px;
  padding: 10px;
  position: relative;
  z-index: 1;
  & > div {
    height: 30px;
    line-height: 30px;
  }
`;

const Wrapper = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
  z-index: 2;
  padding: 0;
  overflow: hidden;
  li {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    margin-bottom: 12px;
    color: #fff;
    background-color: #38b2ac;
    display: flex;
    align-items: center;
    justify-content: center;
    &.primary {
      background-color: blue;
    }
    &.success {
      background-color: green;
    }
    &.danger {
      background-color: red;
    }
    &.waring {
      background-color: orange;
    }
  }
`;

export default function App() {
  const [{ background }] = useSpring(
    () => ({
      from: { background: "var(--step0)" },
      to: [
        { background: "var(--step0)" },
        { background: "var(--step1)" },
        { background: "var(--step2)" },
        { background: "var(--step3)" },
        { background: "var(--step4)" },
      ],
      config: config.molasses,
      loop: {
        reverse: true,
      },
    }),
    []
  );

  const { number } = useSpring({
    from: { number: 0 },
    to: { number: 100 },
    config: {
      duration: 20000,
    },
  });

  const ref = React.useRef<HTMLDivElement>(null);
  const { scroll } = useSpring({
    from: { scroll: ref?.current?.scrollTop || 0 },
  });
  const [on, setOn] = React.useState(false);
  const animations = useSprings(
    data.length,
    data.map((d, i) => ({
      from: {
        transform: `translateX(${i % 2 ? 100 : -100}%)`,
      },
      to: {
        transform: `translateX(0%)`,
      },
      reverse: on,
    }))
  );

  const [{ dataShow, indexStartRender }, setState] = React.useState({
    dataShow: data,
    indexStartRender: 0,
  });

  const trail = useTrail(dataShow.length, {
    from: {
      transform: "translateY(100%)",
    },
    to: {
      transform: "translateY(0%)",
    },
    reset: true,
    config: config.wobbly,
  });

  const onClickHandler = (i: number) => {
    const newData = [...dataShow.slice(0, i), ...dataShow.slice(i + 1)];
    setState({ dataShow: newData, indexStartRender: i });
  };

  return (
    <div className={styles.container}>
      <div className={styles.squares}>
        <div className={styles.block} />
        <div className={styles.block} />
        <animated.div className={styles.block} style={{ background }} />
      </div>
      <animated.div className={styles.background} style={{ background }} />
      <animated.div>{number.to((n) => n.toFixed(2))}</animated.div>
      <Container ref={ref} scrollTop={scroll}>
        {data.map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </Container>
      <button
        className="btn"
        style={{ position: "relative", zIndex: 1 }}
        onClick={() =>
          scroll.start({
            from: { scroll: ref!.current!.scrollTop },
            to: { scroll: 0 },
          })
        }
      >
        scroll to top
      </button>
      <Wrapper>
        {colorData.map((item, i) => {
          return (
            <animated.li style={animations[i]} className={item} key={item}>
              {item}
            </animated.li>
          );
        })}
        <button onClick={() => setOn(!on)}> change on state</button>
      </Wrapper>

      <Wrapper>
        {trail.map((item, i) => (
          <animated.li
            onClick={() => onClickHandler(i)}
            style={i > indexStartRender ? item : {}}
            key={i}
          >
            {dataShow[i]}
            {i + 1}
          </animated.li>
        ))}
      </Wrapper>
    </div>
  );
}
