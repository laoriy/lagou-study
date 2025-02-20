import utils from "../utils";
import myAnimation from "../utils/myAnimation";
import Cirque from "./cirque";

const dpr = window.devicePixelRatio || 1;

function doDrawCircle(chart) {
  const { opts, defaultOptions } = chart.getOptions();
  let circleConfig = {
    x: opts.width / 2,
    y: opts.height / 2,
    radius: 200,
    startAngle: 0,
    endAngle: 2 * Math.PI,
    arcWidth: 18,
    target: 50,
  };
  circleConfig = utils.extendsObj(defaultOptions, circleConfig);
  console.log("绘制圆环");
  myAnimation.call(chart, {
    percent: circleConfig.target,
    render: (percent) => {
      chart.clearCanvas();
      Cirque.call(chart, percent / 100);
    },
  });
}

class MyCharts {
  #ops;
  #canvasParentDom;
  #canvas;
  #defaultOptions;
  constructor(selector, opts) {
    this.#ops = opts;
    this.#canvasParentDom = document.querySelector(selector);
    this.containerWidth = this.#canvasParentDom.clientWidth;
    this.containerHeight = this.#canvasParentDom.clientHeight;
    this.#canvas = document.createElement("canvas");

    this.#defaultOptions = {
      styles: {
        borderColor: "#6b9bb8",
        lineColor: "#9ec8da",
        pointColor: "#41627c",
      },
      data: [],
      x: 40,
      padding: 20,
      fontSize: "16px",
      width: this.containerWidth * dpr,
      height: this.containerHeight * dpr,
      lineWidth: 2,
      hisColor: [
        "#7b8c7c",
        "#5c968a",
        "#576d93",
        "#a0d878",
        "#337d56",
        "#c1d0ae",
        "#93b469",
        "#bda29a",
      ],
    };

    // 上下文绘制环境
    this.ctx = this.#canvas.getContext("2d");

    // 缩放画布大小
    this.#canvas.width = this.containerWidth * dpr;
    this.#canvas.height = this.containerHeight * dpr;

    // 添加至div 当中
    this.#canvasParentDom.appendChild(this.#canvas);
    // 扩展或者覆盖配置
    this.#ops = utils.extendsObj(this.#defaultOptions, this.#ops);

    this.init();
  }

  getOptions() {
    return {
      opts: this.#ops,
      defaultOptions: this.#defaultOptions,
    };
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
  }

  init() {
    switch (this.#ops.type) {
      case "cirque":
        doDrawCircle(this);
        break;
      default:
        console.log("无此功能的绘制");
    }
  }
}

export default MyCharts;
