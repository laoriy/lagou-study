import * as React from "react";
import { useSpring, animated, config } from "@react-spring/web";
import styles from "./styles.module.css";

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

  return (
    <div className={styles.container}>
      <div className={styles.squares}>
        <div className={styles.block} />
        <div className={styles.block} />
        <animated.div className={styles.block} style={{ background }} />
      </div>
      <animated.div className={styles.background} style={{ background }} />
      <animated.div>{number.to((n) => n.toFixed(2))}</animated.div>
    </div>
  );
}
