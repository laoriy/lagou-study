import utils from "../utils";
import { doDrawCircle } from "./cirque";

const dpr = window.devicePixelRatio || 1;

class MyCharts {
  #ops;
  #canvasParentDom;
  #canvas;
  #defaultOptions;
  #ctx;
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
    this.#ctx = this.#canvas.getContext("2d");

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
      ctx: this.#ctx,
    };
  }

  clearCanvas() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
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
