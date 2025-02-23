import "./style.css";
import MyCharts from "./core/charts";

new MyCharts("#box1", {
  type: "cirque",
});

new MyCharts("#box2", {
  // ratio: 1.5,
  type: "line",
  data: [
    {
      xVal: "周一",
      yVal: 40,
    },
    {
      xVal: "周二",
      yVal: 70,
    },
    {
      xVal: "周三",
      yVal: 30,
    },
    {
      xVal: "周四",
      yVal: 80,
    },
    {
      xVal: "周五",
      yVal: 30,
    },
    {
      xVal: "周六",
      yVal: 20,
    },
    {
      xVal: "周日",
      yVal: 90,
    },
  ],
});
