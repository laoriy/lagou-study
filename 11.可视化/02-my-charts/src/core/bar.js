import myAnimation from "../utils/myAnimation";
import { doDrawAxis } from "./axis";

function drawBar(speed) {
  const { ctx, defaultOptions, canvas } = this.getOptions();

  const bottomPad = 30;
  const data = defaultOptions.data;
  const height = defaultOptions.height;
  const maxPoint = defaultOptions.maxPoint;
  const len = data.length;
  let rectHeight = canvas.height - bottomPad;

  for (let i = 0; i < len; i++) {
    let yVal = data[i].yVal * speed;
    let axisY = height - height * (yVal / maxPoint) - bottomPad;
    const averageNum = defaultOptions.fitWidth / data.length - 1;
    let axisX = i * averageNum + defaultOptions.x;

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = defaultOptions.hisColor[i];
    ctx.fillRect(axisX - 15, axisY, 30, rectHeight - axisY);
    ctx.restore();
  }
}

function doDrawBar(chart) {
  myAnimation.call(chart, {
    percent: 200,
    render: (percent) => {
      chart.clearCanvas();
      doDrawAxis.call(chart);
      // 绘制直方图
      drawBar.call(chart, percent / 100);
    },
  });
}

export { doDrawBar };
